from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    progress_level = Column(Integer, default=1)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    progress = relationship("UserProgress", back_populates="user")
    
class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    difficulty_level = Column(Integer, default=1)
    content_type = Column(String(50))
    ai_generated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    
    # Relationships
    progress = relationship("UserProgress", back_populates="course")
    lessons = relationship("Lesson", back_populates="course")

class Lesson(Base):
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String(255), nullable=False)
    content = Column(Text)
    order = Column(Integer)
    
    # Relationships
    course = relationship("Course", back_populates="lessons")
    
class UserProgress(Base):
    __tablename__ = "user_progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    completion_percentage = Column(Float, default=0.0)
    last_activity = Column(DateTime, default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="progress")
    course = relationship("Course", back_populates="progress")
    
class TradeSimulation(Base):
    __tablename__ = "trade_simulations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    strategy_name = Column(String(255))
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    initial_capital = Column(Float)
    final_capital = Column(Float)
    profit_loss = Column(Float)
    created_at = Column(DateTime, default=func.now())
    
class AIRecommendation(Base):
    __tablename__ = "ai_recommendations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    recommendation_type = Column(String(50))
    content = Column(Text)
    created_at = Column(DateTime, default=func.now()) 