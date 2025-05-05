import asyncio
import os
import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List, Optional
from pydantic import BaseModel
import json
import time
import random

from .core.metaverse_core import MetaverseCore
from .core.vector3 import Vector3
from .database.db import Database
from .models.user import User
from .models.railway_system import railway_system, Position, RailwayWorldChunk, Train, Station, Track, RailwaySignal
from .blockchain.api import router as blockchain_router
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler()
    ]
)

logger = logging.getLogger("metaverse")

# Create MetaverseCore instance
metaverse = MetaverseCore()
app = metaverse.app

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include blockchain router
app.include_router(blockchain_router)

# Database instance
database = Database()

# Dependency to get database connection
async def get_db():
    return database

# Mount static files (frontend)
try:
    app.mount("/", StaticFiles(directory="../frontend/dist", html=True), name="static")
except Exception as e:
    logger.warning(f"Could not mount static files: {e}")
    logger.warning("Frontend might not be built yet. Running API-only mode.")

# Initialize the railway system with demo data
railway_system.create_demo_railway_system()

# Active WebSocket connections
active_connections: List[WebSocket] = []

# API Classes for requests and responses
class ChunkRequest(BaseModel):
    x: float
    y: float
    z: float
    view_distance: float = 500.0

class TrainControlRequest(BaseModel):
    train_id: str
    action: str  # "start", "stop", "accelerate", "decelerate"
    target_station_id: Optional[str] = None
    speed: Optional[float] = None

class SignalControlRequest(BaseModel):
    signal_id: str
    status: str  # "green", "yellow", "red"

@app.on_event("startup")
async def startup_event():
    """Initialize systems on startup"""
    logger.info("Starting Metaverse server...")
    
    # Initialize database
    await database.initialize()
    logger.info("Database initialized")
    
    # Initialize world
    await metaverse.world.initialize()
    logger.info("World engine initialized")
    
    # Initialize AI system
    await metaverse.ai_system.initialize()
    logger.info("AI system initialized")
    
    # Initialize ML Quest system
    await metaverse.ml_quest_system.initialize()
    logger.info("ML Quest system initialized")
    
    # Connect physics to world for terrain queries
    metaverse.physics.set_world_reference(metaverse.world)
    logger.info("Physics engine initialized")
    
    # Create some initial NPCs
    await create_initial_npcs()
    logger.info("Initial NPCs created")
    
    # Start the simulation loop
    asyncio.create_task(metaverse.run_simulation_loop())
    logger.info("Simulation loop started")
    
    # Start the railway system
    asyncio.create_task(start_railway_system())
    logger.info("Railway system initialized")
    
    logger.info("Metaverse server startup complete!")

@app.on_event("shutdown")
async def shutdown_event():
    """Clean up on shutdown"""
    logger.info("Shutting down Metaverse server...")
    
    # Close database connection
    await database.close()
    logger.info("Database connection closed")
    
    logger.info("Metaverse server shutdown complete!")

async def create_initial_npcs():
    """Create some initial NPCs in the world"""
    # Create some NPCs at different positions
    positions = [
        Vector3(10, 0, 10),
        Vector3(-10, 0, -10),
        Vector3(20, 0, -20),
        Vector3(-20, 0, 20),
        Vector3(0, 0, 30)
    ]
    
    personality_types = ["friendly", "mysterious", "grumpy", "wise", "excited"]
    
    for i, (position, personality) in enumerate(zip(positions, personality_types)):
        # Get correct height from terrain
        position.y = metaverse.world.get_terrain_height(position.x, position.z)
        
        # Create NPC
        npc_id = await metaverse.ai_system.create_npc(position, personality)
        logger.info(f"Created NPC {npc_id} at position {position.to_dict()}")
        
        # Save NPC to database
        npc = metaverse.ai_system.npcs[npc_id]
        await database.save_npc(
            npc_id,
            npc.position,
            npc.personality_type,
            npc.attributes,
            npc.memory.identity
        )

# API Endpoints
@app.get("/api/status")
async def get_status():
    """Get the server status"""
    return {
        "status": "online",
        "users_online": len(metaverse.users),
        "npcs_active": len(metaverse.ai_system.npcs),
        "time": time.time(),
        "trains": len(railway_system.trains),
        "stations": len(railway_system.stations),
        "tracks": len(railway_system.tracks)
    }

