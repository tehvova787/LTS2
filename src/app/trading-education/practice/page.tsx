'use client'
import React from 'react';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';

export default function Practice() {
  // Mock data for practice activities
  const simulationActivities = [
    {
      id: 1,
      title: 'Forex Market Simulation',
      description: 'Practice trading major currency pairs in a real-time simulated environment',
      difficulty: 'Intermediate',
      duration: '30-60 min',
      type: 'Real-time Simulation',
      image: '💱',
      skills: ['Currency Trading', 'Market Analysis', 'Order Execution']
    },
    {
      id: 2,
      title: 'Stock Market Breakout Strategy',
      description: 'Apply breakout trading strategies on historical stock data with AI feedback',
      difficulty: 'Advanced',
      duration: '45-90 min',
      type: 'Historical Simulation',
      image: '📈',
      skills: ['Pattern Recognition', 'Entry Timing', 'Position Sizing']
    },
    {
      id: 3,
      title: 'Cryptocurrency Trading Basics',
      description: 'Learn to navigate crypto markets with simplified trading scenarios',
      difficulty: 'Beginner',
      duration: '20-40 min',
      type: 'Guided Simulation',
      image: '₿',
      skills: ['Market Volatility', 'Risk Management', 'Digital Assets']
    }
  ];

  const quizActivities = [
    {
      id: 4,
      title: 'Chart Pattern Recognition',
      description: 'Test your ability to identify common chart patterns across different timeframes',
      questions: 20,
      timeLimit: '15 min',
      lastScore: '16/20',
      image: '📊'
    },
    {
      id: 5,
      title: 'Risk Management Scenarios',
      description: 'Face real-world trading scenarios and make risk management decisions',
      questions: 15,
      timeLimit: '20 min',
      lastScore: '12/15',
      image: '🛡️'
    },
    {
      id: 6,
      title: 'Trading Psychology Assessment',
      description: 'Evaluate your psychological approach to trading with situational questions',
      questions: 25,
      timeLimit: '30 min',
      lastScore: null,
      image: '🧠'
    }
  ];

  const toolsActivities = [
    {
      id: 7,
      title: 'Position Size Calculator',
      description: 'Practice determining optimal position sizes based on your risk parameters',
      difficulty: 'Beginner',
      type: 'Interactive Tool',
      image: '🧮'
    },
    {
      id: 8,
      title: 'Risk-Reward Analyzer',
      description: 'Learn to calculate and optimize risk-reward ratios for different trade setups',
      difficulty: 'Intermediate',
      type: 'Interactive Tool',
      image: '⚖️'
    },
    {
      id: 9,
      title: 'Trading Journal Builder',
      description: 'Create a structured trading journal with AI-powered analysis of your decisions',
      difficulty: 'All Levels',
      type: 'Planning Tool',
      image: '📓'
    }
  ];

  return (
    <AnimatedWrapper>
      <div className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Practice & Simulation</h1>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Apply your knowledge in risk-free environments with AI-powered feedback
            </p>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="text-4xl">🤖</div>
              <div>
                <h2 className="text-xl font-bold mb-2">AI Practice Recommendation</h2>
                <p className="text-gray-200 mb-4">
                  Based on your recent course progress in Technical Analysis, I suggest trying the <strong>Chart Pattern Recognition Quiz</strong> followed by the <strong>Stock Market Breakout Strategy</strong> simulation. This will help reinforce your pattern recognition skills.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/trading-education/practice/4">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors duration-200">
                      Start Quiz
                    </button>
                  </Link>
                  <Link href="/trading-education/practice/2">
                    <button className="px-4 py-2 bg-transparent border border-gray-400 hover:border-gray-300 rounded-md text-sm font-medium transition-colors duration-200">
                      Try Simulation
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trading Simulations */}
        <div className="mb-12">
          <div>
            <h2 className="text-xl font-bold mb-6">Trading Simulations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {simulationActivities.map((activity) => (
                <Link href={`/trading-education/practice/${activity.id}`} key={activity.id}>
                  <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl">{activity.image}</div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          activity.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                          activity.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-red-900 text-red-300'
                        }`}>
                          {activity.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{activity.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {activity.skills.map((skill) => (
                          <span key={skill} className="bg-gray-700 px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>{activity.type}</span>
                        <span>{activity.duration}</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t border-gray-700 bg-gray-800">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">AI feedback included</span>
                        <span className="text-blue-400 text-sm">Start Simulation →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Activities */}
        <div className="mb-12">
          <div>
            <h2 className="text-xl font-bold mb-6">Interactive Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizActivities.map((quiz) => (
                <Link href={`/trading-education/practice/${quiz.id}`} key={quiz.id}>
                  <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl">{quiz.image}</div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs bg-gray-700 px-2 py-1 rounded mb-2">
                            {quiz.questions} questions
                          </span>
                          <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                            {quiz.timeLimit}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{quiz.description}</p>
                      
                      {quiz.lastScore && (
                        <div className="bg-gray-700 px-3 py-2 rounded text-sm">
                          Last Score: <span className="text-green-400">{quiz.lastScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trading Tools */}
        <div className="mb-12">
          <div>
            <h2 className="text-xl font-bold mb-6">Trading Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsActivities.map((tool) => (
                <Link href={`/trading-education/practice/${tool.id}`} key={tool.id}>
                  <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden cursor-pointer hover:-translate-y-1 transition-transform duration-200">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-3xl">{tool.image}</div>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tool.difficulty === 'Beginner' ? 'bg-green-900 text-green-300' :
                          tool.difficulty === 'Intermediate' ? 'bg-yellow-900 text-yellow-300' :
                          'bg-gray-700 text-gray-300'
                        }`}>
                          {tool.difficulty}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                      <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                      
                      <div className="bg-gray-700 px-3 py-2 rounded text-sm">
                        {tool.type}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AI Trading Assistant */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6 md:p-8 text-center">
            <div className="text-4xl mb-4 mx-auto">🧠</div>
            <h2 className="text-2xl font-bold mb-3">AI Trading Assistant</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              Need personalized guidance? Our AI Trading Assistant can analyze your practice sessions, 
              answer your questions, and provide tailored trading advice.
            </p>
            <button className="px-6 py-3 bg-white text-indigo-900 rounded-full font-medium hover:bg-gray-100 transition-colors duration-200">
              Chat with AI Assistant
            </button>
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
} 