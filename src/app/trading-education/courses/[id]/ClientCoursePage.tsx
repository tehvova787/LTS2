'use client'
import React from 'react';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

type Lesson = {
  id: number;
  title: string;
  completed: boolean;
  type: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  level: string;
  modules: number;
  completion: number;
  image: string;
  currentModule: number;
  currentLesson: number;
  lessons: Lesson[];
};

export default function ClientCoursePage({ course }: { course: Course }) {
  return (
    <AnimatedWrapper>
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Course Header */}
        <div className="mb-12">
          <Link href="/trading-education/courses">
            <div className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span>Back to Courses</span>
            </div>
          </Link>
          <div>
            <div className="flex items-center mb-2">
              <div className="text-4xl mr-4">{course.image}</div>
              <h1 className="text-3xl md:text-4xl font-bold">{course.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-4 mb-6">
              <span className={`text-xs px-2 py-1 rounded ${
                course.level === 'Beginner' ? 'bg-green-900 text-green-300' :
                course.level === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                'bg-red-900 text-red-300'
              }`}>
                {course.level}
              </span>
              <span className="text-gray-400 text-sm">
                {course.modules} Modules
              </span>
              <span className="text-gray-400 text-sm">
                {course.completion}% Complete
              </span>
            </div>
            <p className="text-gray-300 text-lg max-w-3xl">
              {course.description}
            </p>
            <div className="mt-6">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-sm text-gray-400">Overall progress</span>
                <span className="text-sm text-gray-400">{course.completion}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-blue-600 h-2 rounded-full progress-width-${course.completion}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Course Content</h2>
              <div className="mb-6">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center text-xs mr-2">
                    {course.currentModule}
                  </span>
                  Current Module: Chart Patterns
                </h3>
                <div className="ml-8 space-y-3">
                  {course.lessons.map((lesson: Lesson, index: number) => (
                    <Link 
                      href={`/trading-education/courses/${course.id}/lessons/${lesson.id}`} 
                      key={lesson.id}
                    >
                      <div 
                        className={`
                          flex items-center justify-between p-3 rounded 
                          ${index === 2 ? 'bg-blue-900 bg-opacity-50 border border-blue-700' : 'hover:bg-gray-700'}
                          cursor-pointer
                        `}
                      >
                        <div className="flex items-center">
                          {lesson.completed ? (
                            <span className="h-5 w-5 rounded-full bg-green-600 flex items-center justify-center text-xs mr-3">
                              ✓
                            </span>
                          ) : (
                            <span className="h-5 w-5 rounded-full border border-gray-600 flex items-center justify-center text-xs mr-3">
                              {index + 1}
                            </span>
                          )}
                          <span className={`${index === 2 ? 'text-white font-medium' : 'text-gray-300'}`}>{lesson.title}</span>
                        </div>
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded">{lesson.type}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-medium mb-2 flex items-center text-gray-400">
                  <span className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">7</span>
                  Next: Advanced Chart Patterns
                </h3>
              </div>
              <div>
                <h3 className="font-medium mb-2 flex items-center text-gray-400">
                  <span className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs mr-2">8</span>
                  Final: Putting It All Together
                </h3>
              </div>
            </div>
          </div>
          {/* Right Column - Current Lesson */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold">Support and Resistance Levels</h2>
                <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">Lesson 3 of 5</span>
              </div>
              {/* Video Placeholder */}
              <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 opacity-80" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded px-3 py-1 text-sm">12:45 / 18:30</div>
                  <div className="flex gap-2">
                    <button 
                      className="bg-black bg-opacity-50 backdrop-blur-sm rounded p-2"
                      aria-label="Toggle video visibility"
                      title="Toggle video visibility"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      className="bg-black bg-opacity-50 backdrop-blur-sm rounded p-2"
                      aria-label="Toggle audio"
                      title="Toggle audio"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button 
                      className="bg-black bg-opacity-50 backdrop-blur-sm rounded p-2"
                      aria-label="View options"
                      title="View options"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* Lesson Content */}
              <div className="prose prose-invert max-w-none">
                <h3>What are Support and Resistance Levels?</h3>
                <p>
                  Support and resistance levels are key concepts in technical analysis that help traders identify potential 
                  price reversal points. These levels represent the points where a price trend is likely to pause or reverse.
                </p>
                <ul>
                  <li><strong>Support</strong> is a price level where a downtrend can be expected to pause due to a concentration of demand.</li>
                  <li><strong>Resistance</strong> is a price level where an uptrend can be expected to pause due to a concentration of supply.</li>
                </ul>
                <h3>How to Identify These Levels</h3>
                <p>
                  Support and resistance levels can be identified by looking for areas where price has repeatedly reversed. 
                  The more times a price level has been tested, the stronger the support or resistance level is considered to be.
                </p>
                <h3>Trading with Support and Resistance</h3>
                <p>
                  There are several strategies for trading with support and resistance:
                </p>
                <ul>
                  <li>Buying at support levels in an uptrend</li>
                  <li>Selling at resistance levels in a downtrend</li>
                  <li>Breakout trading when price moves beyond established levels</li>
                </ul>
              </div>
            </div>
            {/* AI Assistant */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full text-xl">🤖</div>
                <div>
                  <h3 className="text-lg font-medium mb-2">AI Learning Assistant</h3>
                  <p className="text-gray-300 mb-4">
                    Understanding support and resistance is crucial. Remember that these levels often switch roles - former resistance becomes support after a breakout, and vice versa. Would you like me to explain this concept in more detail?
                  </p>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">Yes, explain more</button>
                    <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">I understand, continue</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Quiz Section */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
              <h3 className="text-lg font-medium mb-4">Quick Knowledge Check</h3>
              <div className="space-y-4">
                <div>
                  <p className="mb-2">Which of the following best describes a support level?</p>
                  <div className="space-y-2">
                    {[
                      "A price level where an uptrend is likely to reverse",
                      "A price level where a downtrend is likely to pause due to demand",
                      "A price level where trading volume increases significantly",
                      "A price level indicated by a moving average"
                    ].map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded border cursor-pointer hover:bg-gray-700 hover:border-gray-600 ${
                          index === 1 ? 'border-blue-600 bg-blue-900 bg-opacity-20' : 'border-gray-700'
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">Check Answer</button>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Link href={`/trading-education/courses/${course.id}/lessons/2`}>
                <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Previous Lesson
                </button>
              </Link>
              <Link href={`/trading-education/courses/${course.id}/lessons/4`}>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                  Next Lesson
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
} 