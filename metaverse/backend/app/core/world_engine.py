import asyncio
from typing import Dict, Any, List, Tuple
import uuid
import numpy as np
from .vector3 import Vector3

class WorldEngine:
    def __init__(self):
        self.grid_size = 1000
        self.chunk_size = 16
        self.chunks = {}
        self.objects = {}
        self.world_generator = WorldGenerator()
        
    async def initialize(self):
        """Initialize the world with some starter chunks"""
        # Generate the initial chunks around origin
        await self.generate_chunks_around_position(Vector3(0, 0, 0), 2)
        
    async def generate_chunks_around_position(self, position: Vector3, radius: int = 1):
        """Generate chunks in a square around the given position with given radius"""
        chunk_x = int(position.x // self.chunk_size)
        chunk_z = int(position.z // self.chunk_size)
        
        for x in range(chunk_x - radius, chunk_x + radius + 1):
            for z in range(chunk_z - radius, chunk_z + radius + 1):
                chunk_pos = Vector3(x * self.chunk_size, 0, z * self.chunk_size)
                chunk_id = f"{x}:{z}"
                
                if chunk_id not in self.chunks:
                    chunk = await self.world_generator.create_chunk(chunk_pos, self.chunk_size)
                    self.chunks[chunk_id] = chunk
                    
    async def get_chunks_for_client(self, position: Vector3, view_distance: int = 2) -> List[Dict[str, Any]]:
        """Get a list of chunks data to send to the client"""
        chunk_x = int(position.x // self.chunk_size)
        chunk_z = int(position.z // self.chunk_size)
        
        # First ensure all needed chunks are generated
        await self.generate_chunks_around_position(position, view_distance)
        
        # Then return chunk data
        chunk_data = []
        for x in range(chunk_x - view_distance, chunk_x + view_distance + 1):
            for z in range(chunk_z - view_distance, chunk_z + view_distance + 1):
                chunk_id = f"{x}:{z}"
                if chunk_id in self.chunks:
                    chunk_data.append(self.chunks[chunk_id].to_client_data())
                    
        return chunk_data
        
    async def get_nearby_objects(self, position: Vector3, radius: float = 50.0) -> List[Dict[str, Any]]:
        """Get all objects near a position"""
        nearby_objects = []
        
        for obj_id, obj in self.objects.items():
            if self.is_position_in_range(position, obj.position, radius):
                nearby_objects.append(obj.to_client_data())
                
        return nearby_objects
    
    def is_position_in_range(self, pos1: Vector3, pos2: Vector3, range_limit: float) -> bool:
        """Check if two positions are within range"""
        dx = pos1.x - pos2.x
        dy = pos1.y - pos2.y
        dz = pos1.z - pos2.z
        
        distance_squared = dx*dx + dy*dy + dz*dz
        return distance_squared <= range_limit*range_limit
        
    async def add_object(self, object_type: str, position: Vector3, properties: Dict[str, Any] = None) -> str:
        """Add a new object to the world"""
        obj_id = str(uuid.uuid4())
        obj = WorldObject(obj_id, object_type, position, properties or {})
        self.objects[obj_id] = obj
        return obj_id
        
    async def update_world_state(self):
        """Update the state of all objects in the world"""
        for obj in list(self.objects.values()):
            await obj.update()
            
    def get_terrain_height(self, x: float, z: float) -> float:
        """Get the terrain height at a given x,z position"""
        chunk_x = int(x // self.chunk_size)
        chunk_z = int(z // self.chunk_size)
        chunk_id = f"{chunk_x}:{chunk_z}"
        
        if chunk_id not in self.chunks:
            return 0.0  # Default height if chunk not loaded
            
        # Get local coordinates within the chunk
        local_x = int(x % self.chunk_size)
        local_z = int(z % self.chunk_size)
        
        return self.chunks[chunk_id].get_height(local_x, local_z)

class WorldGenerator:
    def __init__(self):
        # Different seed for each feature
        self.terrain_seed = np.random.randint(0, 100000)
        self.vegetation_seed = np.random.randint(0, 100000)
        self.structure_seed = np.random.randint(0, 100000)
        
    async def create_chunk(self, position: Vector3, chunk_size: int) -> 'Chunk':
        """Generate a new chunk at the given position"""
        chunk = Chunk(position, chunk_size)
        
        # Generate terrain heightmap
        heights = self.generate_terrain(position, chunk_size)
        chunk.set_heightmap(heights)
        
        # Generate vegetation
        vegetation = await self.generate_vegetation(position, heights, chunk_size)
        chunk.set_vegetation(vegetation)
        
        # Generate structures
        structures = await self.generate_structures(position, heights, chunk_size)
        chunk.set_structures(structures)
        
        return chunk
        
    def generate_terrain(self, position: Vector3, chunk_size: int) -> np.ndarray:
        """Generate terrain heightmap using simple noise function"""
        heights = np.zeros((chunk_size, chunk_size), dtype=float)
        
        # Используем numpy для генерации шума вместо библиотеки noise
        np.random.seed(self.terrain_seed + hash(f"{position.x}:{position.z}") % 100000)
        
        # Базовая высота для этого чанка
        base_height = np.random.uniform(10, 30)
        
        # Создаем простой ландшафт с холмами
        for x in range(chunk_size):
            for z in range(chunk_size):
                # Рассчитываем мировые координаты
                world_x = position.x + x
                world_z = position.z + z
                
                # Создаем простой шум на основе синуса
                noise_x = np.sin(world_x / 20.0) * 5.0
                noise_z = np.cos(world_z / 15.0) * 5.0
                
                # Добавляем случайные вариации
                random_noise = np.random.uniform(-2.0, 2.0)
                
                # Комбинируем все компоненты для окончательной высоты
                height = base_height + noise_x + noise_z + random_noise
                
                heights[x, z] = height
                
        return heights
        
    async def generate_vegetation(self, position: Vector3, heights: np.ndarray, chunk_size: int) -> List[Dict[str, Any]]:
        """Generate vegetation based on the heightmap"""
        vegetation = []
        
        # Randomize vegetation
        np.random.seed(self.vegetation_seed + hash(f"{position.x}:{position.z}") % 100000)
        
        # Vegetation types
        veg_types = ["tree", "bush", "grass", "flower"]
        
        # Generate vegetation with some probability
        for x in range(chunk_size):
            for z in range(chunk_size):
                if np.random.random() < 0.05:  # 5% chance
                    veg_type = np.random.choice(veg_types, p=[0.2, 0.3, 0.4, 0.1])
                    
                    world_x = position.x + x
                    world_z = position.z + z
                    world_y = heights[x, z]
                    
                    vegetation.append({
                        "type": veg_type,
                        "position": {
                            "x": world_x,
                            "y": world_y,
                            "z": world_z
                        },
                        "properties": {
                            "scale": np.random.uniform(0.8, 1.2),
                            "rotation": np.random.uniform(0, 360)
                        }
                    })
                    
        return vegetation
        
    async def generate_structures(self, position: Vector3, heights: np.ndarray, chunk_size: int) -> List[Dict[str, Any]]:
        """Generate structures like buildings or landmarks"""
        structures = []
        
        # Randomize structures
        np.random.seed(self.structure_seed + hash(f"{position.x}:{position.z}") % 100000)
        
        # Very rare chance to generate a structure (1% per chunk)
        if np.random.random() < 0.01:
            structure_types = ["house", "tower", "ruins", "camp"]
            structure_type = np.random.choice(structure_types)
            
            # Find a suitable location (somewhat flat area)
            suitable_locations = []
            
            for x in range(2, chunk_size-2):
                for z in range(2, chunk_size-2):
                    # Check if the area is relatively flat
                    area = heights[x-2:x+3, z-2:z+3]
                    if np.max(area) - np.min(area) < 2.0:
                        suitable_locations.append((x, z))
            
            if suitable_locations:
                x, z = suitable_locations[np.random.randint(0, len(suitable_locations))]
                world_x = position.x + x
                world_z = position.z + z
                world_y = heights[x, z]
                
                structures.append({
                    "type": structure_type,
                    "position": {
                        "x": world_x,
                        "y": world_y,
                        "z": world_z
                    },
                    "properties": {
                        "rotation": np.random.uniform(0, 360),
                        "variant": np.random.randint(1, 4)
                    }
                })
                
        return structures

class Chunk:
    def __init__(self, position: Vector3, size: int):
        self.position = position
        self.size = size
        self.heightmap = None
        self.vegetation = []
        self.structures = []
        
    def set_heightmap(self, heightmap: np.ndarray):
        self.heightmap = heightmap
        
    def set_vegetation(self, vegetation: List[Dict[str, Any]]):
        self.vegetation = vegetation
        
    def set_structures(self, structures: List[Dict[str, Any]]):
        self.structures = structures
        
    def get_height(self, x: int, z: int) -> float:
        """Get the terrain height at a local position"""
        if 0 <= x < self.size and 0 <= z < self.size:
            return self.heightmap[x, z]
        return 0.0
        
    def to_client_data(self) -> Dict[str, Any]:
        """Convert chunk data to a format suitable for the client"""
        return {
            "position": self.position.to_dict(),
            "size": self.size,
            "heightmap": self.heightmap.tolist(),
            "vegetation": self.vegetation,
            "structures": self.structures
        }

class WorldObject:
    def __init__(self, obj_id: str, obj_type: str, position: Vector3, properties: Dict[str, Any]):
        self.id = obj_id
        self.type = obj_type
        self.position = position
        self.properties = properties
        
    async def update(self):
        """Update the object state"""
        # This would implement any object-specific logic
        pass
        
    def to_client_data(self) -> Dict[str, Any]:
        """Convert object data to a format suitable for the client"""
        return {
            "id": self.id,
            "type": self.type,
            "position": self.position.to_dict(),
            "properties": self.properties
        } 