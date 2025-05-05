import asyncio
import uuid
import random
import json
from typing import Dict, Any, List, Optional, Tuple
import numpy as np
from ..core.vector3 import Vector3

class AISystem:
    def __init__(self):
        # Store NPC instances
        self.npcs = {}
        # Track memory and behavior models
        self.dialogue_model = DialogueModel()
        self.behavior_model = BehaviorModel()
        
    async def initialize(self):
        """Initialize AI system components"""
        await self.dialogue_model.initialize()
        await self.behavior_model.initialize()
        
    async def create_npc(self, position: Vector3, personality_type: str = "default") -> str:
        """Create a new NPC at the given position"""
        npc_id = f"npc_{uuid.uuid4()}"
        npc = NPC(npc_id, position, personality_type, self.dialogue_model, self.behavior_model)
        await npc.initialize()
        self.npcs[npc_id] = npc
        return npc_id
        
    async def remove_npc(self, npc_id: str):
        """Remove an NPC from the system"""
        if npc_id in self.npcs:
            del self.npcs[npc_id]
            
    async def update_npcs(self):
        """Update all NPCs"""
        for npc in list(self.npcs.values()):
            await npc.update()
            
    async def get_npc_state(self, npc_id: str) -> Optional[Dict[str, Any]]:
        """Get the current state of an NPC"""
        if npc_id in self.npcs:
            return self.npcs[npc_id].get_state()
        return None
        
    async def handle_npc_interaction(self, user_id: str, npc_id: str, interaction_type: str, data: Dict[str, Any]):
        """Handle a user interaction with an NPC"""
        if npc_id in self.npcs:
            return await self.npcs[npc_id].handle_interaction(user_id, interaction_type, data)
        return {"error": "NPC not found"}
        
    async def process_npc_chat(self, npc_id: str, message: str) -> str:
        """Process a chat message directed at an NPC"""
        if npc_id in self.npcs:
            return await self.npcs[npc_id].process_chat(message)
        return "NPC not available."
        
    def get_npcs_in_range(self, position: Vector3, range_limit: float) -> List[str]:
        """Get IDs of all NPCs within range of a position"""
        in_range = []
        
        for npc_id, npc in self.npcs.items():
            if self.is_in_range(position, npc.position, range_limit):
                in_range.append(npc_id)
                
        return in_range
        
    def is_in_range(self, pos1: Vector3, pos2: Vector3, range_limit: float) -> bool:
        """Check if two positions are within range"""
        dx = pos1.x - pos2.x
        dy = pos1.y - pos2.y
        dz = pos1.z - pos2.z
        
        distance_squared = dx*dx + dy*dy + dz*dz
        return distance_squared <= range_limit*range_limit

