'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SecurityFeatures() {
  const [activeTab, setActiveTab] = useState('wallets')

  const securityFeatures = [
    {
      id: 'wallets',
      title: 'Мультиподпись',
      description: 'Система мультиподписи требует подтверждения от нескольких ключей для выполнения транзакций, повышая безопасность средств.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      id: 'encryption',
      title: 'Шифрование',
      description: 'Все данные шифруются с использованием современных алгоритмов шифрования, обеспечивая защиту от несанкционированного доступа.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: 'audit',
      title: 'Аудит Кода',
      description: 'Регулярный аудит кода независимыми специалистами по безопасности для выявления и устранения потенциальных уязвимостей.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 'insurance',
      title: 'Страхование',
      description: 'Специальный страховой фонд для защиты пользовательских активов в случае непредвиденных обстоятельств или технических сбоев.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-full h-full">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
        </svg>
      ),
    },
  ]
  
  const activeFeature = securityFeatures.find(feature => feature.id === activeTab)

  return (
    <section className="py-16 bg-light-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-montserrat text-gray-800">Безопасность Платформы</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto font-opensans">
            Безопасность пользовательских средств и данных — наш главный приоритет. 
            Мы используем передовые технологии для обеспечения максимальной защиты.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Security features tabs */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <ul className="space-y-2">
                {securityFeatures.map((feature) => (
                  <li key={feature.id}>
                    <button
                      onClick={() => setActiveTab(feature.id)}
                      className={`w-full text-left px-4 py-3 rounded-md transition-all flex items-center ${
                        activeTab === feature.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`w-8 h-8 mr-3 ${
                        activeTab === feature.id ? 'text-white' : 'text-primary'
                      }`}>
                        {feature.icon}
                      </div>
                      <span className="font-medium font-poppins">
                        {feature.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Active feature details */}
          <div className="lg:w-2/3 w-full">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg p-2 text-primary mr-4 flex-shrink-0">
                    {activeFeature?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold font-montserrat text-gray-800 mb-2">{activeFeature?.title}</h3>
                    <p className="text-gray-600 text-lg font-opensans leading-relaxed">
                      {activeFeature?.description}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-6 rounded-lg">
                    <div className="sm:w-1/2">
                      <h4 className="font-poppins font-medium text-lg text-gray-800 mb-3">Наши гарантии</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Мониторинг 24/7</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Холодное хранение активов</span>
                        </li>
                        <li className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-600">Двухфакторная аутентификация</span>
                        </li>
                      </ul>
                    </div>
                    <div className="sm:w-1/2">
                      <h4 className="font-poppins font-medium text-lg text-gray-800 mb-3">Внешние аудиты</h4>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white p-3 rounded-md shadow-sm">
                          <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-primary mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Certik</p>
                            <p className="text-sm text-gray-500">Апрель 2023</p>
                          </div>
                        </div>
                        <div className="flex items-center bg-white p-3 rounded-md shadow-sm">
                          <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Hacken</p>
                            <p className="text-sm text-gray-500">Январь 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-medium font-poppins text-gray-800 mb-4">Статистика безопасности</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">100%</p>
                        <p className="text-gray-500 text-sm">Время работы</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">0</p>
                        <p className="text-gray-500 text-sm">Инцидентов</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">$10M</p>
                        <p className="text-gray-500 text-sm">Страховка</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-primary">24/7</p>
                        <p className="text-gray-500 text-sm">Поддержка</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                <a href="/security" className="text-primary hover:underline font-medium inline-flex items-center">
                  Узнать больше о безопасности
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 