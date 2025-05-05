import asyncio
import uuid
import json
import os
import numpy as np
import logging
from typing import Dict, Any, List, Optional, Tuple
from pathlib import Path

# Set up logging
logger = logging.getLogger("ml_quest_system")

class MLQuestSystem:
    """
    Machine Learning Quest System for the Metaverse
    
    This system allows owners and users to create and train AI models through quests.
    Quests serve as a gamified way to gather training data and improve AI capabilities.
    """
    
    def __init__(self):
        self.quests = {}
        self.user_progress = {}
        self.ml_models = {}
        self.training_data = {}
        self.model_storage_path = Path("./data/ml_models")
        self.data_storage_path = Path("./data/training_data")
        
    async def initialize(self):
        """Initialize the ML Quest System"""
        logger.info("Initializing ML Quest System...")
        
        # Create storage directories if they don't exist
        os.makedirs(self.model_storage_path, exist_ok=True)
        os.makedirs(self.data_storage_path, exist_ok=True)
        
        # Load existing models and training data
        await self.load_models()
        await self.load_training_data()
        
        # Create default quests
        await self.create_default_quests()
        
        logger.info("ML Quest System initialized successfully")
        
    async def load_models(self):
        """Load existing ML models from storage"""
        try:
            model_files = list(self.model_storage_path.glob("*.json"))
            for model_file in model_files:
                model_id = model_file.stem
                with open(model_file, 'r') as f:
                    model_data = json.load(f)
                    
                self.ml_models[model_id] = MLModel(
                    model_id=model_id,
                    name=model_data.get("name", "Unnamed Model"),
                    model_type=model_data.get("model_type", "classification"),
                    metadata=model_data.get("metadata", {}),
                    features=model_data.get("features", []),
                    is_trained=model_data.get("is_trained", False)
                )
                
                # If the model is trained, load the weights
                if self.ml_models[model_id].is_trained:
                    await self.ml_models[model_id].load_weights(self.model_storage_path)
                    
            logger.info(f"Loaded {len(self.ml_models)} ML models")
        except Exception as e:
            logger.error(f"Error loading ML models: {e}")
    
    async def load_training_data(self):
        """Load existing training data from storage"""
        try:
            data_files = list(self.data_storage_path.glob("*.json"))
            for data_file in data_files:
                model_id = data_file.stem
                with open(data_file, 'r') as f:
                    self.training_data[model_id] = json.load(f)
                    
            logger.info(f"Loaded training data for {len(self.training_data)} models")
        except Exception as e:
            logger.error(f"Error loading training data: {e}")
    
    async def create_default_quests(self):
        """Create default quests for the system"""
        # Create a basic NPC behavior classification quest
        if not any(q for q in self.quests.values() if q.quest_type == "npc_behavior_training"):
            await self.create_quest(
                name="Teaching NPCs to Respond",
                description="Help teach our NPCs how to respond to different situations. Your feedback will improve their behavior!",
                quest_type="npc_behavior_training",
                difficulty=1,
                rewards={"experience": 100, "tokens": 50},
                steps=[
                    {
                        "step_id": "evaluate_response",
                        "description": "Evaluate how well the NPC responded to this situation",
                        "task_type": "rating",
                        "data": {
                            "scenario": "A player asks the NPC for directions to the nearest shop",
                            "npc_response": "I think there's a shop somewhere around here, but I'm not sure where exactly."
                        }
                    },
                    {
                        "step_id": "provide_better_response",
                        "description": "If you think the response could be improved, provide a better one",
                        "task_type": "text_input",
                        "data": {}
                    }
                ],
                model_id="npc_behavior_model"
            )
            
        # Create an object recognition quest
        if not any(q for q in self.quests.values() if q.quest_type == "object_recognition"):
            await self.create_quest(
                name="Virtual Object Recognition",
                description="Help our AI learn to recognize different objects in the metaverse. This will improve interactions with virtual items!",
                quest_type="object_recognition",
                difficulty=2,
                rewards={"experience": 150, "tokens": 75},
                steps=[
                    {
                        "step_id": "classify_object",
                        "description": "What type of object is shown in this scene?",
                        "task_type": "multiple_choice",
                        "data": {
                            "image_id": "object_001",
                            "options": ["Weapon", "Tool", "Furniture", "Decoration", "Other"]
                        }
                    },
                    {
                        "step_id": "describe_features",
                        "description": "Describe the key features of this object",
                        "task_type": "text_input",
                        "data": {}
                    }
                ],
                model_id="object_recognition_model"
            )
            
    async def create_quest(self, name: str, description: str, quest_type: str, 
                           difficulty: int, rewards: Dict[str, Any], 
                           steps: List[Dict[str, Any]], model_id: str) -> str:
        """Create a new quest for training an ML model"""
        quest_id = f"quest_{uuid.uuid4()}"
        
        # Create or get the ML model for this quest
        if model_id not in self.ml_models:
            self.ml_models[model_id] = MLModel(
                model_id=model_id,
                name=f"Model for {name}",
                model_type="classification" if quest_type in ["npc_behavior_training", "object_recognition"] else "generation",
                metadata={"quest_type": quest_type},
                features=[],
                is_trained=False
            )
            
            # Initialize empty training data
            self.training_data[model_id] = []
            
        # Create the quest
        self.quests[quest_id] = Quest(
            quest_id=quest_id,
            name=name,
            description=description,
            quest_type=quest_type,
            difficulty=difficulty,
            rewards=rewards,
            steps=steps,
            model_id=model_id,
            created_by="system"  # Default creator is system
        )
        
        logger.info(f"Created new quest: {name} (ID: {quest_id})")
        return quest_id
    
    async def create_user_quest(self, user_id: str, name: str, description: str, 
                                quest_type: str, difficulty: int, rewards: Dict[str, Any],
                                steps: List[Dict[str, Any]], model_id: Optional[str] = None) -> str:
        """Allow users to create their own quests for AI training"""
        # If no model_id is provided, create a new one
        if not model_id:
            model_id = f"user_model_{uuid.uuid4()}"
            
        quest_id = await self.create_quest(
            name=name,
            description=description,
            quest_type=quest_type,
            difficulty=difficulty,
            rewards=rewards,
            steps=steps,
            model_id=model_id
        )
        
        # Mark this quest as created by a user
        self.quests[quest_id].created_by = user_id
        
        return quest_id
    
    async def get_quest(self, quest_id: str) -> Optional[Dict[str, Any]]:
        """Get quest information by ID"""
        if quest_id in self.quests:
            return self.quests[quest_id].get_state()
        return None
    
    async def get_available_quests(self, user_id: str) -> List[Dict[str, Any]]:
        """Get quests available to a user"""
        available_quests = []
        
        for quest_id, quest in self.quests.items():
            # Check if user has already completed this quest
            user_completed = self.user_progress.get(user_id, {}).get(quest_id, {}).get("completed", False)
            
            if not user_completed:
                available_quests.append(quest.get_state())
                
        return available_quests
    
    async def start_quest(self, user_id: str, quest_id: str) -> Dict[str, Any]:
        """Start a quest for a user"""
        if quest_id not in self.quests:
            return {"error": "Quest not found"}
            
        # Initialize user progress for this quest if not already done
        if user_id not in self.user_progress:
            self.user_progress[user_id] = {}
            
        if quest_id not in self.user_progress[user_id]:
            self.user_progress[user_id][quest_id] = {
                "current_step": 0,
                "completed": False,
                "responses": [],
                "started_at": self._get_timestamp()
            }
            
        # Get the current step information
        quest = self.quests[quest_id]
        current_step_idx = self.user_progress[user_id][quest_id]["current_step"]
        
        # Make sure the index is valid
        if current_step_idx >= len(quest.steps):
            return {"error": "Quest has no more steps"}
            
        current_step = quest.steps[current_step_idx]
        
        return {
            "quest_id": quest_id,
            "quest_name": quest.name,
            "step": current_step_idx + 1,  # 1-indexed for display
            "total_steps": len(quest.steps),
            "step_data": current_step
        }
    
    async def submit_quest_step(self, user_id: str, quest_id: str, step_response: Dict[str, Any]) -> Dict[str, Any]:
        """Submit a response for a quest step"""
        if quest_id not in self.quests:
            return {"error": "Quest not found"}
            
        if user_id not in self.user_progress or quest_id not in self.user_progress[user_id]:
            return {"error": "Quest not started"}
            
        user_quest = self.user_progress[user_id][quest_id]
        quest = self.quests[quest_id]
        current_step_idx = user_quest["current_step"]
        
        # Make sure the index is valid
        if current_step_idx >= len(quest.steps):
            return {"error": "Quest has no more steps"}
            
        current_step = quest.steps[current_step_idx]
        
        # Record the response
        user_quest["responses"].append({
            "step_id": current_step["step_id"],
            "response": step_response,
            "timestamp": self._get_timestamp()
        })
        
        # Add to training data
        model_id = quest.model_id
        if model_id in self.training_data:
            self.training_data[model_id].append({
                "step_id": current_step["step_id"],
                "task_type": current_step["task_type"],
                "data": current_step["data"],
                "response": step_response,
                "user_id": user_id,
                "timestamp": self._get_timestamp()
            })
            
            # Save training data to disk
            await self._save_training_data(model_id)
            
        # Move to the next step
        user_quest["current_step"] += 1
        
        # Check if quest is completed
        if user_quest["current_step"] >= len(quest.steps):
            user_quest["completed"] = True
            user_quest["completed_at"] = self._get_timestamp()
            
            # Give rewards to user
            # This would interact with the user system
            
            # Potentially train or update model if enough data
            if model_id in self.ml_models and len(self.training_data[model_id]) > 10:
                await self.train_model(model_id)
                
            return {
                "quest_completed": True,
                "rewards": quest.rewards
            }
        else:
            # Return the next step
            return await self.start_quest(user_id, quest_id)
    
    async def train_model(self, model_id: str) -> Dict[str, Any]:
        """Train an ML model with collected data"""
        if model_id not in self.ml_models:
            return {"error": "Model not found"}
            
        if model_id not in self.training_data or not self.training_data[model_id]:
            return {"error": "No training data available"}
            
        model = self.ml_models[model_id]
        
        try:
            # Prepare data for training
            logger.info(f"Training model {model_id} with {len(self.training_data[model_id])} data points")
            
            # This is where the actual training would happen
            # For now, we'll simulate training
            training_result = await model.train(self.training_data[model_id])
            
            # Save the trained model
            await model.save(self.model_storage_path)
            
            return {
                "success": True,
                "model_id": model_id,
                "training_metrics": training_result
            }
        except Exception as e:
            logger.error(f"Error training model {model_id}: {e}")
            return {
                "error": f"Training failed: {str(e)}"
            }
    
    async def _save_training_data(self, model_id: str):
        """Save training data to disk"""
        if model_id in self.training_data:
            file_path = self.data_storage_path / f"{model_id}.json"
            with open(file_path, 'w') as f:
                json.dump(self.training_data[model_id], f)
    
    def _get_timestamp(self) -> int:
        """Get current timestamp"""
        import time
        return int(time.time())
    
    async def get_model_info(self, model_id: str) -> Optional[Dict[str, Any]]:
        """Get information about an ML model"""
        if model_id in self.ml_models:
            return self.ml_models[model_id].get_info()
        return None
    
    async def predict(self, model_id: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Use a trained model to make predictions"""
        if model_id not in self.ml_models:
            return {"error": "Model not found"}
            
        model = self.ml_models[model_id]
        
        if not model.is_trained:
            return {"error": "Model is not trained yet"}
            
        try:
            prediction = await model.predict(input_data)
            return {
                "success": True,
                "prediction": prediction
            }
        except Exception as e:
            logger.error(f"Error making prediction with model {model_id}: {e}")
            return {
                "error": f"Prediction failed: {str(e)}"
            }


class MLModel:
    """Machine Learning Model that can be trained through quests"""
    
    def __init__(self, model_id: str, name: str, model_type: str, 
                 metadata: Dict[str, Any], features: List[str], is_trained: bool):
        self.model_id = model_id
        self.name = name
        self.model_type = model_type  # "classification", "regression", "generation", etc.
        self.metadata = metadata
        self.features = features
        self.is_trained = is_trained
        self.model = None  # The actual ML model would be stored here
        
    async def train(self, training_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Train the model with provided data"""
        # In a real implementation, this would use a proper ML framework
        # For now, we'll simulate training
        
        try:
            # Extract relevant features based on model type
            if self.model_type == "classification":
                # Simple simulation of training metrics
                accuracy = min(0.5 + (len(training_data) * 0.01), 0.95)
                
                # Mark as trained
                self.is_trained = True
                
                return {
                    "accuracy": accuracy,
                    "samples": len(training_data),
                    "training_time": 2.5
                }
            elif self.model_type == "generation":
                # Simulation for generative models
                perplexity = max(50 - (len(training_data) * 0.5), 10) 
                
                # Mark as trained
                self.is_trained = True
                
                return {
                    "perplexity": perplexity,
                    "samples": len(training_data),
                    "training_time": 5.0
                }
            else:
                raise ValueError(f"Unsupported model type: {self.model_type}")
                
        except Exception as e:
            logger.error(f"Error training model {self.model_id}: {e}")
            raise
    
    async def predict(self, input_data: Dict[str, Any]) -> Any:
        """Make predictions with the trained model"""
        if not self.is_trained:
            raise ValueError("Model is not trained yet")
            
        # Simulate prediction based on model type
        if self.model_type == "classification":
            # Return a simulated classification result
            classes = ["class_a", "class_b", "class_c", "class_d"]
            probabilities = np.random.dirichlet(np.ones(len(classes)))
            
            return {
                "predicted_class": classes[np.argmax(probabilities)],
                "probabilities": {cls: float(prob) for cls, prob in zip(classes, probabilities)}
            }
        elif self.model_type == "generation":
            # Return a simulated text generation
            templates = [
                "This is a generated response based on the input pattern.",
                "The system has analyzed your input and created this response.",
                "Based on the training data, this response was generated."
            ]
            return {
                "generated_text": random.choice(templates)
            }
        else:
            raise ValueError(f"Unsupported model type for prediction: {self.model_type}")
    
    async def save(self, model_path: Path):
        """Save the model to disk"""
        file_path = model_path / f"{self.model_id}.json"
        
        # Save model metadata
        model_data = {
            "name": self.name,
            "model_type": self.model_type,
            "metadata": self.metadata,
            "features": self.features,
            "is_trained": self.is_trained,
            "last_updated": self._get_timestamp()
        }
        
        with open(file_path, 'w') as f:
            json.dump(model_data, f)
            
        # In a real implementation, save the actual model weights to a separate file
        # For example: self.model.save_weights(f"{model_path}/{self.model_id}_weights.h5")
    
    async def load_weights(self, model_path: Path):
        """Load model weights from disk"""
        # In a real implementation, this would load the actual model weights
        # For example: self.model.load_weights(f"{model_path}/{self.model_id}_weights.h5")
        pass
    
    def get_info(self) -> Dict[str, Any]:
        """Get information about the model"""
        return {
            "model_id": self.model_id,
            "name": self.name,
            "model_type": self.model_type,
            "metadata": self.metadata,
            "features": self.features,
            "is_trained": self.is_trained
        }
        
    def _get_timestamp(self) -> int:
        """Get current timestamp"""
        import time
        return int(time.time())


class Quest:
    """Quest for training AI models in the metaverse"""
    
    def __init__(self, quest_id: str, name: str, description: str, 
                 quest_type: str, difficulty: int, rewards: Dict[str, Any],
                 steps: List[Dict[str, Any]], model_id: str, created_by: str = "system"):
        self.quest_id = quest_id
        self.name = name
        self.description = description
        self.quest_type = quest_type
        self.difficulty = difficulty
        self.rewards = rewards
        self.steps = steps
        self.model_id = model_id
        self.created_by = created_by
        self.created_at = self._get_timestamp()
        
    def get_state(self) -> Dict[str, Any]:
        """Get the current state of the quest"""
        return {
            "quest_id": self.quest_id,
            "name": self.name,
            "description": self.description,
            "quest_type": self.quest_type,
            "difficulty": self.difficulty,
            "rewards": self.rewards,
            "step_count": len(self.steps),
            "model_id": self.model_id,
            "created_by": self.created_by,
            "created_at": self.created_at
        }
        
    def _get_timestamp(self) -> int:
        """Get current timestamp"""
        import time
        return int(time.time()) 