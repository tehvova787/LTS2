import { Metadata } from 'next';
import { Suspense } from 'react';
import CourseContent from './CourseContent';

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

async function getCourseData(id: string): Promise<Course> {
  return {
    id: parseInt(id),
    title: 'Technical Analysis Fundamentals',
    description: 'Learn to read price charts and identify patterns for better trading decisions',
    level: 'Beginner',
    modules: 8,
    completion: 75,
    image: '📊',
    currentModule: 6,
    currentLesson: 3,
    lessons: [
      { id: 1, title: 'Introduction to Chart Types', completed: true, type: 'Video' },
      { id: 2, title: 'Candlestick Patterns Basics', completed: true, type: 'Interactive' },
      { id: 3, title: 'Support and Resistance Levels', completed: false, type: 'Video' },
      { id: 4, title: 'Trend Lines and Channels', completed: false, type: 'Interactive' },
      { id: 5, title: 'Moving Averages', completed: false, type: 'Video' },
    ]
  };
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const course = await getCourseData(params.id);
  return {
    title: course.title,
    description: course.description,
  };
}

interface PageProps {
  params: { id: string };
}

export default async function Page({ params }: PageProps) {
  const course = await getCourseData(params.id);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CourseContent course={course} />
    </Suspense>
  );
} 