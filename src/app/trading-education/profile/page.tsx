'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">User Profile</h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Manage your learning preferences and track your trading education journey
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
                A
              </div>
              <div>
                <h2 className="text-xl font-bold">Alex Johnson</h2>
                <p className="text-gray-400">Joined 3 months ago</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Trading Level</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">Intermediate Beginner</span>
                  <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded-full">Level 4</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Learning Streak</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">7 Days</span>
                  <span className="text-amber-400">🔥</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Points</h3>
                <div className="text-lg font-medium">3,450 XP</div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <h3 className="font-medium mb-4">Your Badges</h3>
              <div className="flex flex-wrap gap-3">
                {['🎯', '🚀', '📊', '💯', '🔄'].map((badge, index) => (
                  <div 
                    key={index} 
                    className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-lg"
                    title={[
                      'Precision Trader', 
                      'Fast Learner', 
                      'Chart Master', 
                      'Perfect Score', 
                      'Consistent Practice'
                    ][index]}
                  >
                    {badge}
                  </div>
                ))}
                <div className="h-10 w-10 rounded-full bg-gray-700 bg-opacity-50 border border-dashed border-gray-600 flex items-center justify-center text-gray-500">
                  +
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h3 className="font-medium mb-4">Learning Schedule</h3>
            <div className="space-y-4">
              {[
                { day: 'Monday', time: '7:00 PM - 8:30 PM', topic: 'Technical Analysis' },
                { day: 'Wednesday', time: '7:30 PM - 9:00 PM', topic: 'Risk Management' },
                { day: 'Saturday', time: '10:00 AM - 12:00 PM', topic: 'Trading Practice' },
              ].map((schedule, index) => (
                <div key={index} className="flex items-start gap-3 border-b border-gray-700 pb-3 last:border-0 last:pb-0">
                  <div className="h-8 w-8 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center text-xs shrink-0">
                    {schedule.day.substring(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium">{schedule.day}</div>
                    <div className="text-sm text-gray-400">{schedule.time}</div>
                    <div className="text-sm text-blue-400">{schedule.topic}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">
              Adjust Schedule
            </button>
          </div>
        </motion.div>
        
        {/* Right Column - Settings and Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          {/* Learning Preferences */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
            <h2 className="text-xl font-bold mb-6">Learning Preferences</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Learning Goals</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                  <option>Become a profitable trader</option>
                  <option>Enhance technical analysis skills</option>
                  <option>Learn risk management</option>
                  <option>Develop trading discipline</option>
                  <option>Custom goal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Preferred Learning Style</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                  <option>Visual learning</option>
                  <option>Hands-on practice</option>
                  <option>Theoretical explanations</option>
                  <option>Mixed approach</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Weekly Study Commitment</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                  <option>2-4 hours</option>
                  <option>4-6 hours</option>
                  <option>6-10 hours</option>
                  <option>10+ hours</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Trading Focus</label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-sm">
                  <option>Forex</option>
                  <option>Stocks</option>
                  <option>Cryptocurrencies</option>
                  <option>Commodities</option>
                  <option>Multiple markets</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">AI Intensity</label>
              <div className="flex items-center">
                <span className="text-sm text-gray-400 mr-3">Basic</span>
                <div className="w-full max-w-md h-2 bg-gray-700 rounded-full">
                  <div className="h-2 bg-blue-600 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <span className="text-sm text-gray-400 ml-3">Advanced</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Controls how deeply the AI personalizes your learning experience and analyzes your trading decisions</p>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
              Update Preferences
            </button>
          </div>
          
          {/* AI Personalization */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 mb-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-bold">AI Personalization</h2>
              <span className="bg-blue-900 text-blue-300 text-xs px-2 py-1 rounded">Active</span>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Detected Learning Patterns</h3>
                  <span className="text-xs text-gray-400">Last updated: 2 days ago</span>
                </div>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Strong visual learning preference detected</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Highest engagement with practical exercises and simulations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Peak learning performance in evening hours (7-10 PM)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span>Preference for short, focused learning sessions (30-45 minutes)</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">AI Adaptation Actions</h3>
                <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">→</span>
                      <span>Prioritizing visual content and interactive charts in your lessons</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">→</span>
                      <span>Scheduling practice simulations during your peak performance hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">→</span>
                      <span>Breaking down complex topics into focused 30-minute segments</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2">→</span>
                      <span>Increasing the frequency of interactive exercises in technical analysis modules</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">
                Adjust AI Settings
              </button>
              <button className="px-4 py-2 bg-transparent border border-gray-600 hover:border-gray-500 rounded-md text-sm font-medium transition-colors duration-200">
                Reset AI Learning
              </button>
            </div>
          </div>
          
          {/* Notification Settings */}
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
            
            <div className="space-y-4">
              {[
                { title: 'Learning Reminders', description: 'Get reminded of your scheduled learning sessions' },
                { title: 'Course Updates', description: 'Notifications when new lessons or content is available' },
                { title: 'AI Insights', description: 'Receive AI-generated insights about your learning progress' },
                { title: 'Achievement Alerts', description: 'Get notified when you earn badges or reach milestones' },
                { title: 'Market Updates', description: 'Important market news related to your learning topics' },
              ].map((notification, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                  <div>
                    <h3 className="font-medium">{notification.title}</h3>
                    <p className="text-sm text-gray-400">{notification.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked={[0, 2, 3].includes(index)} />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
                Save Notification Settings
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 