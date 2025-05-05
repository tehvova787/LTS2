'use client'
import React from 'react';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

export default function Courses() {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: 'Technical Analysis Fundamentals',
      description: 'Learn to read price charts and identify patterns for better trading decisions',
      level: 'Beginner',
      modules: 8,
      duration: '4 weeks',
      completion: 75,
      image: '📊',
      tags: ['Chart Patterns', 'Indicators', 'Price Action'],
      category: 'Technical Analysis'
    },
    {
      id: 2,
      title: 'Trading Psychology Mastery',
      description: 'Understand the psychological aspects of trading and develop a winning mindset',
      level: 'Intermediate',
      modules: 6,
      duration: '3 weeks',
      completion: 30,
      image: '🧠',
      tags: ['Emotional Control', 'Decision Making', 'Discipline'],
      category: 'Psychology'
    },
    {
      id: 3,
      title: 'Risk Management Strategies',
      description: 'Learn essential risk management techniques to protect your capital',
      level: 'Intermediate',
      modules: 5,
      duration: '2 weeks',
      completion: 0,
      image: '🛡️',
      tags: ['Position Sizing', 'Stop Loss', 'Risk-Reward'],
      category: 'Risk Management'
    },
    {
      id: 4,
      title: 'Forex Trading Fundamentals',
      description: 'Master the basics of trading in the foreign exchange market',
      level: 'Beginner',
      modules: 10,
      duration: '5 weeks',
      completion: 0,
      image: '💱',
      tags: ['Currency Pairs', 'Leverage', 'Market Hours'],
      category: 'Markets'
    },
    {
      id: 5,
      title: 'Algorithmic Trading Basics',
      description: 'Learn how to automate your trading strategies using algorithms',
      level: 'Advanced',
      modules: 12,
      duration: '6 weeks',
      completion: 0,
      image: '🤖',
      tags: ['Automation', 'Backtesting', 'Strategy Development'],
      category: 'Programming'
    },
    {
      id: 6,
      title: 'Candlestick Patterns Mastery',
      description: 'Deep dive into Japanese candlestick patterns for precise entry and exit points',
      level: 'Intermediate',
      modules: 7,
      duration: '3 weeks',
      completion: 0,
      image: '🕯️',
      tags: ['Reversal Patterns', 'Continuation Patterns', 'Price Action'],
      category: 'Technical Analysis'
    }
  ];

  const categories = ['All', 'Technical Analysis', 'Psychology', 'Risk Management', 'Markets', 'Programming'];
  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  return (
    <AnimatedWrapper>
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Trading Courses</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Explore our personalized courses designed by AI to match your learning style and goals
            </p>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="text-4xl">✨</div>
              <div>
                <h2 className="text-xl font-bold mb-2">AI Course Recommendation</h2>
                <p className="text-gray-200 mb-4">
                  Based on your learning history and goals, our AI suggests <strong>Technical Analysis Fundamentals</strong> as your next course. 
                  This will build on your current knowledge and help you improve chart reading skills.
                </p>
                <div className="flex gap-3">
                  <Link href="/trading-education/courses/1">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
                      Start Recommended Course
                    </button>
                  </Link>
                  <button className="px-4 py-2 bg-transparent border border-gray-400 hover:border-gray-300 rounded-md text-sm font-medium transition-colors duration-200">
                    Get Different Recommendation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      index === 0 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    } transition-colors duration-200`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Level</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((level, index) => (
                  <button 
                    key={index} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      index === 0 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gray-800 hover:bg-gray-700'
                    } transition-colors duration-200`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden flex flex-col h-full"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{course.image}</div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    course.level === 'Beginner' ? 'bg-green-900 text-green-300' :
                    course.level === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                    'bg-red-900 text-red-300'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-700 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>{course.modules} Modules</span>
                  <span>{course.duration}</span>
                </div>
                
                {course.completion > 0 && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{course.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${course.completion}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-auto p-4 border-t border-gray-700">
                <Link href={`/trading-education/courses/${course.id}`}>
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
                    {course.completion > 0 ? 'Continue Course' : 'Start Course'}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* AI Learning Path Recommendation */}
        <div className="mt-12">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">🧠</span>
              AI-Generated Learning Path
            </h2>
            <p className="text-gray-300 mb-6">
              Our AI has created a personalized learning path based on your goals and current skill level
            </p>
            
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-blue-600"></div>
              <div className="space-y-8 relative z-10">
                {[
                  { title: 'Technical Analysis Fundamentals', status: 'In Progress', number: 1 },
                  { title: 'Risk Management Strategies', status: 'Next', number: 2 },
                  { title: 'Trading Psychology Mastery', status: 'Upcoming', number: 3 },
                  { title: 'Forex Trading Fundamentals', status: 'Upcoming', number: 4 }
                ].map((step, index) => (
                  <div key={index} className="flex">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                      step.status === 'In Progress' ? 'bg-blue-600' : 
                      step.status === 'Next' ? 'bg-blue-900 border-2 border-blue-600' : 
                      'bg-gray-700'
                    }`}>
                      {step.number}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{step.title}</h3>
                      <p className={`text-sm ${
                        step.status === 'In Progress' ? 'text-blue-400' : 
                        step.status === 'Next' ? 'text-gray-300' : 
                        'text-gray-500'
                      }`}>
                        {step.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">
                Adjust Learning Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
} 