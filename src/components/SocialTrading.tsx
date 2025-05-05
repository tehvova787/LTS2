'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

// Типы данных для трейдеров
interface Trader {
  id: string
  name: string
  avatar: string
  profit: number
  followers: number
  winRate: number
  strategy: string
  position: number
  verified: boolean
  trades: {
    asset: string
    type: 'buy' | 'sell'
    profit: number
    date: string
  }[]
}

export default function SocialTrading() {
  const [activeTab, setActiveTab] = useState('leaderboard')
  const [selectedTrader, setSelectedTrader] = useState<string | null>(null)
  const [copyAmount, setCopyAmount] = useState('')
  
  // Имитация данных о трейдерах
  const traders: Trader[] = [
    {
      id: 'trader1',
      name: 'CryptoMaster',
      avatar: '/images/traders/avatar1.png',
      profit: 187.4,
      followers: 1245,
      winRate: 76,
      strategy: 'Долгосрочный стейкинг',
      position: 1,
      verified: true,
      trades: [
        { asset: 'TON', type: 'buy', profit: 12.5, date: '2023-05-10' },
        { asset: 'ETH', type: 'sell', profit: 8.3, date: '2023-05-08' },
        { asset: 'TON', type: 'buy', profit: 15.2, date: '2023-05-01' }
      ]
    },
    {
      id: 'trader2',
      name: 'BlockchainWhale',
      avatar: '/images/traders/avatar2.png',
      profit: 156.8,
      followers: 923,
      winRate: 72,
      strategy: 'Диверсификация активов',
      position: 2,
      verified: true,
      trades: [
        { asset: 'SOL', type: 'buy', profit: 14.2, date: '2023-05-09' },
        { asset: 'TON', type: 'buy', profit: 10.1, date: '2023-05-07' },
        { asset: 'ETH', type: 'sell', profit: 5.7, date: '2023-05-03' }
      ]
    },
    {
      id: 'trader3',
      name: 'SatoshiDisciple',
      avatar: '/images/traders/avatar3.png',
      profit: 132.1,
      followers: 754,
      winRate: 68,
      strategy: 'Активный трейдинг',
      position: 3,
      verified: false,
      trades: [
        { asset: 'ETH', type: 'buy', profit: 7.3, date: '2023-05-09' },
        { asset: 'TON', type: 'sell', profit: 4.8, date: '2023-05-06' },
        { asset: 'SOL', type: 'buy', profit: 11.5, date: '2023-05-02' }
      ]
    },
    {
      id: 'trader4',
      name: 'CryptoQueen',
      avatar: '/images/traders/avatar4.png',
      profit: 115.6,
      followers: 612,
      winRate: 65,
      strategy: 'DeFi инвестиции',
      position: 4,
      verified: true,
      trades: [
        { asset: 'TON', type: 'buy', profit: 9.2, date: '2023-05-08' },
        { asset: 'ETH', type: 'buy', profit: 6.7, date: '2023-05-05' },
        { asset: 'SOL', type: 'sell', profit: 3.9, date: '2023-05-01' }
      ]
    },
    {
      id: 'trader5',
      name: 'TokenWizard',
      avatar: '/images/traders/avatar5.png',
      profit: 98.3,
      followers: 485,
      winRate: 62,
      strategy: 'Стейкинг + DeFi',
      position: 5,
      verified: false,
      trades: [
        { asset: 'SOL', type: 'sell', profit: 5.1, date: '2023-05-07' },
        { asset: 'TON', type: 'buy', profit: 7.8, date: '2023-05-04' },
        { asset: 'ETH', type: 'buy', profit: 4.2, date: '2023-05-02' }
      ]
    }
  ]
  
  // Получение выбранного трейдера
  const activeTrader = traders.find(trader => trader.id === selectedTrader) || null
  
  return (
    <div className="mechanical-card p-6 relative">
      {/* Механические декоративные элементы */}
      <div className="absolute top-6 right-6 w-12 h-12 opacity-20">
        <div className="gear gear-medium animate-spin-slow"></div>
      </div>
      <div className="absolute bottom-6 left-6 w-10 h-10 opacity-20">
        <div className="gear gear-small animate-spin-slow"></div>
      </div>
      
      {/* Заголовок секции */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-green-500 mb-2">Социальный трейдинг</h2>
        <p className="text-green-600 max-w-3xl">
          Следите за лучшими трейдерами, изучайте их стратегии и копируйте их сделки автоматически.
          Станьте частью сообщества и повышайте свою прибыль вместе с профессионалами.
        </p>
      </motion.div>
      
      {/* Вкладки */}
      <div className="flex mb-6 space-x-4 border-b border-green-200 pb-2">
        {['leaderboard', 'my-follows', 'community'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg transition-all ${
              activeTab === tab 
                ? 'bg-green-100 text-green-600' 
                : 'text-green-400 hover:text-green-500'
            }`}
          >
            {tab === 'leaderboard' && 'Лидерборд'}
            {tab === 'my-follows' && 'Мои подписки'}
            {tab === 'community' && 'Сообщество'}
          </button>
        ))}
      </div>
      
      {/* Контент вкладки */}
      <div className="min-h-[400px]">
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            {/* Фильтры */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="relative">
                <select 
                  className="bg-green-50 border border-green-300 rounded-lg px-4 py-2 text-green-700 outline-none focus:border-green-500 appearance-none pr-10"
                  aria-label="Фильтр по стратегиям"
                  title="Фильтр по стратегиям"
                >
                  <option>Все стратегии</option>
                  <option>Долгосрочный стейкинг</option>
                  <option>Активный трейдинг</option>
                  <option>DeFi инвестиции</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <select 
                  className="bg-green-50 border border-green-300 rounded-lg px-4 py-2 text-green-700 outline-none focus:border-green-500 appearance-none pr-10"
                  aria-label="Фильтр по времени"
                  title="Фильтр по времени"
                >
                  <option>За все время</option>
                  <option>За месяц</option>
                  <option>За неделю</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </div>
              </div>
              
              <div className="ml-auto">
                <button 
                  className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-lg transition-all"
                  aria-label="Стать трейдером"
                >
                  Стать трейдером
                </button>
              </div>
            </div>
          
            {/* Список трейдеров */}
            <div className="space-y-4">
              {traders.map((trader, index) => (
                <motion.div
                  key={trader.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`mechanical-card p-4 cursor-pointer hover:border-turquoise/50 transition-all ${selectedTrader === trader.id ? 'border-2 border-primary-gold' : ''}`}
                  onClick={() => setSelectedTrader(trader.id)}
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 text-center mr-3">
                      <span className="text-lg font-bold text-black">
                        #{trader.position}
                      </span>
                    </div>
                    
                    <div className="flex-shrink-0 w-12 h-12 mr-4 relative">
                      <div className="bg-white rounded-full w-full h-full overflow-hidden border-2 border-gray-200">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
                      </div>
                      {trader.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-gray-500 rounded-full w-5 h-5 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className="text-xl text-black font-semibold">{trader.name}</h3>
                        <span className="ml-2 text-xs text-black">{trader.followers} подписчиков</span>
                      </div>
                      <p className="text-black text-sm">{trader.strategy}</p>
                    </div>
                    
                    <div className="flex-shrink-0 text-right">
                      <div className="text-xl font-bold text-black">+{trader.profit}%</div>
                      <div className="text-sm text-black">Win Rate: {trader.winRate}%</div>
                    </div>
                    
                    <div className="flex-shrink-0 ml-6">
                      <button 
                        className="px-4 py-2 bg-gray-200 text-black rounded-lg text-sm"
                        aria-label="Следить за трейдером"
                      >
                        Следить
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'my-follows' && (
          <div className="flex items-center justify-center h-64 border border-dashed border-green-300 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="gear gear-large animate-spin-slow opacity-30"></div>
              </div>
              <p className="text-green-500 mb-2">У вас пока нет подписок</p>
              <p className="text-green-600 text-sm mb-4">Выберите трейдеров из лидерборда, чтобы следить за ними</p>
              <button 
                onClick={() => setActiveTab('leaderboard')}
                className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                aria-label="Перейти к лидерборду"
              >
                Перейти к лидерборду
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'community' && (
          <div className="flex items-center justify-center h-64 border border-dashed border-green-300 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4">
                <div className="gear gear-large animate-spin-slow opacity-30"></div>
              </div>
              <p className="text-green-500 mb-2">Раздел сообщества</p>
              <p className="text-green-600 text-sm mb-4">Раздел находится в разработке и будет доступен в ближайшее время</p>
              <div className="inline-block relative overflow-hidden">
                <div className="h-1 bg-green-200 w-32 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 w-3/4"></div>
                </div>
                <span className="text-xs text-green-500 block mt-1">75% завершено</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Детальная информация о трейдере */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Профиль трейдера */}
        <div className="mechanical-card p-4">
          <h3 className="text-xl text-green-500 mb-4">Профиль трейдера</h3>
          
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 mr-4 relative">
              <div className="bg-white rounded-full w-full h-full overflow-hidden border-2 border-green-200">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-green-200"></div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
            </div>
            
            <div>
              <h4 className="text-2xl font-bold text-green-500">TokenWizard</h4>
              <div className="flex items-center text-green-600 text-sm">
                <span>#5 в рейтинге</span>
                <span className="mx-2">•</span>
                <span>485 подписчиков</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">+98.3%</div>
              <div className="text-xs text-green-500">Доходность</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">62%</div>
              <div className="text-xs text-green-500">Win Rate</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">3.1x</div>
              <div className="text-xs text-green-500">Множитель риска</div>
            </div>
          </div>
          
          <div className="mb-6">
            <h5 className="text-green-500 mb-2">Стратегия</h5>
            <p className="text-green-600">Стейкинг + DeFi</p>
          </div>
          
          <div className="flex space-x-3">
            <button 
              className="flex-1 px-4 py-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg font-semibold"
              aria-label="Подписаться на трейдера"
              title="Подписаться на трейдера"
            >
              Подписаться
            </button>
            <button 
              className="px-4 py-3 bg-green-50 border border-green-300 text-green-500 rounded-lg"
              aria-label="Поделиться профилем трейдера"
              title="Поделиться профилем трейдера"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Копи-трейдинг */}
        <div className="mechanical-card p-4">
          <h3 className="text-xl text-green-500 mb-4">Копи-трейдинг</h3>
          
          <p className="text-green-600 mb-4">
            Автоматически копируйте сделки TokenWizard и получайте прибыль вместе с профессионалом.
          </p>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-green-500 text-sm block mb-1">Сумма для копирования</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0.00" 
                  className="w-full bg-green-50 border border-green-300 rounded-lg px-4 py-3 text-green-700 outline-none focus:border-green-500"
                  value={copyAmount}
                  onChange={(e) => setCopyAmount(e.target.value)}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 font-semibold">
                  TON
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-green-500">
              <span>Минимальная сумма: 100 TON</span>
              <span>Комиссия: 2%</span>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-green-600">Предполагаемая доходность</span>
                <span className="text-green-600">~98.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-600">Обновление позиций</span>
                <span className="text-green-600">Автоматически</span>
              </div>
            </div>
          </div>
          
          <button 
            className="w-full bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-lg font-semibold mb-4"
            aria-label="Начать копирование сделок трейдера"
            title="Начать копирование сделок трейдера"
          >
            Начать копирование
          </button>
          
          <h4 className="text-green-500 mb-2">Последние сделки</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 border-b border-green-100 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-red-500"></div>
                <span className="text-green-600">Продажа SOL</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-green-500">+5.1%</span>
                <span className="text-green-400">2023-05-07</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 border-b border-green-100 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                <span className="text-green-600">Покупка TON</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-green-500">+7.8%</span>
                <span className="text-green-400">2023-05-04</span>
              </div>
            </div>
            <div className="flex justify-between items-center p-2 border-b border-green-100 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-500"></div>
                <span className="text-green-600">Покупка ETH</span>
              </div>
              <div className="flex items-center">
                <span className="mr-3 text-green-500">+4.2%</span>
                <span className="text-green-400">2023-05-02</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 