@app.get("/api/user/{user_id}")
async def get_user(user_id: str, db = Depends(get_db)):
    """Get user information"""
    user = await db.load_user(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user.get_state()

@app.get("/api/npc/{npc_id}")
async def get_npc(npc_id: str):
    """Get NPC information"""
    npc_state = await metaverse.ai_system.get_npc_state(npc_id)
    if npc_state is None:
        raise HTTPException(status_code=404, detail="NPC not found")
    return npc_state

@app.get("/api/npcs/nearby")
async def get_nearby_npcs(x: float, y: float, z: float, radius: float = 50.0):
    """Get NPCs near a position"""
    position = Vector3(x, y, z)
    npc_ids = metaverse.ai_system.get_npcs_in_range(position, radius)
    
    npcs = []
    for npc_id in npc_ids:
        npc_state = await metaverse.ai_system.get_npc_state(npc_id)
        if npc_state:
            npcs.append(npc_state)
    
    return {"npcs": npcs}

@app.get("/api/world/chunks")
async def get_world_chunks(x: float, y: float, z: float, view_distance: int = 2):
    """Get world chunks around a position"""
    position = Vector3(x, y, z)
    chunks = await metaverse.world.get_chunks_for_client(position, view_distance)
    return {"chunks": chunks}

@app.get("/api/world/objects")
async def get_world_objects(x: float, y: float, z: float, radius: float = 50.0):
    """Get objects near a position"""
    position = Vector3(x, y, z)
    objects = await metaverse.world.get_nearby_objects(position, radius)
    return {"objects": objects}

# Add new API endpoints for ML Quest System

@app.get("/api/quests")
async def get_available_quests(user_id: str):
    """Get quests available to a user"""
    quests = await metaverse.ml_quest_system.get_available_quests(user_id)
    return {"quests": quests}

@app.get("/api/quest/{quest_id}")
async def get_quest_details(quest_id: str):
    """Get details about a specific quest"""
    quest = await metaverse.ml_quest_system.get_quest(quest_id)
    if quest is None:
        raise HTTPException(status_code=404, detail="Quest not found")
    return quest

@app.post("/api/quest/{quest_id}/start")
async def start_quest(quest_id: str, user_id: str):
    """Start a quest for a user"""
    result = await metaverse.ml_quest_system.start_quest(user_id, quest_id)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/api/quest/{quest_id}/submit")
async def submit_quest_step(quest_id: str, user_id: str, response: Dict[str, Any]):
    """Submit a response for a quest step"""
    result = await metaverse.ml_quest_system.submit_quest_step(user_id, quest_id, response)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/api/quest/create")
async def create_quest(quest_data: Dict[str, Any]):
    """Create a new user quest"""
    user_id = quest_data.get("user_id", "")
    name = quest_data.get("name", "")
    description = quest_data.get("description", "")
    quest_type = quest_data.get("quest_type", "")
    difficulty = quest_data.get("difficulty", 1)
    rewards = quest_data.get("rewards", {})
    steps = quest_data.get("steps", [])
    
    if not user_id or not name or not description or not quest_type or not steps:
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    quest_id = await metaverse.ml_quest_system.create_user_quest(
        user_id=user_id,
        name=name,
        description=description,
        quest_type=quest_type,
        difficulty=difficulty,
        rewards=rewards,
        steps=steps
    )
    
    return {"quest_id": quest_id}

@app.get("/api/ml/models")
async def get_ml_models():
    """Get information about available ML models"""
    models = {}
    for model_id in metaverse.ml_quest_system.ml_models:
        model_info = await metaverse.ml_quest_system.get_model_info(model_id)
        if model_info:
            models[model_id] = model_info
    
    return {"models": models}

@app.get("/api/ml/model/{model_id}")
async def get_model_info(model_id: str):
    """Get information about a specific ML model"""
    model_info = await metaverse.ml_quest_system.get_model_info(model_id)
    if model_info is None:
        raise HTTPException(status_code=404, detail="Model not found")
    return model_info

@app.post("/api/ml/model/{model_id}/predict")
async def make_prediction(model_id: str, input_data: Dict[str, Any]):
    """Use a trained model to make predictions"""
    result = await metaverse.ml_quest_system.predict(model_id, input_data)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

@app.post("/api/ml/model/{model_id}/train")
async def train_model(model_id: str):
    """Manually trigger training for a model"""
    result = await metaverse.ml_quest_system.train_model(model_id)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

# WebSocket routes are defined in metaverse_core.py

# Railway system endpoints
@app.get("/api/railway/trains")
async def get_trains():
    return {"trains": list(railway_system.trains.values())}

@app.get("/api/railway/trains/{train_id}")
async def get_train(train_id: str):
    train = railway_system.get_train(train_id)
    if not train:
        raise HTTPException(status_code=404, detail=f"Train {train_id} not found")
    return {"train": train}

@app.get("/api/railway/stations")
async def get_stations():
    return {"stations": list(railway_system.stations.values())}

@app.get("/api/railway/stations/{station_id}")
async def get_station(station_id: str):
    station = railway_system.get_station(station_id)
    if not station:
        raise HTTPException(status_code=404, detail=f"Station {station_id} not found")
    return {"station": station}

@app.get("/api/railway/tracks")
async def get_tracks():
    return {"tracks": list(railway_system.tracks.values())}

@app.post("/api/railway/train-control")
async def control_train(request: TrainControlRequest):
    train = railway_system.get_train(request.train_id)
    if not train:
        raise HTTPException(status_code=404, detail=f"Train {request.train_id} not found")
    
    if request.action == "start" and request.target_station_id:
        # Check if target station exists
        if request.target_station_id not in railway_system.stations:
            raise HTTPException(status_code=400, detail=f"Station {request.target_station_id} not found")
        
        train.start_journey(request.target_station_id)
        train.speed = min(train.max_speed * 0.1, 20.0)  # Start at 10% speed or 20 km/h, whichever is lower
        return {"status": "success", "message": f"Train {train.name} started journey to {request.target_station_id}"}
    
    elif request.action == "stop":
        train.status = "stopped"
        train.speed = 0.0
        return {"status": "success", "message": f"Train {train.name} stopped"}
    
    elif request.action == "accelerate":
        if train.status != "moving":
            train.status = "moving"
        
        target_speed = request.speed if request.speed is not None else train.speed + 10.0
        train.speed = min(target_speed, train.max_speed)
        return {"status": "success", "message": f"Train {train.name} accelerated to {train.speed} km/h"}
    
    elif request.action == "decelerate":
        target_speed = request.speed if request.speed is not None else max(0, train.speed - 10.0)
        train.speed = max(0, target_speed)
        
        if train.speed < 0.1:
            train.speed = 0.0
            train.status = "stopped"
            
        return {"status": "success", "message": f"Train {train.name} decelerated to {train.speed} km/h"}
    
    else:
        raise HTTPException(status_code=400, detail=f"Invalid action: {request.action}")

@app.post("/api/railway/signal-control")
async def control_signal(request: SignalControlRequest):
    signal = railway_system.get_signal(request.signal_id)
    if not signal:
        raise HTTPException(status_code=404, detail=f"Signal {request.signal_id} not found")
    
    try:
        signal.set_status(request.status)
        return {"status": "success", "message": f"Signal {request.signal_id} set to {request.status}"}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/world/railway-chunk")
async def get_railway_chunk(request: ChunkRequest):
    # Convert request to Position
    position = Position(x=request.x, y=request.y, z=request.z)
    
    # Get chunk data
    chunk = railway_system.get_world_chunk(position, request.view_distance)
    
    # Return as simplified dict to avoid serialization issues
    return {
        "position": chunk.position.dict(),
        "size": chunk.size,
        "trains": [train.dict() for train in chunk.trains],
        "stations": [station.dict() for station in chunk.stations],
        "tracks": [track.dict() for track in chunk.tracks],
        "signals": [signal.dict() for signal in chunk.signals]
    }

# WebSocket for real-time updates
@app.websocket("/ws/railway")
async def railway_websocket(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    
    try:
        while True:
            # Receive and parse client message
            data = await websocket.receive_text()
            message = json.loads(data)
            
            if message["type"] == "position_update":
                # Client has sent their position, send back nearby railway objects
                position = Position(
                    x=message["data"]["x"],
                    y=message["data"]["y"],
                    z=message["data"]["z"]
                )
                view_distance = message["data"].get("view_distance", 500.0)
                
                chunk = railway_system.get_world_chunk(position, view_distance)
                
                # Send railway data to client
                await websocket.send_json({
                    "type": "railway_update",
                    "data": {
                        "trains": [train.dict() for train in chunk.trains],
                        "stations": [station.dict() for station in chunk.stations],
                        "tracks": [track.dict() for track in chunk.tracks],
                        "signals": [signal.dict() for signal in chunk.signals]
                    }
                })
            
            elif message["type"] == "train_control":
                # Client wants to control a train
                train_id = message["data"]["train_id"]
                action = message["data"]["action"]
                target_station_id = message["data"].get("target_station_id")
                speed = message["data"].get("speed")
                
                try:
                    train = railway_system.get_train(train_id)
                    if not train:
                        await websocket.send_json({
                            "type": "error",
                            "data": {"message": f"Train {train_id} not found"}
                        })
                        continue
                    
                    if action == "start" and target_station_id:
                        train.start_journey(target_station_id)
                        train.speed = 20.0  # Initial speed
                    elif action == "stop":
                        train.status = "stopped"
                        train.speed = 0.0
                    elif action == "set_speed" and speed is not None:
                        train.speed = min(max(0, speed), train.max_speed)
                    
                    await websocket.send_json({
                        "type": "train_update",
                        "data": train.dict()
                    })
                    
                except Exception as e:
                    await websocket.send_json({
                        "type": "error",
                        "data": {"message": str(e)}
                    })
    
    except WebSocketDisconnect:
        active_connections.remove(websocket)
    
    except Exception as e:
        print(f"WebSocket error: {e}")
        if websocket in active_connections:
            active_connections.remove(websocket)

# Background task to update the railway system and notify clients
@app.on_event("startup")
async def start_railway_system():
    asyncio.create_task(update_railway_system())

async def update_railway_system():
    while True:
        # Update the railway system
        railway_system.update()
        
        # Notify all connected clients about changes
        if active_connections:
            update_data = {
                "type": "railway_update",
                "data": {
                    "trains": [train.dict() for train in railway_system.trains.values()],
                    "signals": [signal.dict() for signal in railway_system.signals.values()]
                }
            }
            
            # Send to all connected clients
            for connection in active_connections:
                try:
                    await connection.send_json(update_data)
                except Exception as e:
                    print(f"Error sending update to client: {e}")
        
        # Update every 100ms
        await asyncio.sleep(0.1)

def start():
    """Start the Metaverse server"""
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    start() 