class NPC:
    def __init__(self, npc_id: str, position: Vector3, personality_type: str, 
                 dialogue_model: 'DialogueModel', behavior_model: 'BehaviorModel'):
        self.id = npc_id
        self.position = position
        self.velocity = Vector3(0, 0, 0)
        self.rotation = 0.0  # Rotation around Y axis in degrees
        self.personality_type = personality_type
        self.dialogue_model = dialogue_model
        self.behavior_model = behavior_model
        self.memory = NPCMemory()
        self.behavior_state = "idle"
        self.behavior_data = {}
        self.target_position = None
        self.path = []
        self.interaction_cooldown = 0
        
        # NPC attributes
        self.attributes = {
            "name": self.generate_name(),
            "appearance": self.generate_appearance(),
            "bio": "",
            "mood": "neutral",
            "occupation": self.generate_occupation(),
            "interests": [],
            "dislikes": []
        }
        
    async def initialize(self):
        """Initialize the NPC with generated data"""
        # Generate bio and personality traits based on personality type
        self.attributes["bio"] = await self.generate_bio()
        self.attributes["interests"] = await self.generate_interests()
        self.attributes["dislikes"] = await self.generate_dislikes()
        
        # Initialize memory with self-identity
        self.memory.add_identity(self.attributes)
        
    def generate_name(self) -> str:
        """Generate a random name for the NPC"""
        first_names = ["Alex", "Casey", "Jordan", "Morgan", "Taylor", "Riley", "Quinn", "Avery", 
                      "Charlie", "Skyler", "Dakota", "Phoenix", "Sage", "Blake", "Rowan"]
        last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Miller", "Davis", 
                     "Wilson", "Anderson", "Taylor", "Thomas", "Moore", "Martin", "Lee", "Clark"]
        
        return f"{random.choice(first_names)} {random.choice(last_names)}"
        
    def generate_appearance(self) -> Dict[str, Any]:
        """Generate random appearance for the NPC"""
        hair_colors = ["black", "brown", "blonde", "red", "white", "blue", "purple", "green"]
        eye_colors = ["brown", "blue", "green", "hazel", "gray", "amber"]
        skin_tones = ["light", "fair", "medium", "olive", "tan", "brown", "dark"]
        heights = ["short", "average height", "tall"]
        builds = ["slender", "athletic", "average", "stocky", "muscular"]
        
        return {
            "hair_color": random.choice(hair_colors),
            "eye_color": random.choice(eye_colors),
            "skin_tone": random.choice(skin_tones),
            "height": random.choice(heights),
            "build": random.choice(builds),
            "age": random.randint(18, 80),
            "distinctive_feature": self.generate_distinctive_feature()
        }
        
    def generate_distinctive_feature(self) -> str:
        """Generate a distinctive physical feature"""
        features = [
            "a small scar above their right eyebrow",
            "a birthmark on their left cheek",
            "unusually bright eyes",
            "a friendly smile",
            "a serious expression",
            "a tattoo on their right arm",
            "a unique hairstyle",
            "freckles across their nose and cheeks",
            "small round glasses",
            "a distinctive accent",
            "a beauty mark near their lips",
            "calloused hands",
            "jewelry that they never take off",
            "perfect posture",
            "a slight limp"
        ]
        return random.choice(features)
        
    def generate_occupation(self) -> str:
        """Generate a random occupation for the NPC"""
        occupations = [
            "farmer", "merchant", "guard", "scholar", "artist", 
            "healer", "smith", "hunter", "explorer", "chef", 
            "mage", "warrior", "scout", "engineer", "alchemist",
            "diplomat", "musician", "tailor", "carpenter", "miner"
        ]
        return random.choice(occupations)
        
    async def generate_bio(self) -> str:
        """Generate a bio based on personality and occupation"""
        # This would ideally use a more sophisticated method
        # For now, we'll use templates
        templates = [
            f"{self.attributes['name']} is a {self.attributes['occupation']} who has been living in this area for many years. Known for their {random.choice(['kindness', 'wisdom', 'skill', 'humor', 'creativity'])}, they are well-respected by the locals.",
            f"Originally from a distant place, {self.attributes['name']} came here to work as a {self.attributes['occupation']}. They are {random.choice(['passionate about their work', 'looking for new opportunities', 'seeking knowledge', 'hoping to make a difference'])}.",
            f"As a {self.attributes['occupation']}, {self.attributes['name']} has seen many changes in this region. They have {random.choice(['a wealth of stories to share', 'developed unique skills', 'made many connections', 'learned valuable lessons'])} over the years."
        ]
        return random.choice(templates)
        
    async def generate_interests(self) -> List[str]:
        """Generate random interests based on personality type"""
        all_interests = [
            "astronomy", "cooking", "storytelling", "collecting rare items", 
            "fishing", "history", "crafting", "animals", "botany", "music",
            "puzzles", "trading", "exploring", "combat techniques", "meditation",
            "poetry", "dancing", "brewing", "architecture", "mythology"
        ]
        # Pick 2-4 random interests
        num_interests = random.randint(2, 4)
        return random.sample(all_interests, num_interests)
        
    async def generate_dislikes(self) -> List[str]:
        """Generate random dislikes"""
        all_dislikes = [
            "rudeness", "loud noises", "bad weather", "insects", "being interrupted",
            "spicy food", "early mornings", "crowds", "getting wet", "darkness",
            "heights", "confined spaces", "direct sunlight", "cold weather", "politics"
        ]
        # Pick 1-3 dislikes
        num_dislikes = random.randint(1, 3)
        return random.sample(all_dislikes, num_dislikes)
        
    async def update(self):
        """Update NPC state and behavior"""
        # Update cooldowns
        if self.interaction_cooldown > 0:
            self.interaction_cooldown -= 1
            
        # Get behavior action from model
        behavior_action = await self.behavior_model.get_action(self)
        
        # Execute behavior
        await self.execute_behavior(behavior_action)
        
    async def execute_behavior(self, behavior_action: Dict[str, Any]):
        """Execute a behavior action"""
        action_type = behavior_action.get("type", "idle")
        
        if action_type == "idle":
            # Maybe slightly rotate or look around
            if random.random() < 0.1:
                self.rotation = (self.rotation + random.uniform(-10, 10)) % 360
                
        elif action_type == "walk":
            # Move towards a target position if set
            if self.target_position:
                direction = Vector3(
                    self.target_position.x - self.position.x,
                    self.target_position.y - self.position.y,
                    self.target_position.z - self.position.z
                )
                # Normalize direction and set speed
                distance = (direction.x**2 + direction.y**2 + direction.z**2) ** 0.5
                if distance > 0.1:
                    speed = 0.05  # Units per update
                    direction.x /= distance
                    direction.y /= distance
                    direction.z /= distance
                    
                    # Update position
                    self.position.x += direction.x * speed
                    self.position.y += direction.y * speed
                    self.position.z += direction.z * speed
                    
                    # Update rotation to face movement direction
                    self.rotation = (np.degrees(np.arctan2(direction.z, direction.x)) + 90) % 360
                else:
                    # Reached target, clear it
                    self.target_position = None
            elif random.random() < 0.01:  # 1% chance to pick a new position
                # Pick a random position nearby
                self.target_position = Vector3(
                    self.position.x + random.uniform(-10, 10),
                    self.position.y,
                    self.position.z + random.uniform(-10, 10)
                )
                
        elif action_type == "emote":
            # Update the NPC's mood or animation state
            self.behavior_state = behavior_action.get("emote", "idle")
            # This would trigger animations on the client
        
    async def handle_interaction(self, user_id: str, interaction_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle an interaction from a user"""
        # Record this interaction in memory
        self.memory.add_interaction(user_id, interaction_type, data)
        
        # Set interaction cooldown to prevent spam
        self.interaction_cooldown = 5
        
        # Handle different interaction types
        if interaction_type == "greet":
            return await self.handle_greeting(user_id, data)
        elif interaction_type == "ask":
            return await self.handle_question(user_id, data)
        elif interaction_type == "give":
            return await self.handle_gift(user_id, data)
        elif interaction_type == "trade":
            return await self.handle_trade(user_id, data)
        else:
            return {"response": "The NPC looks confused."}
            
    async def handle_greeting(self, user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle a greeting interaction"""
        user_name = data.get("user_name", "Traveler")
        
        # Check if we've met this user before
        if self.memory.has_met_user(user_id):
            greeting = f"Hello again, {user_name}. Nice to see you."
        else:
            greeting = f"Hello there, {user_name}. I'm {self.attributes['name']}, a {self.attributes['occupation']}."
            
        self.memory.add_user_info(user_id, "name", user_name)
        
        return {
            "response": greeting,
            "npc_mood": self.attributes["mood"]
        }
        
    async def handle_question(self, user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle a question interaction"""
        question = data.get("question", "")
        
        # Generate response based on the question
        response = await self.dialogue_model.generate_response(question, self)
        
        return {
            "response": response,
            "npc_mood": self.attributes["mood"]
        }
        
    async def handle_gift(self, user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle receiving a gift"""
        item = data.get("item", "")
        
        # Check if this item matches interests or dislikes
        likes_item = any(interest in item.lower() for interest in self.attributes["interests"])
        dislikes_item = any(dislike in item.lower() for dislike in self.attributes["dislikes"])
        
        if likes_item:
            response = f"Thank you for the {item}! I really appreciate it. I love things like this."
            self.attributes["mood"] = "happy"
        elif dislikes_item:
            response = f"Oh... a {item}. Thanks, I guess. Not really my thing, but I'll take it."
            self.attributes["mood"] = "annoyed"
        else:
            response = f"Thanks for the {item}. That's thoughtful of you."
            self.attributes["mood"] = "neutral"
            
        return {
            "response": response,
            "npc_mood": self.attributes["mood"]
        }
        
    async def handle_trade(self, user_id: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle a trade request"""
        offered_item = data.get("offered_item", "")
        requested_item = data.get("requested_item", "")
        
        # Simple trade logic - could be expanded
        trade_accepted = random.random() < 0.7  # 70% chance to accept
        
        if trade_accepted:
            response = f"I'll trade my {requested_item} for your {offered_item}. Sounds fair to me."
            self.attributes["mood"] = "pleased"
        else:
            response = f"Sorry, I don't think I want to trade my {requested_item} for your {offered_item}."
            self.attributes["mood"] = "neutral"
            
        return {
            "response": response,
            "trade_accepted": trade_accepted,
            "npc_mood": self.attributes["mood"]
        }
        
    async def process_chat(self, message: str) -> str:
        """Process a chat message and generate a response"""
        return await self.dialogue_model.generate_response(message, self)
        
    def get_state(self) -> Dict[str, Any]:
        """Get the current state of the NPC for the client"""
        return {
            "id": self.id,
            "position": self.position.to_dict(),
            "rotation": self.rotation,
            "state": self.behavior_state,
            "name": self.attributes["name"],
            "occupation": self.attributes["occupation"],
            "mood": self.attributes["mood"],
            "appearance": self.attributes["appearance"]
        }

class DialogueModel:
    def __init__(self):
        # In a real implementation, this would load a language model
        # but for this example, we'll use templates and simple logic
        self.templates = {}
        
    async def initialize(self):
        """Load templates and prepare the model"""
        # Load response templates
        self.templates = {
            "greeting": [
                "Hello there! How can I help you today?",
                "Greetings, traveler. What brings you to these parts?",
                "Oh, hello! It's nice to meet you."
            ],
            "farewell": [
                "Goodbye! Safe travels!",
                "Until we meet again. Take care!",
                "Farewell, traveler. May your path be clear."
            ],
            "about_self": [
                "My name is {name}. I work as a {occupation} here.",
                "I'm {name}. I've been a {occupation} for quite some time now.",
                "People call me {name}. I'm known around here as a {occupation}."
            ],
            "about_location": [
                "This place? It's been my home for years. It has its charms.",
                "The area around here is quite interesting if you take the time to explore.",
                "There's a lot of history in these parts. Some good, some... well, not so good."
            ],
            "about_weather": [
                "The weather's been typical for this time of year.",
                "Can't complain about the weather today, to be honest.",
                "I've seen better days, weather-wise. But I've seen worse too."
            ],
            "unknown": [
                "Hmm, I'm not sure what to say about that.",
                "That's an interesting question. I'll have to think about it.",
                "I don't know much about that, to be honest."
            ]
        }
        
    async def generate_response(self, message: str, npc: NPC) -> str:
        """Generate a response based on the input message"""
        message = message.lower().strip()
        
        # Simple keyword matching for response templates
        response_type = "unknown"
        
        # Check for greetings
        if any(word in message for word in ["hello", "hi", "hey", "greetings"]):
            response_type = "greeting"
        # Check for farewells
        elif any(word in message for word in ["goodbye", "bye", "farewell", "see you"]):
            response_type = "farewell"
        # Check for questions about the NPC
        elif any(word in message for word in ["who are you", "your name", "about you", "yourself"]):
            response_type = "about_self"
        # Check for questions about location
        elif any(word in message for word in ["where", "place", "area", "location", "region"]):
            response_type = "about_location"
        # Check for questions about weather
        elif any(word in message for word in ["weather", "rain", "sunny", "temperature"]):
            response_type = "about_weather"
            
        # Get a random template from the appropriate category
        templates = self.templates.get(response_type, self.templates["unknown"])
        template = random.choice(templates)
        
        # Fill in the template with NPC information
        response = template.format(
            name=npc.attributes["name"],
            occupation=npc.attributes["occupation"]
        )
        
        # Add to NPC's memory
        npc.memory.add_dialogue(message, response)
        
        return response

class BehaviorModel:
    def __init__(self):
        self.behaviors = {}
        
    async def initialize(self):
        """Initialize behavior patterns"""
        self.behaviors = {
            "idle": {
                "weight": 5,
                "actions": [
                    {"type": "idle"},
                    {"type": "emote", "emote": "thinking"},
                    {"type": "emote", "emote": "looking_around"}
                ]
            },
            "walk": {
                "weight": 3,
                "actions": [
                    {"type": "walk"}
                ]
            },
            "work": {
                "weight": 2,
                "actions": [
                    {"type": "emote", "emote": "working"},
                    {"type": "walk"},
                    {"type": "emote", "emote": "busy"}
                ]
            }
        }
        
    async def get_action(self, npc: NPC) -> Dict[str, Any]:
        """Get the next action for an NPC based on its state"""
        # If NPC is in interaction cooldown, prefer idle behaviors
        if npc.interaction_cooldown > 0:
            return random.choice(self.behaviors["idle"]["actions"])
            
        # Select a behavior type based on weights
        behavior_types = []
        weights = []
        
        for behavior_type, data in self.behaviors.items():
            behavior_types.append(behavior_type)
            weights.append(data["weight"])
            
        behavior_type = random.choices(behavior_types, weights=weights, k=1)[0]
        
        # Return a random action from the selected behavior
        return random.choice(self.behaviors[behavior_type]["actions"])

class NPCMemory:
    def __init__(self):
        self.identity = {}
        self.known_users = {}
        self.interactions = []
        self.dialogue_history = []
        self.knowledge = {}
        
    def add_identity(self, identity_data: Dict[str, Any]):
        """Add identity information to memory"""
        self.identity = identity_data
        
    def add_user_info(self, user_id: str, key: str, value: Any):
        """Add or update information about a user"""
        if user_id not in self.known_users:
            self.known_users[user_id] = {}
            
        self.known_users[user_id][key] = value
        
    def add_interaction(self, user_id: str, interaction_type: str, data: Dict[str, Any]):
        """Record an interaction with a user"""
        self.interactions.append({
            "user_id": user_id,
            "timestamp": self.get_timestamp(),
            "type": interaction_type,
            "data": data
        })
        
        # Trim history if it gets too long
        if len(self.interactions) > 50:
            self.interactions = self.interactions[-50:]
            
    def add_dialogue(self, user_message: str, npc_response: str):
        """Record a dialogue exchange"""
        self.dialogue_history.append({
            "timestamp": self.get_timestamp(),
            "user_message": user_message,
            "npc_response": npc_response
        })
        
        # Trim history if it gets too long
        if len(self.dialogue_history) > 20:
            self.dialogue_history = self.dialogue_history[-20:]
            
    def has_met_user(self, user_id: str) -> bool:
        """Check if the NPC has met this user before"""
        return user_id in self.known_users
        
    def get_user_info(self, user_id: str) -> Dict[str, Any]:
        """Get known information about a user"""
        return self.known_users.get(user_id, {})
        
    def get_recent_dialogues(self, limit: int = 5) -> List[Dict[str, Any]]:
        """Get the most recent dialogue exchanges"""
        return self.dialogue_history[-limit:]
        
    def get_timestamp(self) -> int:
        """Get current timestamp"""
        import time
        return int(time.time()) 