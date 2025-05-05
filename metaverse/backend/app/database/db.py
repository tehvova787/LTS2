import asyncio
import json
import os
from typing import Dict, Any, List, Optional, Union
import aiosqlite
from ..models.user import User
from ..core.vector3 import Vector3

class Database:
    def __init__(self, db_path: str = "metaverse.db"):
        self.db_path = db_path
        self.connection = None
        
    async def initialize(self):
        """Initialize the database and create tables if they don't exist"""
        self.connection = await aiosqlite.connect(self.db_path)
        
        # Enable foreign keys
        await self.connection.execute("PRAGMA foreign_keys = ON")
        
        # Create tables
        await self.create_tables()
        
    async def close(self):
        """Close database connection"""
        if self.connection:
            await self.connection.close()
            
    async def create_tables(self):
        """Create database tables if they don't exist"""
        # Users table
        await self.connection.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            position_data TEXT NOT NULL,
            avatar_data TEXT NOT NULL,
            inventory_data TEXT NOT NULL,
            last_active INTEGER NOT NULL
        )
        """)
        
        # World chunks table
        await self.connection.execute("""
        CREATE TABLE IF NOT EXISTS world_chunks (
            chunk_id TEXT PRIMARY KEY,
            position_data TEXT NOT NULL,
            terrain_data BLOB NOT NULL,
            object_data TEXT NOT NULL,
            last_modified INTEGER NOT NULL
        )
        """)
        
        # NPCs table
        await self.connection.execute("""
        CREATE TABLE IF NOT EXISTS npcs (
            npc_id TEXT PRIMARY KEY,
            position_data TEXT NOT NULL,
            personality_type TEXT NOT NULL,
            attributes TEXT NOT NULL,
            memory_data TEXT NOT NULL
        )
        """)
        
        # Items table
        await self.connection.execute("""
        CREATE TABLE IF NOT EXISTS items (
            item_id TEXT PRIMARY KEY,
            item_type TEXT NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            properties TEXT NOT NULL
        )
        """)
        
        # Commit the changes
        await self.connection.commit()
    
    # User Methods
    async def save_user(self, user: User) -> bool:
        """Save user data to database"""
        try:
            await self.connection.execute(
                """
                INSERT OR REPLACE INTO users
                (id, username, position_data, avatar_data, inventory_data, last_active)
                VALUES (?, ?, ?, ?, ?, ?)
                """,
                (
                    user.id,
                    user.username,
                    json.dumps(user.position.to_dict()),
                    json.dumps(user.avatar.to_dict()),
                    json.dumps(user.inventory.to_dict()),
                    user.last_active
                )
            )
            await self.connection.commit()
            return True
        except Exception as e:
            print(f"Error saving user: {e}")
            return False
            
    async def load_user(self, user_id: str) -> Optional[User]:
        """Load user data from database"""
        try:
            async with self.connection.execute(
                "SELECT username, position_data, avatar_data, inventory_data, last_active FROM users WHERE id = ?",
                (user_id,)
            ) as cursor:
                row = await cursor.fetchone()
                
            if not row:
                return None
                
            username, position_data, avatar_data, inventory_data, last_active = row
            
            # Create user object
            user = User(user_id)
            user.username = username
            user.position = Vector3.from_dict(json.loads(position_data))
            user.avatar = User.Avatar.from_dict(json.loads(avatar_data))
            user.inventory = User.Inventory.from_dict(json.loads(inventory_data))
            user.last_active = last_active
            
            return user
        except Exception as e:
            print(f"Error loading user: {e}")
            return None
            
    async def delete_user(self, user_id: str) -> bool:
        """Delete a user from the database"""
        try:
            await self.connection.execute("DELETE FROM users WHERE id = ?", (user_id,))
            await self.connection.commit()
            return True
        except Exception as e:
            print(f"Error deleting user: {e}")
            return False
            
    # World Chunk Methods
    async def save_chunk(self, chunk_id: str, position: Vector3, terrain_data: bytes, 
                         object_data: Dict[str, Any]) -> bool:
        """Save a world chunk to the database"""
        try:
            await self.connection.execute(
                """
                INSERT OR REPLACE INTO world_chunks
                (chunk_id, position_data, terrain_data, object_data, last_modified)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    chunk_id,
                    json.dumps(position.to_dict()),
                    terrain_data,
                    json.dumps(object_data),
                    int(asyncio.get_event_loop().time())
                )
            )
            await self.connection.commit()
            return True
        except Exception as e:
            print(f"Error saving chunk: {e}")
            return False
            
    async def load_chunk(self, chunk_id: str) -> Optional[Dict[str, Any]]:
        """Load a world chunk from the database"""
        try:
            async with self.connection.execute(
                "SELECT position_data, terrain_data, object_data, last_modified FROM world_chunks WHERE chunk_id = ?",
                (chunk_id,)
            ) as cursor:
                row = await cursor.fetchone()
                
            if not row:
                return None
                
            position_data, terrain_data, object_data, last_modified = row
            
            return {
                "chunk_id": chunk_id,
                "position": Vector3.from_dict(json.loads(position_data)),
                "terrain_data": terrain_data,
                "object_data": json.loads(object_data),
                "last_modified": last_modified
            }
        except Exception as e:
            print(f"Error loading chunk: {e}")
            return None
            
    async def get_chunks_in_range(self, center_position: Vector3, radius: int) -> List[str]:
        """Get chunk IDs that are within a certain range of a position"""
        # This is a simple implementation - in a real system, you'd use a spatial index
        try:
            chunk_ids = []
            async with self.connection.execute("SELECT chunk_id, position_data FROM world_chunks") as cursor:
                async for row in cursor:
                    chunk_id, position_data = row
                    chunk_pos = Vector3.from_dict(json.loads(position_data))
                    
                    # Check if chunk is within range
                    dx = abs(chunk_pos.x - center_position.x)
                    dz = abs(chunk_pos.z - center_position.z)
                    
                    if dx <= radius and dz <= radius:
                        chunk_ids.append(chunk_id)
                        
            return chunk_ids
        except Exception as e:
            print(f"Error getting chunks in range: {e}")
            return []
            
    # NPC Methods
    async def save_npc(self, npc_id: str, position: Vector3, personality_type: str,
                      attributes: Dict[str, Any], memory_data: Dict[str, Any]) -> bool:
        """Save NPC data to database"""
        try:
            await self.connection.execute(
                """
                INSERT OR REPLACE INTO npcs
                (npc_id, position_data, personality_type, attributes, memory_data)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    npc_id,
                    json.dumps(position.to_dict()),
                    personality_type,
                    json.dumps(attributes),
                    json.dumps(memory_data)
                )
            )
            await self.connection.commit()
            return True
        except Exception as e:
            print(f"Error saving NPC: {e}")
            return False
            
    async def load_npc(self, npc_id: str) -> Optional[Dict[str, Any]]:
        """Load NPC data from database"""
        try:
            async with self.connection.execute(
                "SELECT position_data, personality_type, attributes, memory_data FROM npcs WHERE npc_id = ?",
                (npc_id,)
            ) as cursor:
                row = await cursor.fetchone()
                
            if not row:
                return None
                
            position_data, personality_type, attributes, memory_data = row
            
            return {
                "npc_id": npc_id,
                "position": Vector3.from_dict(json.loads(position_data)),
                "personality_type": personality_type,
                "attributes": json.loads(attributes),
                "memory_data": json.loads(memory_data)
            }
        except Exception as e:
            print(f"Error loading NPC: {e}")
            return None
            
    async def get_npcs_in_range(self, center_position: Vector3, radius: float) -> List[str]:
        """Get NPC IDs that are within a certain range of a position"""
        try:
            npc_ids = []
            async with self.connection.execute("SELECT npc_id, position_data FROM npcs") as cursor:
                async for row in cursor:
                    npc_id, position_data = row
                    npc_pos = Vector3.from_dict(json.loads(position_data))
                    
                    # Check if NPC is within range
                    dx = npc_pos.x - center_position.x
                    dy = npc_pos.y - center_position.y
                    dz = npc_pos.z - center_position.z
                    
                    distance_squared = dx*dx + dy*dy + dz*dz
                    
                    if distance_squared <= radius*radius:
                        npc_ids.append(npc_id)
                        
            return npc_ids
        except Exception as e:
            print(f"Error getting NPCs in range: {e}")
            return []
            
    # Item Methods
    async def save_item(self, item_id: str, item_type: str, name: str, 
                       description: str, properties: Dict[str, Any]) -> bool:
        """Save item template to database"""
        try:
            await self.connection.execute(
                """
                INSERT OR REPLACE INTO items
                (item_id, item_type, name, description, properties)
                VALUES (?, ?, ?, ?, ?)
                """,
                (
                    item_id,
                    item_type,
                    name,
                    description,
                    json.dumps(properties)
                )
            )
            await self.connection.commit()
            return True
        except Exception as e:
            print(f"Error saving item: {e}")
            return False
            
    async def load_item(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Load item template from database"""
        try:
            async with self.connection.execute(
                "SELECT item_type, name, description, properties FROM items WHERE item_id = ?",
                (item_id,)
            ) as cursor:
                row = await cursor.fetchone()
                
            if not row:
                return None
                
            item_type, name, description, properties = row
            
            return {
                "item_id": item_id,
                "item_type": item_type,
                "name": name,
                "description": description,
                "properties": json.loads(properties)
            }
        except Exception as e:
            print(f"Error loading item: {e}")
            return None
            
    async def get_items_by_type(self, item_type: str) -> List[Dict[str, Any]]:
        """Get all items of a specific type"""
        try:
            items = []
            async with self.connection.execute(
                "SELECT item_id, name, description, properties FROM items WHERE item_type = ?",
                (item_type,)
            ) as cursor:
                async for row in cursor:
                    item_id, name, description, properties = row
                    items.append({
                        "item_id": item_id,
                        "item_type": item_type,
                        "name": name,
                        "description": description,
                        "properties": json.loads(properties)
                    })
                    
            return items
        except Exception as e:
            print(f"Error getting items by type: {e}")
            return [] 