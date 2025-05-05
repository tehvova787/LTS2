'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900/90 to-indigo-900/90 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white mr-1">Lucky</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">Train</span>
            <span className="ml-2 text-sm text-blue-200 hidden sm:inline">Образовательная платформа</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/learn" className="text-blue-100 hover:text-white transition-colors">
              Обучение
            </Link>
            <Link href="/trading" className="text-blue-100 hover:text-white transition-colors">
              Трейдинг
            </Link>
            <Link href="/staking" className="text-blue-100 hover:text-white transition-colors">
              Стейкинг
            </Link>
            <Link href="/exchange" className="text-blue-100 hover:text-white transition-colors">
              Биржа
            </Link>
            <Link href="/ai-assistant" className="text-blue-100 hover:text-white transition-colors">
              AI-Ассистент
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative mr-2">
              <input 
                type="text" 
                placeholder="Поиск в базе знаний..." 
                className="bg-white/10 text-white pl-4 pr-10 py-1 rounded-full w-48 focus:w-64 transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <button onClick={handleJumpOnTrain} className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-4 py-1 rounded-full text-sm font-semibold hover:from-green-600 hover:to-teal-500 transition-all">
              Telegram
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-blue-900/95 backdrop-blur-md"
        >
          <div className="px-4 py-3 space-y-3">
            <div className="relative mb-3">
              <input 
                type="text" 
                placeholder="Поиск в базе знаний..." 
                className="bg-white/10 text-white pl-4 pr-10 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-yellow-300/50"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            <Link href="/learn" className="block text-blue-100 hover:text-white transition-colors">
              Обучение
            </Link>
            <Link href="/trading" className="block text-blue-100 hover:text-white transition-colors">
              Трейдинг
            </Link>
            <Link href="/staking" className="block text-blue-100 hover:text-white transition-colors">
              Стейкинг
            </Link>
            <Link href="/exchange" className="block text-blue-100 hover:text-white transition-colors">
              Биржа
            </Link>
            <Link href="/ai-assistant" className="block text-blue-100 hover:text-white transition-colors">
              AI-Ассистент
            </Link>
            <button onClick={handleJumpOnTrain} className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-green-600 hover:to-teal-500 transition-all">
              Присоединиться в Telegram
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  )

  function handleJumpOnTrain() {
    window.open('https://t.me/LuckyTrainTON', '_blank')
  }
} 