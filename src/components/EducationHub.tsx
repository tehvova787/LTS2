'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

type Course = {
  id: string
  title: string
  description: string
  level: 'Начальный' | 'Средний' | 'Продвинутый'
  duration: string
  icon: React.ReactNode
}

export default function EducationHub() {
  const [activeCategory, setActiveCategory] = useState('beginner')

  const courses: Course[] = [
    {
      id: 'crypto-basics',
      title: 'Основы криптовалют',
      description: 'Изучите базовые концепции блокчейна, криптовалют и децентрализованных финансов в доступном формате.',
      level: 'Начальный',
      duration: '3 часа',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: 'trading-101',
      title: 'Трейдинг для начинающих',
      description: 'Начните свой путь в трейдинге с изучения базовых концепций, стратегий и инструментов анализа рынка.',
      level: 'Начальный',
      duration: '5 часов',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      id: 'technical-analysis',
      title: 'Технический анализ',
      description: 'Освойте методы технического анализа рынка для принятия более обоснованных торговых решений.',
      level: 'Средний',
      duration: '8 часов',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'fundamental-analysis',
      title: 'Фундаментальный анализ',
      description: 'Изучите методы оценки реальной стоимости активов на основе экономических и финансовых показателей.',
      level: 'Средний',
      duration: '6 часов',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'advanced-strategies',
      title: 'Продвинутые стратегии',
      description: 'Освойте сложные торговые стратегии и методы управления капиталом для профессиональных трейдеров.',
      level: 'Продвинутый',
      duration: '10 часов',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
    },
    {
      id: 'risk-management',
      title: 'Управление рисками',
      description: 'Научитесь эффективно управлять рисками при торговле на волатильных криптовалютных рынках.',
      level: 'Продвинутый',
      duration: '4 часа',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ]

  const categories = [
    { id: 'beginner', label: 'Для начинающих', color: 'bg-green text-white' },
    { id: 'intermediate', label: 'Средний уровень', color: 'bg-blue text-white' },
    { id: 'advanced', label: 'Для профессионалов', color: 'bg-purple text-white' },
  ]

  const filteredCourses = courses.filter(course => {
    if (activeCategory === 'beginner') return course.level === 'Начальный'
    if (activeCategory === 'intermediate') return course.level === 'Средний'
    if (activeCategory === 'advanced') return course.level === 'Продвинутый'
    return true
  })

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-montserrat text-gray-800">Образовательная Платформа</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-opensans">
            Развивайте свои навыки трейдинга с нашими структурированными курсами, 
            созданными опытными трейдерами и аналитиками рынка криптовалют.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? category.color + ' shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg mr-4 feature-icon">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-semibold font-montserrat text-gray-800">{course.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </span>
                  <span className={`px-3 py-1 rounded-full ${
                    course.level === 'Начальный' 
                      ? 'bg-green/10 text-green' 
                      : course.level === 'Средний'
                      ? 'bg-blue/10 text-blue'
                      : 'bg-purple/10 text-purple'
                  }`}>
                    {course.level}
                  </span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Бесплатно</span>
                <button className="btn-outline px-4 py-2 text-sm rounded-lg">
                  Начать обучение
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Udemy Trading Courses */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold mb-4 font-montserrat text-gray-800">Бесплатные Курсы по Трейдингу от Udemy</h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-opensans">
              Повышайте свои навыки с помощью бесплатных профессиональных курсов по трейдингу от Udemy. 
              Доступно для всех уровней подготовки.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="card hover:shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Введение в Дейтрейдинг</h3>
                <p className="text-gray-600 mb-4">Освойте основы дейтрейдинга, анализа графиков и стратегий управления рисками.</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    3.5 часа
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green/10 text-green">Начальный</span>
                </div>
                <div className="flex items-center mt-4">
                  <img src="/images/blockchains/udemy.svg" alt="Udemy" className="h-6 mr-2" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/lucky-train-logo.png";
                  }} />
                  <span className="text-sm text-gray-500">4.5 ★ (1,245 отзывов)</span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Бесплатно</span>
                <a href="https://www.udemy.com/course/intro-to-day-trading/" target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm rounded-lg">
                  Перейти к курсу
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="card hover:shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Технический Анализ: Полное Руководство</h3>
                <p className="text-gray-600 mb-4">Изучите полный набор инструментов технического анализа для прогнозирования движения цен на любом рынке.</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    6 часов
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue/10 text-blue">Средний</span>
                </div>
                <div className="flex items-center mt-4">
                  <img src="/images/blockchains/udemy.svg" alt="Udemy" className="h-6 mr-2" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/lucky-train-logo.png";
                  }} />
                  <span className="text-sm text-gray-500">4.7 ★ (2,873 отзывов)</span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Бесплатно</span>
                <a href="https://www.udemy.com/course/technical-analysis-complete-guide/" target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm rounded-lg">
                  Перейти к курсу
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="card hover:shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Криптовалютный Трейдинг для Начинающих</h3>
                <p className="text-gray-600 mb-4">Полное руководство по торговле криптовалютами: от основ блокчейна до практических стратегий.</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    4.5 часа
                  </span>
                  <span className="px-3 py-1 rounded-full bg-green/10 text-green">Начальный</span>
                </div>
                <div className="flex items-center mt-4">
                  <img src="/images/blockchains/udemy.svg" alt="Udemy" className="h-6 mr-2" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/lucky-train-logo.png";
                  }} />
                  <span className="text-sm text-gray-500">4.6 ★ (1,958 отзывов)</span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Бесплатно</span>
                <a href="https://www.udemy.com/course/cryptocurrency-trading-for-beginners/" target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm rounded-lg">
                  Перейти к курсу
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="card hover:shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Форекс Торговля: Стратегии Прибыльной Торговли</h3>
                <p className="text-gray-600 mb-4">Научитесь торговать на рынке Форекс с проверенными стратегиями для долгосрочного успеха.</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    5 часов
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue/10 text-blue">Средний</span>
                </div>
                <div className="flex items-center mt-4">
                  <img src="/images/blockchains/udemy.svg" alt="Udemy" className="h-6 mr-2" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/lucky-train-logo.png";
                  }} />
                  <span className="text-sm text-gray-500">4.4 ★ (2,104 отзывов)</span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Бесплатно</span>
                <a href="https://www.udemy.com/course/forex-trading-profitable-strategies/" target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm rounded-lg">
                  Перейти к курсу
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="card hover:shadow-lg"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold font-montserrat text-gray-800 mb-3">Психология Трейдинга: Мышление Успешного Трейдера</h3>
                <p className="text-gray-600 mb-4">Преодолейте психологические барьеры в трейдинге и развивайте устойчивый образ мышления для достижения стабильных результатов.</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    3 часа
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple/10 text-purple">Продвинутый</span>
                </div>
                <div className="flex items-center mt-4">
                  <img src="/images/blockchains/udemy.svg" alt="Udemy" className="h-6 mr-2" onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/lucky-train-logo.png";
                  }} />
                  <span className="text-sm text-gray-500">4.8 ★ (1,532 отзывов)</span>
                </div>
              </div>
              <div className="border-t border-gray-100 p-4 bg-gray-50 flex justify-between items-center">
                <span className="text-gray-600 text-sm">Бесплатно</span>
                <a href="https://www.udemy.com/course/trading-psychology-successful-trader-mindset/" target="_blank" rel="noopener noreferrer" className="btn-outline px-4 py-2 text-sm rounded-lg">
                  Перейти к курсу
                </a>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8">
            <a href="https://www.udemy.com/courses/search/?price=price-free&q=trading+&sort=relevance&src=ukw" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="inline-flex items-center text-blue hover:text-blue-700 transition-colors">
              Смотреть все бесплатные курсы на Udemy
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a href="/trading-education" className="btn btn-primary inline-flex items-center px-8 py-4">
            Все курсы
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
} 