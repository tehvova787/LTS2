from fastapi import FastAPI, WebSocket, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
import uvicorn
import os

from api.user_routes import router as user_router
from api.course_routes import router as course_router
from api.simulator_routes import router as simulator_router
from models.database import Base
from utils.config import Config

# Initialize FastAPI app
app = FastAPI(title="Trader Education Platform", 
              description="AI-powered education platform for traders",
              version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup database
engine = create_engine(Config.SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Include routers
app.include_router(user_router, prefix="/api/users", tags=["users"])
app.include_router(course_router, prefix="/api/courses", tags=["courses"])
app.include_router(simulator_router, prefix="/api/simulator", tags=["simulator"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Trader Education Platform API"}

# WebSocket for real-time trading data
@app.websocket("/ws/market-data")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            # Process received data
            # Send real-time market data back
            await websocket.send_json({"data": "Real-time market data"})
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 