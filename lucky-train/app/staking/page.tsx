'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Train3DStaking from '@/components/Train3DStaking'
import UserStakingDashboard from '@/components/UserStakingDashboard'
import DexTrading from '@/components/DexTrading'
import TradingEducation from '@/components/TradingEducation'
import { tonConnector } from '@/services/tonConnector'

export default function StakingPage() {
  const [amount, setAmount] = useState(1000)
  const [period, setPeriod] = useState(12)
  const [activeSection, setActiveSection] = useState('staking') // 'staking', 'dashboard', 'dex', 'education'
  const [isConnected, setIsConnected] = useState(false)
  
  // Check wallet connection on component mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = tonConnector.isWalletConnected();
      setIsConnected(connected);
    };
    
    checkConnection();
  }, []);
  
  // Calculate estimated reward
  const calculateReward = () => {
    const annualRate = 0.12 // 12% APY
    const reward = amount * Math.pow(1 + annualRate, period / 12) - amount
    return reward.toFixed(2)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-950">
      {/* Hero section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500">
                Lucky Train - стейкинг TON
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Стейкайте TON, получайте вознаграждения и присоединяйтесь к путешествию на крипто-поезде
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {!isConnected ? (
                <button 
                  onClick={async () => {
                    const connected = await tonConnector.connect();
                    setIsConnected(connected);
                    if (connected) setActiveSection('dashboard');
                  }}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
                >
                  Подключить кошелек
                </button>
              ) : (
                <button 
                  onClick={() => setActiveSection('dashboard')}
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-teal-600 transition-all"
                >
                  Мой кабинет
                </button>
              )}
              <Link href="https://t.me/LuckyTrainTON" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all">
                Telegram бот
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main navigation for staking platform */}
      <section className="py-4 bg-blue-950/80 backdrop-blur-md sticky top-0 z-10 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center overflow-x-auto">
            <button
              onClick={() => setActiveSection('staking')}
              className={`px-5 py-2 mx-2 rounded-full text-sm font-medium transition-all ${
                activeSection === 'staking' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                  : 'bg-blue-900/50 text-blue-100 hover:bg-blue-800/50'
              }`}
            >
              Стейкинг
            </button>
            <button
              onClick={() => setActiveSection('dashboard')}
              className={`px-5 py-2 mx-2 rounded-full text-sm font-medium transition-all ${
                activeSection === 'dashboard' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                  : 'bg-blue-900/50 text-blue-100 hover:bg-blue-800/50'
              }`}
            >
              Личный кабинет
            </button>
            <button
              onClick={() => setActiveSection('dex')}
              className={`px-5 py-2 mx-2 rounded-full text-sm font-medium transition-all ${
                activeSection === 'dex' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                  : 'bg-blue-900/50 text-blue-100 hover:bg-blue-800/50'
              }`}
            >
              Обмен токенов
            </button>
            <button
              onClick={() => setActiveSection('education')}
              className={`px-5 py-2 mx-2 rounded-full text-sm font-medium transition-all ${
                activeSection === 'education' 
                  ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white' 
                  : 'bg-blue-900/50 text-blue-100 hover:bg-blue-800/50'
              }`}
            >
              Обучение
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic content based on active section */}
      <div className="container mx-auto px-4 mb-16">
        {activeSection === 'staking' && (
          <>
            {/* 3D Train Visualization */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Визуализация стейкинга</h2>
              <p className="text-lg text-blue-100 text-center mb-8">
                Выберите свой уровень стейкинга и станьте частью нашего крипто-поезда
              </p>
              <Train3DStaking userStake={isConnected ? 1000 : null} />
            </section>

            {/* What is staking section */}
            <section className="py-16 bg-indigo-950/50">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">Что такое стейкинг?</h2>
                    <p className="text-lg text-blue-100 mb-4">
                      Стейкинг — это процесс, в котором вы блокируете свои криптовалюты для участия в работе блокчейна, основанного на механизме Proof of Stake (PoS). За это вы получаете вознаграждение в виде дополнительных монет.
                    </p>
                    <p className="text-lg text-blue-100 mb-6">
                      В отличие от майнинга, стейкинг не требует мощного оборудования, потребляет минимум электроэнергии и доступен практически каждому владельцу криптовалют.
                    </p>
                    <ul className="space-y-3 text-blue-100">
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>Пассивный доход от 5% до 20% годовых</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>Участие в развитии и безопасности блокчейна</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>Низкий порог входа для начинающих</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-400 mr-2">✓</span>
                        <span>Экологичность и энергоэффективность</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-8 shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white">Как работает стейкинг</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-blue-950/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <span className="text-green-400 font-bold">1</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white">Блокировка средств</h4>
                        </div>
                        <p className="text-blue-100">Вы блокируете определенное количество монет на указанный период времени</p>
                      </div>
                      
                      <div className="bg-blue-950/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <span className="text-green-400 font-bold">2</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white">Валидация</h4>
                        </div>
                        <p className="text-blue-100">Заблокированные монеты участвуют в процессе проверки транзакций сети</p>
                      </div>
                      
                      <div className="bg-blue-950/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <span className="text-green-400 font-bold">3</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white">Вознаграждение</h4>
                        </div>
                        <p className="text-blue-100">Вы получаете вознаграждение в виде новых монет пропорционально вашему вкладу</p>
                      </div>
                      
                      <div className="bg-blue-950/50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <span className="text-green-400 font-bold">4</span>
                          </div>
                          <h4 className="text-lg font-semibold text-white">Вывод средств</h4>
                        </div>
                        <p className="text-blue-100">По окончании периода стейкинга вы получаете обратно свои монеты и заработанную прибыль</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Calculator */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Калькулятор доходности стейкинга</h2>
                    <p className="text-lg text-blue-100">
                      Рассчитайте потенциальный доход от стейкинга TON в Lucky Train
                    </p>
                  </div>
                  
                  <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-8 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <div className="mb-6">
                          <label className="block text-blue-100 mb-2">Сумма (TON)</label>
                          <input 
                            type="range" 
                            min="100" 
                            max="10000" 
                            step="100" 
                            value={amount} 
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between mt-2">
                            <span className="text-blue-200 text-sm">100 TON</span>
                            <span className="text-white font-semibold">{amount} TON</span>
                            <span className="text-blue-200 text-sm">10 000 TON</span>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <label className="block text-blue-100 mb-2">Период стейкинга (месяцев)</label>
                          <input 
                            type="range" 
                            min="1" 
                            max="36" 
                            step="1" 
                            value={period} 
                            onChange={(e) => setPeriod(Number(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between mt-2">
                            <span className="text-blue-200 text-sm">1 месяц</span>
                            <span className="text-white font-semibold">{period} месяцев</span>
                            <span className="text-blue-200 text-sm">36 месяцев</span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="py-3 px-4 bg-blue-950/60 rounded-lg mb-4">
                            <div className="flex justify-between">
                              <span className="text-blue-100">Годовой процент (APY):</span>
                              <span className="text-green-400 font-semibold">12%</span>
                            </div>
                          </div>
                          <div className="py-3 px-4 bg-blue-950/60 rounded-lg mb-4">
                            <div className="flex justify-between">
                              <span className="text-blue-100">Начальная сумма:</span>
                              <span className="text-white font-semibold">{amount} TON</span>
                            </div>
                          </div>
                          <div className="py-3 px-4 bg-blue-950/60 rounded-lg">
                            <div className="flex justify-between">
                              <span className="text-blue-100">Период стейкинга:</span>
                              <span className="text-white font-semibold">{period} месяцев</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-950 to-indigo-950 rounded-xl p-6">
                        <div className="text-center mb-6">
                          <p className="text-blue-100 mb-2">Ожидаемая прибыль:</p>
                          <div className="text-3xl font-bold text-green-400">
                            +{calculateReward()} TON
                          </div>
                          <p className="text-blue-300 text-sm mt-1">≈ 12% годовых</p>
                        </div>
                        
                        <div className="text-center mb-6">
                          <p className="text-blue-100 mb-2">Итоговая сумма:</p>
                          <div className="text-3xl font-bold text-white">
                            {(parseFloat(amount.toString()) + parseFloat(calculateReward())).toFixed(2)} TON
                          </div>
                        </div>
                        
                        <button 
                          onClick={async () => {
                            if (!isConnected) {
                              const connected = await tonConnector.connect();
                              setIsConnected(connected);
                              if (connected) setActiveSection('dashboard');
                            } else {
                              setActiveSection('dashboard');
                            }
                          }}
                          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-full font-semibold text-center hover:from-green-600 hover:to-teal-600 transition-all"
                        >
                          {isConnected ? 'Управление стейкингом' : 'Подключить кошелек'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeSection === 'dashboard' && (
          <section className="py-8">
            <UserStakingDashboard />
          </section>
        )}

        {activeSection === 'dex' && (
          <section className="py-8">
            <DexTrading />
          </section>
        )}

        {activeSection === 'education' && (
          <section className="py-8">
            <TradingEducation />
          </section>
        )}
      </div>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-indigo-900 to-blue-950">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Начните зарабатывать с Lucky Train уже сегодня
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Присоединяйтесь к тысячам пользователей, которые уже получают пассивный доход от стейкинга TON
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <button 
                onClick={async () => {
                  if (!isConnected) {
                    const connected = await tonConnector.connect();
                    setIsConnected(connected);
                    if (connected) setActiveSection('dashboard');
                  } else {
                    setActiveSection('dashboard');
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-green-600 hover:to-teal-600 transition-all"
              >
                {isConnected ? 'Мой кабинет' : 'Начать стейкинг'}
              </button>
              <Link 
                href="https://t.me/LuckyTrainTON" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-white/20 transition-all"
              >
                Telegram бот
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 