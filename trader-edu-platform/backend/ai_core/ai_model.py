import tensorflow as tf
import numpy as np
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import os
from utils.config import Config

class AICore:
    def __init__(self):
        self._init_learning_model()
        self._init_language_model()
        
    def _init_learning_model(self):
        """Initialize TensorFlow learning model for user progress analysis"""
        self.learning_model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(1, activation='sigmoid')
        ])
        
        # Compile the model
        self.learning_model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        # Load pre-trained weights if available
        model_path = os.path.join(Config.AI_MODEL_PATH, "learning_model")
        if os.path.exists(model_path):
            try:
                self.learning_model.load_weights(model_path)
                print("Loaded pre-trained learning model weights")
            except Exception as e:
                print(f"Error loading model weights: {e}")
    
    def _init_language_model(self):
        """Initialize the language model for content generation"""
        try:
            self.tokenizer = GPT2Tokenizer.from_pretrained('gpt2-medium')
            self.language_model = GPT2LMHeadModel.from_pretrained('gpt2-medium')
            print("Loaded language model")
        except Exception as e:
            print(f"Error loading language model: {e}")
            self.tokenizer = None
            self.language_model = None
            
    async def generate_content(self, topic, user_level):
        """Generate personalized educational content based on topic and user level"""
        if not self.language_model or not self.tokenizer:
            return {"error": "Language model not available"}
        
        # Create prompt based on topic and user level
        prompt = f"Generate educational content about {topic} in trading for a {user_level} level trader:"
        
        # Tokenize the prompt
        inputs = self.tokenizer.encode(prompt, return_tensors="pt")
        
        # Generate content
        output_sequences = self.language_model.generate(
            inputs,
            max_length=500,
            temperature=0.8,
            top_k=50,
            top_p=0.9,
            repetition_penalty=1.2,
            do_sample=True,
            num_return_sequences=1
        )
        
        # Decode the output
        generated_text = self.tokenizer.decode(output_sequences[0], skip_special_tokens=True)
        
        # Format the output
        content = self._format_generated_content(generated_text, topic, user_level)
        
        return content
    
    def _format_generated_content(self, text, topic, user_level):
        """Format generated text into structured lesson content"""
        # Basic formatting for demonstration purposes
        # In a real implementation, this would use more sophisticated NLP
        
        # Split into sections
        parts = text.split("\n\n")
        theory = parts[0] if len(parts) > 0 else ""
        exercises = parts[1] if len(parts) > 1 else ""
        assessment = parts[2] if len(parts) > 2 else ""
        
        return {
            "topic": topic,
            "level": user_level,
            "theory": theory,
            "exercises": exercises,
            "assessment": assessment
        }
        
    async def analyze_user_progress(self, user_data):
        """Analyze user progress data to provide personalized recommendations"""
        # Convert user data to numpy array for model input
        features = np.array([
            user_data.get("completion_rate", 0),
            user_data.get("correct_answers", 0),
            user_data.get("time_spent", 0),
            user_data.get("difficulty_level", 1)
        ]).reshape(1, -1)
        
        # Predict next steps
        prediction = self.learning_model.predict(features)
        
        # Generate recommendations based on prediction
        recommendations = self._generate_recommendations(prediction, user_data)
        
        return recommendations
    
    def _generate_recommendations(self, prediction, user_data):
        """Generate personalized recommendations based on model prediction"""
        score = float(prediction[0][0])
        
        if score < 0.3:
            recommendation = "Consider reviewing the basics before moving forward."
            suggested_courses = ["Trading Fundamentals", "Market Basics"]
        elif score < 0.7:
            recommendation = "You're making good progress. Focus on these intermediate topics."
            suggested_courses = ["Technical Analysis", "Risk Management"]
        else:
            recommendation = "You're doing well! Try these advanced topics to further your knowledge."
            suggested_courses = ["Advanced Strategies", "Algorithmic Trading"]
            
        return {
            "score": score,
            "recommendation": recommendation,
            "suggested_courses": suggested_courses
        }
        
    async def analyze_trading_strategy(self, strategy_data):
        """Analyze a trading strategy and provide feedback"""
        # Example implementation
        # In a real system, this would use more sophisticated analysis
        
        risk_score = self._calculate_risk_score(strategy_data)
        success_probability = self._calculate_success_probability(strategy_data)
        
        return {
            "risk_level": risk_score,
            "success_probability": success_probability,
            "recommendations": self._get_strategy_recommendations(risk_score, success_probability)
        }
    
    def _calculate_risk_score(self, strategy_data):
        """Calculate risk score for a trading strategy"""
        # Example calculation
        volatility = strategy_data.get("volatility", 0.5)
        leverage = strategy_data.get("leverage", 1.0)
        diversification = strategy_data.get("diversification", 0.5)
        
        risk_score = (volatility * 0.4) + (leverage * 0.4) - (diversification * 0.2)
        return min(max(risk_score, 0), 1)  # Normalize between 0 and 1
    
    def _calculate_success_probability(self, strategy_data):
        """Calculate probability of success for a trading strategy"""
        # Example calculation
        historical_success = strategy_data.get("historical_success", 0.5)
        market_condition_match = strategy_data.get("market_condition_match", 0.5)
        
        success_probability = (historical_success * 0.6) + (market_condition_match * 0.4)
        return min(max(success_probability, 0), 1)  # Normalize between 0 and 1
    
    def _get_strategy_recommendations(self, risk_score, success_probability):
        """Generate recommendations based on risk and success probability"""
        recommendations = []
        
        if risk_score > 0.7:
            recommendations.append("Consider reducing leverage to lower risk exposure.")
        
        if success_probability < 0.4:
            recommendations.append("This strategy may not perform well in current market conditions.")
        
        if risk_score > 0.5 and success_probability < 0.5:
            recommendations.append("High risk with low probability of success. Consider alternative strategies.")
        
        if not recommendations:
            if success_probability > 0.7:
                recommendations.append("Strategy looks promising. Consider a small initial allocation.")
            else:
                recommendations.append("Strategy has moderate potential. Monitor performance closely if implemented.")
        
        return recommendations 