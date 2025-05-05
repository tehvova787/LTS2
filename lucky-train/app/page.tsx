'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  // Initialize stars background
  useEffect(() => {
    // Create stars
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;
      
      // Clear previous stars
      starsContainer.innerHTML = '';
      
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      // Create 100 random stars
      for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        const left = Math.floor(Math.random() * screenWidth);
        const top = Math.floor(Math.random() * screenHeight);
        
        // Random size
        const size = Math.floor(Math.random() * 3) + 1;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        // Set styles
        star.style.left = `${left}px`;
        star.style.top = `${top}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;
        
        starsContainer.appendChild(star);
      }
    };
    
    // Initialize stars
    createStars();
    
    // Recreate stars on window resize
    window.addEventListener('resize', createStars);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', createStars);
    };
  }, []);

  return (
    <main className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] overflow-hidden">
        {/* Stars background */}
        <div id="stars-container" className="absolute inset-0 z-0"></div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 text-gray-100"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="block mb-4">Образовательная платформа</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">
                о криптовалютах и инвестициях
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl mb-8 text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Учитесь торговать на бирже, стейкингу и блокчейн-технологиям с помощью 
              интерактивных курсов и поддержки искусственного интеллекта.
            </motion.p>
            
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/learn" className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-green-600 hover:to-teal-500 transition-all">
                Начать обучение
              </Link>
              <Link href="/ai-assistant" className="bg-gray-700/50 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-600/50 transition-all">
                Спросить AI-ассистента
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Features section */}
        <div className="relative z-10 container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-teal-400 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">Интерактивные курсы</h3>
              <p className="text-gray-300">Структурированные учебные программы по блокчейну, криптовалютам, трейдингу и стейкингу для всех уровней.</p>
              <Link href="/learn/courses" className="inline-block mt-4 text-teal-400 hover:text-teal-300">Изучить курсы →</Link>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-yellow-400 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">Практические симуляторы</h3>
              <p className="text-gray-300">Тренируйте навыки трейдинга на симуляторах биржи в безопасной среде без риска потери реальных средств.</p>
              <Link href="/trading/simulator" className="inline-block mt-4 text-yellow-400 hover:text-yellow-300">Попробовать симулятор →</Link>
            </motion.div>
            
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="text-blue-400 text-4xl mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">AI-помощник</h3>
              <p className="text-gray-300">Получите ответы на любые вопросы о криптовалютах и персональные рекомендации от нашего искусственного интеллекта.</p>
              <Link href="/ai-assistant" className="inline-block mt-4 text-blue-400 hover:text-blue-300">Спросить AI →</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Educational Tracks Section */}
      <section className="bg-gray-950 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">Образовательные треки</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Выберите интересующее вас направление и начните изучать его шаг за шагом — от основ до продвинутых стратегий</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/learn/basics" className="group block">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Основы криптовалют</h3>
                  <p className="text-gray-300 mb-4">Изучите базовые концепции блокчейна, криптовалют и децентрализованных финансов.</p>
                  <span className="text-blue-400 group-hover:text-blue-300">Начать обучение →</span>
                </div>
              </div>
            </Link>

            <Link href="/trading" className="group block">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Трейдинг</h3>
                  <p className="text-gray-300 mb-4">Стратегии, технический анализ и психология трейдинга криптовалют на бирже.</p>
                  <span className="text-purple-400 group-hover:text-purple-300">Начать обучение →</span>
                </div>
              </div>
            </Link>

            <Link href="/staking" className="group block">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-xl transition-transform duration-300 group-hover:transform group-hover:scale-105">
                <div className="h-48 bg-gradient-to-r from-gray-700 to-gray-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">Стейкинг</h3>
                  <p className="text-gray-300 mb-4">Как получать пассивный доход с помощью стейкинга криптовалют и TON.</p>
                  <span className="text-green-400 group-hover:text-green-300">Начать обучение →</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-100 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                AI-ассистент для персонализированного обучения
              </motion.h2>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Задавайте любые вопросы о криптовалютах, трейдинге и блокчейне. Наш искусственный интеллект даст подробные ответы, подскажет обучающие материалы и поможет развить ваши навыки.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/ai-assistant" className="bg-gray-200 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-300 transition-all">
                  Попробовать AI-ассистента
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="border-b border-gray-700 pb-4 mb-4 flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <div className="text-xl font-semibold text-white">AI Assistant</div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-900/50 p-4 rounded-lg max-w-[90%]">
                  <p className="text-gray-300">Как начать торговать на бирже криптовалют?</p>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg ml-auto max-w-[90%]">
                  <p className="text-gray-100">Для начала торговли на криптобирже вам необходимо выполнить несколько шагов:</p>
                  <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-300">
                    <li>Выбрать надежную биржу с хорошей репутацией</li>
                    <li>Пройти верификацию личности (KYC)</li>
                    <li>Пополнить счет удобным способом</li>
                    <li>Изучить интерфейс и типы ордеров</li>
                    <li>Начать с небольших сумм и простых стратегий</li>
                  </ol>
                  <p className="text-gray-200 mt-2">Рекомендую начать с нашего курса "Основы торговли на бирже" — там все подробно объясняется.</p>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg max-w-[90%]">
                  <p className="text-gray-300">Что такое ордера и какие их типы бывают?</p>
                </div>
              </div>

              <div className="mt-4 relative">
                <input 
                  type="text" 
                  placeholder="Задайте ваш вопрос..." 
                  className="bg-gray-800/30 text-white pl-4 pr-12 py-3 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-gray-600/50"
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100"
                  aria-label="Отправить вопрос"
                  title="Отправить вопрос"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-6">
            Готовы начать свой путь в мире криптовалют?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Присоединяйтесь к тысячам пользователей, которые уже изучают трейдинг, стейкинг и технологии блокчейн на нашей платформе.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/learn" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-yellow-600 hover:to-orange-600 transition-all">
              Начать обучение
            </Link>
            <a href="https://t.me/LuckyTrainTON" target="_blank" rel="noopener noreferrer" className="bg-gray-700/50 backdrop-blur-sm border border-gray-600/20 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-600/50 transition-all">
              Telegram сообщество
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

// Add CSS for animations
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
      100% { transform: translateY(0px); }
    }
    
    .star {
      position: absolute;
      background-color: #aaa;
      border-radius: 50%;
      animation: twinkle 3s infinite alternate;
    }
    
    @keyframes twinkle {
      0% { opacity: 0.2; }
      50% { opacity: 1; }
      100% { opacity: 0.2; }
    }
  `;
  document.head.appendChild(styleElement);
}
