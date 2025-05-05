from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncio
from typing import Dict, Any, List, Optional
import logging

from .world_engine import WorldEngine
from .physics_engine import PhysicsEngine
from ..ai.ai_system import AISystem
from ..ai.ml_quest_system import MLQuestSystem
from ..core.vector3 import Vector3

logger = logging.getLogger("metaverse.core")

class MetaverseCore:
    def __init__(self):
        self.app = FastAPI(title="Metaverse API", description="Mini-Metaverse with AI")
        self.world = WorldEngine()
        self.ai_system = AISystem()
        self.physics = PhysicsEngine()
        self.ml_quest_system = MLQuestSystem()
        self.users = {}
        self.active_connections = {}
        self.setup_routes()
        
    def setup_routes(self):
        @self.app.get("/")
        async def root():
            return {"message": "Welcome to the Metaverse API"}
            
        @self.app.websocket("/ws/{user_id}")
        async def websocket_endpoint(websocket: WebSocket, user_id: str):
            await self.connect(websocket, user_id)
            
            try:
                while True:
                    data = await websocket.receive_json()
                    await self.handle_message(user_id, data)
            except WebSocketDisconnect:
                await self.disconnect(user_id)
    
    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        self.active_connections[user_id] = websocket
        
        await self.broadcast_event({
            "type": "user_joined",
            "user_id": user_id
        }, exclude=[user_id])
        
        logger.info(f"User {user_id} connected")

    async def disconnect(self, user_id: str):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
        
        if user_id in self.users:
            pass
        
        await self.broadcast_event({
            "type": "user_left",
            "user_id": user_id
        })
        
        logger.info(f"User {user_id} disconnected")

    async def handle_message(self, user_id: str, data: Dict[str, Any]):
        message_type = data.get("type", "")
        
        if message_type == "movement":
            await self.handle_movement(user_id, data)
        elif message_type == "chat":
            await self.handle_chat(user_id, data)
        elif message_type == "interaction":
            await self.handle_interaction(user_id, data)
        elif message_type == "quest":
            await self.handle_quest_message(user_id, data)
            
    async def handle_movement(self, user_id: str, data: Dict[str, Any]):
        user = self.users[user_id]["user"]
        user.update_position(data)
        await self.broadcast_user_state(user_id)
        
    async def handle_interaction(self, user_id: str, data: Dict[str, Any]):
        target_id = data.get("target_id")
        interaction_type = data.get("interaction_type")
        
        if target_id.startswith("npc_"):
            await self.ai_system.handle_npc_interaction(user_id, target_id, interaction_type, data)
        
    async def handle_chat(self, user_id: str, data: Dict[str, Any]):
        message = data.get("message", "")
        target_id = data.get("target_id")
        
        if target_id and target_id.startswith("npc_"):
            response = await self.ai_system.process_npc_chat(target_id, message)
            await self.send_to_user(user_id, {
                "type": "chat_response",
                "data": {
                    "from": target_id,
                    "message": response
                }
            })
        else:
            await self.broadcast_chat(user_id, message)
    
    async def handle_quest_message(self, user_id: str, data: Dict[str, Any]):
        quest_action = data.get("action", "")
        
        if quest_action == "get_available":
            quests = await self.ml_quest_system.get_available_quests(user_id)
            
            await self.send_event_to_user(user_id, {
                "type": "quest_list",
                "quests": quests
            })
            
        elif quest_action == "start":
            quest_id = data.get("quest_id", "")
            quest_data = await self.ml_quest_system.start_quest(user_id, quest_id)
            
            await self.send_event_to_user(user_id, {
                "type": "quest_started",
                "data": quest_data
            })
            
        elif quest_action == "submit_step":
            quest_id = data.get("quest_id", "")
            step_response = data.get("response", {})
            
            result = await self.ml_quest_system.submit_quest_step(user_id, quest_id, step_response)
            
            if "quest_completed" in result and result["quest_completed"]:
                await self.send_event_to_user(user_id, {
                    "type": "quest_completed",
                    "quest_id": quest_id,
                    "rewards": result["rewards"]
                })
            else:
                await self.send_event_to_user(user_id, {
                    "type": "quest_step",
                    "data": result
                })
                
        elif quest_action == "create":
            name = data.get("name", "")
            description = data.get("description", "")
            quest_type = data.get("quest_type", "")
            difficulty = data.get("difficulty", 1)
            rewards = data.get("rewards", {})
            steps = data.get("steps", [])
            
            quest_id = await self.ml_quest_system.create_user_quest(
                user_id=user_id,
                name=name,
                description=description,
                quest_type=quest_type,
                difficulty=difficulty,
                rewards=rewards,
                steps=steps
            )
            
            await self.send_event_to_user(user_id, {
                "type": "quest_created",
                "quest_id": quest_id
            })

    async def broadcast_user_state(self, user_id: str):
        user = self.users[user_id]["user"]
        state = user.get_state()
        
        for uid, user_data in self.users.items():
            if uid != user_id:
                await self.send_to_user(uid, {
                    "type": "user_state",
                    "data": {
                        "user_id": user_id,
                        "state": state
                    }
                })
                
    async def broadcast_chat(self, user_id: str, message: str):
        user = self.users[user_id]["user"]
        
        for uid, user_data in self.users.items():
            if uid != user_id:
                other_user = user_data["user"]
                if self.users_are_nearby(user, other_user):
                    await self.send_to_user(uid, {
                        "type": "chat",
                        "data": {
                            "user_id": user_id,
                            "username": user.username,
                            "message": message
                        }
                    })
    
    async def send_to_user(self, user_id: str, data: Dict[str, Any]):
        if user_id in self.users:
            websocket = self.users[user_id]["websocket"]
            await websocket.send_json(data)
            
    def users_are_nearby(self, user1, user2, max_distance: float = 50.0):
        p1 = user1.position
        p2 = user2.position
        
        dx = p1.x - p2.x
        dy = p1.y - p2.y
        dz = p1.z - p2.z
        
        distance_squared = dx*dx + dy*dy + dz*dz
        return distance_squared <= max_distance*max_distance
    
    async def run_simulation_loop(self):
        while True:
            await self.physics.update()
            await self.ai_system.update_npcs()
            await self.world.update()
            await self.send_updates_to_clients()
            await asyncio.sleep(0.05)

    async def send_updates_to_clients(self):
        for user_id, connection in self.active_connections.items():
            if user_id in self.users:
                updates = await self.get_updates_for_user(user_id)
                
                try:
                    await connection.send_json(updates)
                except Exception as e:
                    logger.error(f"Error sending updates to user {user_id}: {e}")

    async def get_updates_for_user(self, user_id: str) -> Dict[str, Any]:
        user_position = Vector3(0, 0, 0)
        if user_id in self.users:
            user_position = self.users[user_id].position
            
        nearby_users = self.get_nearby_users(user_position)
        nearby_npcs = self.ai_system.get_npcs_in_range(user_position, 50.0)
        
        update_data = {
            "type": "world_update",
            "timestamp": self._get_timestamp(),
            "nearby_users": nearby_users,
            "nearby_npcs": []
        }
        
        for npc_id in nearby_npcs:
            npc_state = await self.ai_system.get_npc_state(npc_id)
            if npc_state:
                update_data["nearby_npcs"].append(npc_state)
                
        return update_data
        
    def get_nearby_users(self, position: Vector3, range_limit: float = 50.0) -> List[Dict[str, Any]]:
        nearby_users = []
        
        for user_id, user in self.users.items():
            if self._is_in_range(position, user.position, range_limit):
                nearby_users.append(user.get_state())
                
        return nearby_users
        
    def _is_in_range(self, pos1: Vector3, pos2: Vector3, range_limit: float) -> bool:
        dx = pos1.x - pos2.x
        dy = pos1.y - pos2.y
        dz = pos1.z - pos2.z
        
        distance_squared = dx*dx + dy*dy + dz*dz
        return distance_squared <= range_limit*range_limit
        
    async def broadcast_event(self, event: Dict[str, Any], exclude: List[str] = None):
        if exclude is None:
            exclude = []
            
        for user_id, connection in self.active_connections.items():
            if user_id not in exclude:
                try:
                    await connection.send_json(event)
                except Exception as e:
                    logger.error(f"Error broadcasting to user {user_id}: {e}")
                    
    async def send_event_to_user(self, user_id: str, event: Dict[str, Any]):
        if user_id in self.active_connections:
            try:
                await self.active_connections[user_id].send_json(event)
            except Exception as e:
                logger.error(f"Error sending event to user {user_id}: {e}")
                
    def _get_timestamp(self) -> int:
        import time
        return int(time.time()) 