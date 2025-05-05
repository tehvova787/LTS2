from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

from models.database import Course, Lesson
from ai_core.ai_model import AICore

# Initialize router
router = APIRouter()

# Initialize AI core
ai_core = AICore()

# Pydantic models for request/response
class CourseCreate(BaseModel):
    title: str
    description: str
    difficulty_level: int
    content_type: str
    ai_generated: bool = False

class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    difficulty_level: int
    content_type: str
    ai_generated: bool
    created_at: datetime
    
    class Config:
        orm_mode = True

class LessonCreate(BaseModel):
    title: str
    content: str
    order: int

class LessonResponse(BaseModel):
    id: int
    course_id: int
    title: str
    content: str
    order: int
    
    class Config:
        orm_mode = True

class AIGeneratedContentRequest(BaseModel):
    topic: str
    user_level: str

# Routes
@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(course: CourseCreate, db: Session = Depends(lambda: Session())):
    db_course = Course(
        title=course.title,
        description=course.description,
        difficulty_level=course.difficulty_level,
        content_type=course.content_type,
        ai_generated=course.ai_generated
    )
    
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    
    return db_course

@router.get("/", response_model=List[CourseResponse])
async def get_courses(
    skip: int = 0, 
    limit: int = 100, 
    difficulty: Optional[int] = None,
    db: Session = Depends(lambda: Session())
):
    query = db.query(Course)
    
    # Apply filters if provided
    if difficulty is not None:
        query = query.filter(Course.difficulty_level == difficulty)
    
    courses = query.offset(skip).limit(limit).all()
    return courses

@router.get("/{course_id}", response_model=CourseResponse)
async def get_course(course_id: int, db: Session = Depends(lambda: Session())):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course

@router.post("/{course_id}/lessons", response_model=LessonResponse)
async def create_lesson(
    course_id: int, 
    lesson: LessonCreate, 
    db: Session = Depends(lambda: Session())
):
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    db_lesson = Lesson(
        course_id=course_id,
        title=lesson.title,
        content=lesson.content,
        order=lesson.order
    )
    
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    
    return db_lesson

@router.get("/{course_id}/lessons", response_model=List[LessonResponse])
async def get_lessons(course_id: int, db: Session = Depends(lambda: Session())):
    # Check if course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    
    lessons = db.query(Lesson).filter(Lesson.course_id == course_id).order_by(Lesson.order).all()
    return lessons

@router.get("/{course_id}/lessons/{lesson_id}", response_model=LessonResponse)
async def get_lesson(course_id: int, lesson_id: int, db: Session = Depends(lambda: Session())):
    lesson = db.query(Lesson).filter(
        Lesson.course_id == course_id,
        Lesson.id == lesson_id
    ).first()
    
    if not lesson:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Lesson not found"
        )
    
    return lesson

@router.post("/generate-content")
async def generate_content(request: AIGeneratedContentRequest):
    """Generate AI content for a lesson based on topic and user level"""
    # Use AI core to generate content
    content = await ai_core.generate_content(
        topic=request.topic,
        user_level=request.user_level
    )
    
    return content 