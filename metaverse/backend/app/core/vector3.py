from dataclasses import dataclass
from typing import Dict, Any

@dataclass
class Vector3:
    x: float
    y: float
    z: float
    
    def __add__(self, other):
        if isinstance(other, Vector3):
            return Vector3(self.x + other.x, self.y + other.y, self.z + other.z)
        return NotImplemented
    
    def __mul__(self, scalar: float):
        if isinstance(scalar, (int, float)):
            return Vector3(self.x * scalar, self.y * scalar, self.z * scalar)
        return NotImplemented
        
    def to_dict(self) -> Dict[str, float]:
        return {"x": self.x, "y": self.y, "z": self.z}
        
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Vector3':
        return cls(x=data.get("x", 0.0), y=data.get("y", 0.0), z=data.get("z", 0.0)) 