'use client';

import React from 'react';

interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  modules: number;
  completion: number;
  image: string;
  currentModule: number;
  currentLesson: number;
  lessons: Array<{
    id: number;
    title: string;
    completed: boolean;
    type: string;
  }>;
}

interface CourseContentProps {
  course: Course;
}

export default function CourseContent({ course }: CourseContentProps) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">{course.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${course.completion}%` }}
            ></div>
          </div>
          <p>Module {course.currentModule} of {course.modules}</p>
          <p>Lesson {course.currentLesson}</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <p className="mb-2">Level: {course.level}</p>
          <p className="mb-2">Description: {course.description}</p>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        <div className="space-y-4">
          {course.lessons.map((lesson) => (
            <div 
              key={lesson.id}
              className={`p-4 rounded-lg ${lesson.completed ? 'bg-green-500/20' : 'bg-white/10'}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{lesson.title}</h3>
                  <p className="text-sm text-gray-400">{lesson.type}</p>
                </div>
                {lesson.completed ? (
                  <span className="text-green-500">✓ Completed</span>
                ) : (
                  <span className="text-gray-400">Not started</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 