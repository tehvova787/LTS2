from fastapi import WebSocket
from typing import List, Dict, Any
import asyncio
import json
import random
from datetime import datetime, timedelta

class WebSocketManager:
    """
    WebSocket Manager for handling real-time market data connections
    """
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.market_task = None
        self.running = False
    
    async def connect(self, websocket: WebSocket):
        """Connect a new WebSocket client"""
        await websocket.accept()
        self.active_connections.append(websocket)
        
        # Start market data generation if not already running
        if not self.running:
            self.running = True
            self.market_task = asyncio.create_task(self.generate_market_data())
    
    def disconnect(self, websocket: WebSocket):
        """Disconnect a WebSocket client"""
        self.active_connections.remove(websocket)
        
        # Stop market data generation if no clients are connected
        if not self.active_connections and self.running:
            self.running = False
            if self.market_task:
                self.market_task.cancel()
    
    async def broadcast(self, message: Dict[str, Any]):
        """Broadcast a message to all connected clients"""
        disconnected_websockets = []
        
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except RuntimeError:
                # Client disconnected
                disconnected_websockets.append(connection)
        
        # Remove disconnected clients
        for websocket in disconnected_websockets:
            self.disconnect(websocket)
    
    async def generate_market_data(self):
        """Generate and broadcast real-time market data"""
        # Initial price
        price = 100.0
        
        # Loop while clients are connected
        while self.running:
            try:
                # Generate random price movement
                change_percent = random.uniform(-0.002, 0.002)  # 0.2% max change
                price *= (1 + change_percent)
                
                # Create market data message
                timestamp = datetime.utcnow()
                market_data = {
                    "timestamp": timestamp.isoformat(),
                    "price": round(price, 2),
                    "change": round(change_percent * 100, 3),
                    "volume": random.randint(100, 1000)
                }
                
                # Broadcast to all clients
                await self.broadcast(market_data)
                
                # Wait before generating next data point
                await asyncio.sleep(1)
            except asyncio.CancelledError:
                # Task was cancelled
                break
            except Exception as e:
                print(f"Error in market data generation: {e}")
                await asyncio.sleep(5)  # Wait before retrying

# Create singleton instance
websocket_manager = WebSocketManager() 