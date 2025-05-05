'use client'
import React from 'react';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

export default function Dashboard() {
  // Mock data for progress and recommendations
  const learningProgress = 42;
  const coursesCompleted = 3;
  const totalCourses = 12;
  const skillLevel = 'Intermediate Beginner';
  
  const recentLessons = [
    { id: 1, title: 'Technical Analysis Basics', progress: 100, module: 'Chart Patterns' },
    { id: 2, title: 'Risk Management Strategies', progress: 75, module: 'Trading Psychology' },
    { id: 3, title: 'Market Structure', progress: 60, module: 'Price Action' },
  ];
  
  const recommendedLessons = [
    { id: 4, title: 'Support and Resistance', module: 'Technical Analysis' },
    { id: 5, title: 'Position Sizing', module: 'Risk Management' },
    { id: 6, title: 'Breakout Strategies', module: 'Trading Strategies' },
  ];
  
  const practiceActivities = [
    { id: 1, title: 'Identify Chart Patterns', type: 'Quiz', difficulty: 'Medium' },
    { id: 2, title: 'Trading Simulation: Forex Breakouts', type: 'Simulation', difficulty: 'Hard' },
    { id: 3, title: 'Position Sizing Calculator', type: 'Tool', difficulty: 'Easy' },
  ];

  return (
    <AnimatedWrapper>
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Trading Education Dashboard</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Track your progress and continue your learning journey
            </p>
          </div>
        </div>

        {/* Welcome Section with User Progress */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, Alex</h1>
                <p className="text-gray-300 mb-4">Your AI-powered learning journey continues</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                    Level: {skillLevel}
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                    {coursesCompleted}/{totalCourses} Courses
                  </div>
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <div className="relative h-24 w-24">
                  <svg className="h-24 w-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#4b5563" 
                      strokeWidth="8" 
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="45" 
                      fill="none" 
                      stroke="#4f46e5" 
                      strokeWidth="8" 
                      strokeDasharray="283"
                      strokeDashoffset={283 - (283 * learningProgress) / 100}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">{learningProgress}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Assistant Message */}
        <div className="mb-12">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full text-xl">
                🤖
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">AI Assistant Recommendation</h3>
                <p className="text-gray-300 mb-4">
                  Based on your recent progress, I recommend focusing on <strong>Support and Resistance levels</strong>. 
                  This will complement your understanding of chart patterns and help you identify key market turning points.
                </p>
                <div className="flex gap-3">
                  <Link href="/trading-education/courses">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
                      Start Lesson
                    </button>
                  </Link>
                  <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">
                    Try Different Topic
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-3">
            <h2 className="text-xl font-bold mb-4">Your Learning Path</h2>
          </div>

          {/* Continue Learning */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium mb-4">Continue Learning</h3>
            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{lesson.module}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>{lesson.progress}% complete</span>
                    <Link href={`/trading-education/courses/${lesson.id}`}>
                      <span className="text-blue-400 hover:text-blue-300">Continue</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for You */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium mb-4">AI Recommended</h3>
            <div className="space-y-4">
              {recommendedLessons.map((lesson) => (
                <div key={lesson.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{lesson.module}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">Recommended based on your progress</span>
                    <Link href={`/trading-education/courses/${lesson.id}`}>
                      <span className="text-blue-400 hover:text-blue-300 text-xs">Start</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Activities */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-medium mb-4">Practice Activities</h3>
            <div className="space-y-4">
              {practiceActivities.map((activity) => (
                <div key={activity.id} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{activity.title}</h4>
                    <div className="flex gap-2">
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded">{activity.type}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        activity.difficulty === 'Easy' ? 'bg-green-900 text-green-300' :
                        activity.difficulty === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-red-900 text-red-300'
                      }`}>{activity.difficulty}</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link href={`/trading-education/practice/${activity.id}`}>
                      <span className="text-blue-400 hover:text-blue-300 text-xs">Start Practice</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Analytics */}
        <div className="mb-12">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Study Streak</h3>
                <div className="text-3xl font-bold text-blue-400">7 Days</div>
                <p className="text-sm text-gray-400 mt-1">Keep it up!</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Quiz Accuracy</h3>
                <div className="text-3xl font-bold text-green-400">78%</div>
                <p className="text-sm text-gray-400 mt-1">Above average</p>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Time Spent</h3>
                <div className="text-3xl font-bold text-purple-400">5h 32m</div>
                <p className="text-sm text-gray-400 mt-1">This week</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link href="/trading-education/analytics">
                <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">
                  View Detailed Analytics
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'Market News', icon: '📰', link: '/trading-education/analytics' },
              { title: 'Trading Simulator', icon: '📊', link: '/trading-education/practice' },
              { title: 'Community Forum', icon: '👥', link: '/trading-education/community' },
              { title: 'Learning Schedule', icon: '📅', link: '/trading-education/profile' },
            ].map((action, index) => (
              <Link href={action.link} key={index}>
                <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-4 border border-gray-700 text-center cursor-pointer">
                  <div className="text-3xl mb-2">{action.icon}</div>
                  <h3 className="text-sm font-medium">{action.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
} 