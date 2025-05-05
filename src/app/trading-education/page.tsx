'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import MainNavigation from '@/components/MainNavigation'

export default function TradingEducationLanding() {
  return (
    <main className="min-h-screen bg-white">
      <MainNavigation />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        {/* Hero Section */}
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              AI-Powered Trading Education
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Learn trading with our personalized AI ecosystem that adapts to your skill level and learning style
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/trading-education/dashboard">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium text-lg"
                >
                  Start Learning
                </motion.button>
              </Link>
              <Link href="/trading-education/courses">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full bg-transparent border-2 border-blue-500 text-white font-medium text-lg"
                >
                  Explore Courses
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* News Block Section */}
        <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-900/70 to-purple-900/70 backdrop-blur-lg rounded-xl p-6 border border-blue-500 text-center"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-3 text-blue-300">Upcoming Release</h3>
            <p className="text-lg text-white">
              The launch of tradingAI_bot is planned soon — an innovative tool that will offer trading signals within the Solana and Ethereum ecosystems.
            </p>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">AI-Powered Learning Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Personalized Learning",
                description: "AI analyzes your knowledge level and creates a customized learning path just for you",
                icon: "🧠"
              },
              {
                title: "Real-time Market Analysis",
                description: "Practice with real market data and get AI-powered insights on your trading decisions",
                icon: "📊"
              },
              {
                title: "Interactive Simulations",
                description: "Apply your knowledge in risk-free trading simulations with AI feedback",
                icon: "🔄"
              },
              {
                title: "24/7 AI Assistant",
                description: "Get help anytime with our AI assistant that answers all your trading questions",
                icon: "🤖"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Modules Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Platform Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Onboarding",
                description: "AI analyzes your knowledge level and creates a customized learning path",
                link: "/trading-education/profile",
                color: "from-blue-600 to-cyan-400"
              },
              {
                title: "Learning",
                description: "Dynamic content generation that adapts to your understanding",
                link: "/trading-education/courses",
                color: "from-purple-600 to-pink-400"
              },
              {
                title: "Analytics",
                description: "Real-time market analysis and personalized trading recommendations",
                link: "/trading-education/analytics",
                color: "from-green-500 to-emerald-400"
              },
              {
                title: "Practice",
                description: "Virtual trading terminal with AI feedback on your decisions",
                link: "/trading-education/practice",
                color: "from-amber-500 to-yellow-400"
              },
              {
                title: "Assessment",
                description: "AI evaluates your progress and identifies knowledge gaps",
                link: "/trading-education/dashboard",
                color: "from-red-500 to-orange-400"
              },
              {
                title: "Support",
                description: "24/7 AI assistant to answer all your trading questions",
                link: "/trading-education/dashboard",
                color: "from-indigo-600 to-blue-400"
              }
            ].map((module, index) => (
              <Link href={module.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 h-full cursor-pointer"
                >
                  <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${module.color} mb-6`}></div>
                  <h3 className="text-xl font-semibold mb-3">{module.title}</h3>
                  <p className="text-gray-400">{module.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Powered by AI Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "GPT AI", icon: "🧠" },
              { name: "Machine Learning", icon: "📊" },
              { name: "Neural Networks", icon: "🔄" },
              { name: "Cloud Infrastructure", icon: "☁️" }
            ].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center bg-gray-800 bg-opacity-30 backdrop-blur-lg rounded-xl p-6 border border-gray-700 py-8"
              >
                <div className="text-4xl mb-4">{tech.icon}</div>
                <h3 className="text-lg font-medium text-center">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-3xl p-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Trading Skills?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join our AI-powered trading education platform and start your journey to becoming a successful trader
            </p>
            <Link href="/trading-education/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-white text-blue-900 font-medium text-lg"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </section>
      </div>
    </main>
  );
} 