from typing import Dict, Any, List, Optional
from ..core.vector3 import Vector3

class User:
    def __init__(self, user_id: str):
        self.id = user_id
        self.username = f"User_{user_id[:8]}"  # Default username
        self.position = Vector3(0, 0, 0)  # Starting position
        self.rotation = 0.0  # Rotation in degrees (around Y axis)
        self.inventory = Inventory()
        self.avatar = Avatar()
        self.last_active = 0  # Timestamp of last activity
        
    def update_position(self, position_data: Dict[str, Any]):
        """Update user position from client data"""
        self.position = Vector3(
            position_data.get("x", self.position.x),
            position_data.get("y", self.position.y),
            position_data.get("z", self.position.z)
        )
        # Update rotation if provided
        if "rotation" in position_data:
            self.rotation = position_data["rotation"]
            
    def update_username(self, new_username: str):
        """Update the user's displayed name"""
        # Clean and validate the username
        new_username = new_username.strip()
        if 3 <= len(new_username) <= 20:
            self.username = new_username
            return True
        return False
        
    def add_to_inventory(self, item_id: str, item_data: Dict[str, Any]) -> bool:
        """Add an item to the user's inventory"""
        return self.inventory.add_item(item_id, item_data)
        
    def remove_from_inventory(self, item_id: str) -> Optional[Dict[str, Any]]:
        """Remove an item from inventory, returns item data if successful"""
        return self.inventory.remove_item(item_id)
        
    def has_item(self, item_id: str) -> bool:
        """Check if user has a specific item"""
        return self.inventory.has_item(item_id)
        
    def update_avatar(self, avatar_data: Dict[str, Any]) -> bool:
        """Update avatar appearance"""
        return self.avatar.update(avatar_data)
        
    def get_state(self) -> Dict[str, Any]:
        """Get serializable user state for network transmission"""
        return {
            "id": self.id,
            "username": self.username,
            "position": self.position.to_dict(),
            "rotation": self.rotation,
            "avatar": self.avatar.get_data()
        }
        
    def to_dict(self) -> Dict[str, Any]:
        """Convert user to complete dictionary for storage"""
        return {
            "id": self.id,
            "username": self.username,
            "position": self.position.to_dict(),
            "rotation": self.rotation,
            "inventory": self.inventory.to_dict(),
            "avatar": self.avatar.to_dict(),
            "last_active": self.last_active
        }
        
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'User':
        """Create a user instance from stored data"""
        user = cls(data["id"])
        user.username = data.get("username", user.username)
        
        position_data = data.get("position", {})
        user.position = Vector3.from_dict(position_data)
        
        user.rotation = data.get("rotation", 0.0)
        
        if "inventory" in data:
            user.inventory = Inventory.from_dict(data["inventory"])
            
        if "avatar" in data:
            user.avatar = Avatar.from_dict(data["avatar"])
            
        user.last_active = data.get("last_active", 0)
        
        return user

class Inventory:
    def __init__(self):
        self.items = {}  # Dictionary mapping item_id to item data
        self.max_slots = 20  # Maximum inventory capacity
        
    def add_item(self, item_id: str, item_data: Dict[str, Any]) -> bool:
        """Add an item to inventory"""
        # Check if inventory is full
        if len(self.items) >= self.max_slots and item_id not in self.items:
            return False
            
        # If item already exists and is stackable, increase quantity
        if item_id in self.items and item_data.get("stackable", False):
            self.items[item_id]["quantity"] = self.items[item_id].get("quantity", 1) + item_data.get("quantity", 1)
        else:
            # Otherwise add as new item
            self.items[item_id] = item_data
            
        return True
        
    def remove_item(self, item_id: str, quantity: int = 1) -> Optional[Dict[str, Any]]:
        """Remove an item from inventory"""
        if item_id not in self.items:
            return None
            
        item_data = self.items[item_id]
        
        # If item is stackable and has quantity > 1, decrease quantity
        if item_data.get("stackable", False) and item_data.get("quantity", 1) > quantity:
            item_data["quantity"] -= quantity
            return {"id": item_id, **item_data, "quantity": quantity}
        else:
            # Otherwise remove the item entirely
            return {"id": item_id, **self.items.pop(item_id)}
            
    def has_item(self, item_id: str, quantity: int = 1) -> bool:
        """Check if inventory contains an item"""
        if item_id not in self.items:
            return False
            
        # If checking quantity, verify we have enough
        if quantity > 1 and self.items[item_id].get("quantity", 1) < quantity:
            return False
            
        return True
        
    def get_items(self) -> List[Dict[str, Any]]:
        """Get all items in inventory"""
        return [{"id": item_id, **item_data} for item_id, item_data in self.items.items()]
        
    def to_dict(self) -> Dict[str, Dict[str, Any]]:
        """Convert inventory to dictionary for storage"""
        return self.items
        
    @classmethod
    def from_dict(cls, data: Dict[str, Dict[str, Any]]) -> 'Inventory':
        """Create inventory from stored data"""
        inventory = cls()
        inventory.items = data
        return inventory

class Avatar:
    def __init__(self):
        # Default avatar settings
        self.model = "default_human"
        self.skin_color = "#F5D5C4"
        self.hair_style = "default"
        self.hair_color = "#8B4513"
        self.eye_color = "#593F1C"
        self.outfit = "casual"
        self.accessories = []
        self.animations = {}
        self.customization = {}
        
    def update(self, avatar_data: Dict[str, Any]) -> bool:
        """Update avatar with new appearance data"""
        # Update only provided fields
        if "model" in avatar_data:
            self.model = avatar_data["model"]
            
        if "skin_color" in avatar_data:
            self.skin_color = avatar_data["skin_color"]
            
        if "hair_style" in avatar_data:
            self.hair_style = avatar_data["hair_style"]
            
        if "hair_color" in avatar_data:
            self.hair_color = avatar_data["hair_color"]
            
        if "eye_color" in avatar_data:
            self.eye_color = avatar_data["eye_color"]
            
        if "outfit" in avatar_data:
            self.outfit = avatar_data["outfit"]
            
        if "accessories" in avatar_data:
            self.accessories = avatar_data["accessories"]
            
        if "customization" in avatar_data:
            # Merge customization dictionaries
            self.customization.update(avatar_data["customization"])
            
        return True
        
    def get_data(self) -> Dict[str, Any]:
        """Get basic avatar data for display"""
        return {
            "model": self.model,
            "skin_color": self.skin_color,
            "hair_style": self.hair_style,
            "hair_color": self.hair_color,
            "outfit": self.outfit
        }
        
    def to_dict(self) -> Dict[str, Any]:
        """Convert avatar to complete dictionary for storage"""
        return {
            "model": self.model,
            "skin_color": self.skin_color,
            "hair_style": self.hair_style,
            "hair_color": self.hair_color,
            "eye_color": self.eye_color,
            "outfit": self.outfit,
            "accessories": self.accessories,
            "customization": self.customization
        }
        
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Avatar':
        """Create avatar from stored data"""
        avatar = cls()
        
        avatar.model = data.get("model", avatar.model)
        avatar.skin_color = data.get("skin_color", avatar.skin_color)
        avatar.hair_style = data.get("hair_style", avatar.hair_style)
        avatar.hair_color = data.get("hair_color", avatar.hair_color)
        avatar.eye_color = data.get("eye_color", avatar.eye_color)
        avatar.outfit = data.get("outfit", avatar.outfit)
        avatar.accessories = data.get("accessories", avatar.accessories)
        avatar.customization = data.get("customization", avatar.customization)
        
        return avatar 