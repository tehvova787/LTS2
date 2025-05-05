from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt

from models.database import User, UserProgress
from utils.config import Config
from ai_core.ai_model import AICore

# Initialize router
router = APIRouter()

# Initialize password context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Initialize AI core
ai_core = AICore()

# Pydantic models for request/response
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    progress_level: int
    created_at: datetime
    
    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserProgressUpdate(BaseModel):
    course_id: int
    completion_percentage: float

class UserProgressResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    completion_percentage: float
    last_activity: datetime
    
    class Config:
        orm_mode = True

class AIRecommendationResponse(BaseModel):
    score: float
    recommendation: str
    suggested_courses: List[str]

# Helper functions
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, Config.SECRET_KEY, algorithm=Config.ALGORITHM)
    return encoded_jwt

def get_current_user(db: Session, token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = get_user_by_id(db, user_id)
    if user is None:
        raise credentials_exception
    return user

# Routes
@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate, db: Session = Depends(lambda: Session())):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return db_user

@router.post("/login", response_model=Token)
async def login(user_login: UserLogin, db: Session = Depends(lambda: Session())):
    user = get_user_by_email(db, user_login.email)
    if not user or not verify_password(user_login.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, db: Session = Depends(lambda: Session())):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return user

@router.post("/{user_id}/progress", response_model=UserProgressResponse)
async def update_progress(
    user_id: int, 
    progress: UserProgressUpdate, 
    db: Session = Depends(lambda: Session())
):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Check if progress record exists
    db_progress = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.course_id == progress.course_id
    ).first()
    
    if db_progress:
        # Update existing progress
        db_progress.completion_percentage = progress.completion_percentage
        db_progress.last_activity = datetime.utcnow()
    else:
        # Create new progress record
        db_progress = UserProgress(
            user_id=user_id,
            course_id=progress.course_id,
            completion_percentage=progress.completion_percentage
        )
        db.add(db_progress)
    
    db.commit()
    db.refresh(db_progress)
    
    return db_progress

@router.get("/{user_id}/recommendations", response_model=AIRecommendationResponse)
async def get_recommendations(user_id: int, db: Session = Depends(lambda: Session())):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Get user progress data
    progress_records = db.query(UserProgress).filter(UserProgress.user_id == user_id).all()
    
    # Calculate average completion rate
    if progress_records:
        completion_rate = sum(p.completion_percentage for p in progress_records) / len(progress_records)
    else:
        completion_rate = 0
    
    # Create user data for AI analysis
    user_data = {
        "completion_rate": completion_rate,
        "correct_answers": 0.7,  # Example value
        "time_spent": 120,  # Example value (minutes)
        "difficulty_level": user.progress_level
    }
    
    # Get AI recommendations
    recommendations = await ai_core.analyze_user_progress(user_data)
    
    return recommendations 