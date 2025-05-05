'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('social')
  
  // Sample data for the portfolio sections
  const socialPortfolioData = [
    { id: 1, name: 'CryptoMaster', profit: 187.4, followers: 1245, strategy: 'Долгосрочный стейкинг' },
    { id: 2, name: 'BlockchainWhale', profit: 156.8, followers: 923, strategy: 'Диверсификация активов' },
    { id: 3, name: 'SatoshiDisciple', profit: 132.1, followers: 754, strategy: 'Активный трейдинг' }
  ]
  
  const tradingPortfolioData = [
    { id: 1, asset: 'TON', amount: 1250, price: 5.67, value: 7087.50, change: 12.4 },
    { id: 2, asset: 'ETH', amount: 2.5, price: 3245.89, value: 8114.73, change: 8.2 },
    { id: 3, asset: 'BTC', amount: 0.25, price: 67890.45, value: 16972.61, change: -2.1 },
    { id: 4, asset: 'SOL', amount: 75, price: 124.56, value: 9342.00, change: 15.7 }
  ]
  
  const investmentPortfolioData = [
    { id: 1, name: 'Стейкинг TON', allocation: 40, apy: 12.5, value: 15000 },
    { id: 2, name: 'DeFi доходность', allocation: 25, apy: 8.3, value: 9375 },
    { id: 3, name: 'Валидаторы блокчейна', allocation: 20, apy: 10.2, value: 7500 },
    { id: 4, name: 'Торговые стратегии', allocation: 15, apy: 18.7, value: 5625 }
  ]
  
  // Calculate total values for portfolio
  const tradingTotal = tradingPortfolioData.reduce((sum, item) => sum + item.value, 0)
  const investmentTotal = investmentPortfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalValue = tradingTotal + investmentTotal
  
  return (
    <section id="portfolio" className="py-20 bg-space-dark relative stars">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Портфолио инвестора</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Управляйте своими инвестициями, отслеживайте доходность и используйте социальный трейдинг
            для достижения максимальных результатов
          </p>
        </motion.div>
        
        {/* Portfolio Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 mechanical-card p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl text-turquoise mb-2 font-semibold">Общая стоимость активов</h3>
              <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
              <div className="mt-3 text-green-400 text-sm">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  +12.4% за последний месяц
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl text-neon-pink mb-2 font-semibold">Активы в трейдинге</h3>
              <p className="text-3xl font-bold text-white">${tradingTotal.toLocaleString()}</p>
              <div className="mt-3 text-neon-pink text-sm">
                {((tradingTotal / totalValue) * 100).toFixed(1)}% от общего портфеля
              </div>
            </div>
            
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl text-primary-gold mb-2 font-semibold">Пассивные инвестиции</h3>
              <p className="text-3xl font-bold text-white">${investmentTotal.toLocaleString()}</p>
              <div className="mt-3 text-primary-gold text-sm">
                {((investmentTotal / totalValue) * 100).toFixed(1)}% от общего портфеля
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Portfolio Tabs */}
        <div className="mb-6 flex border-b border-white/20">
          <button
            onClick={() => setActiveTab('social')}
            className={`px-6 py-3 text-lg font-medium transition-all ${
              activeTab === 'social' 
                ? 'text-turquoise border-b-2 border-turquoise' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Социальный портфель
          </button>
          <button
            onClick={() => setActiveTab('trading')}
            className={`px-6 py-3 text-lg font-medium transition-all ${
              activeTab === 'trading' 
                ? 'text-neon-pink border-b-2 border-neon-pink' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Торговый портфель
          </button>
          <button
            onClick={() => setActiveTab('investment')}
            className={`px-6 py-3 text-lg font-medium transition-all ${
              activeTab === 'investment' 
                ? 'text-primary-gold border-b-2 border-primary-gold' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Инвестиционный портфель
          </button>
        </div>
        
        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {activeTab === 'social' && (
            <div className="mechanical-card p-6">
              <div className="mb-6">
                <h3 className="text-2xl text-turquoise mb-4">Социальный трейдинг</h3>
                <p className="text-white">
                  Следите за успешными трейдерами, изучайте их стратегии и копируйте их сделки.
                  Социальный трейдинг позволяет новичкам получать прибыль, следуя за опытными инвесторами.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white/60 text-sm px-4 py-2">
                  <span className="w-8">#</span>
                  <span className="flex-grow">Трейдер</span>
                  <span className="w-32 text-right">Прибыль</span>
                  <span className="w-32 text-right">Подписчики</span>
                  <span className="w-40 text-right">Стратегия</span>
                  <span className="w-24 text-right"></span>
                </div>
                
                {socialPortfolioData.map((trader, index) => (
                  <div 
                    key={trader.id}
                    className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm"
                  >
                    <span className="w-8 text-white/70">#{index + 1}</span>
                    <span className="flex-grow font-medium text-white">{trader.name}</span>
                    <span className="w-32 text-right text-green-400">+{trader.profit}%</span>
                    <span className="w-32 text-right text-white/80">{trader.followers.toLocaleString()}</span>
                    <span className="w-40 text-right text-white/80">{trader.strategy}</span>
                    <span className="w-24 text-right">
                      <button className="px-3 py-1 bg-turquoise/20 text-turquoise rounded text-sm hover:bg-turquoise/30 transition-all">
                        Подписаться
                      </button>
                    </span>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-center">
                  <button className="px-6 py-3 bg-turquoise text-black rounded-lg font-medium hover:bg-turquoise/90 transition-all">
                    Просмотреть все 500+ трейдеров
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'trading' && (
            <div className="mechanical-card p-6">
              <div className="mb-6">
                <h3 className="text-2xl text-neon-pink mb-4">Торговый портфель</h3>
                <p className="text-white">
                  Ваши активные торговые позиции на различных рынках. Отслеживайте текущую стоимость,
                  изменения и создавайте свои стратегии трейдинга.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-white/60 text-sm px-4 py-2">
                  <span className="w-20">Актив</span>
                  <span className="w-32 text-right">Количество</span>
                  <span className="w-32 text-right">Цена</span>
                  <span className="w-32 text-right">Стоимость</span>
                  <span className="w-32 text-right">Изменение 24ч</span>
                  <span className="w-24 text-right"></span>
                </div>
                
                {tradingPortfolioData.map((asset) => (
                  <div 
                    key={asset.id}
                    className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm"
                  >
                    <span className="w-20 font-medium text-white">{asset.asset}</span>
                    <span className="w-32 text-right text-white/80">{asset.amount.toLocaleString()}</span>
                    <span className="w-32 text-right text-white/80">${asset.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span className="w-32 text-right text-white">${asset.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <span className={`w-32 text-right ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? '+' : ''}{asset.change}%
                    </span>
                    <span className="w-24 text-right">
                      <button className="px-3 py-1 bg-neon-pink/20 text-neon-pink rounded text-sm hover:bg-neon-pink/30 transition-all">
                        Торговать
                      </button>
                    </span>
                  </div>
                ))}
                
                <div className="mt-6 flex justify-end">
                  <div className="bg-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
                    <div className="text-white/70 mb-1">Общая стоимость:</div>
                    <div className="text-2xl font-bold text-white">${tradingTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center space-x-4">
                  <button className="px-6 py-3 bg-neon-pink text-white rounded-lg font-medium hover:bg-neon-pink/90 transition-all">
                    Пополнить
                  </button>
                  <button className="px-6 py-3 border border-neon-pink text-neon-pink rounded-lg font-medium hover:bg-neon-pink/10 transition-all">
                    Вывести
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'investment' && (
            <div className="mechanical-card p-6">
              <div className="mb-6">
                <h3 className="text-2xl text-primary-gold mb-4">Инвестиционный портфель</h3>
                <p className="text-white">
                  Долгосрочные инвестиции для пассивного дохода. Диверсифицируйте свой портфель
                  и получайте стабильную доходность с минимальным риском.
                </p>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-center text-white/60 text-sm px-4 py-2">
                    <span className="flex-grow">Инвестиция</span>
                    <span className="w-24 text-right">Доля</span>
                    <span className="w-24 text-right">APY</span>
                    <span className="w-32 text-right">Стоимость</span>
                  </div>
                  
                  {investmentPortfolioData.map((investment) => (
                    <div 
                      key={investment.id}
                      className="flex justify-between items-center bg-white/10 rounded-lg px-4 py-3 backdrop-blur-sm"
                    >
                      <span className="flex-grow font-medium text-white">{investment.name}</span>
                      <span className="w-24 text-right text-white/80">{investment.allocation}%</span>
                      <span className="w-24 text-right text-green-400">{investment.apy}%</span>
                      <span className="w-32 text-right text-white">${investment.value.toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <div className="mt-6 flex justify-end">
                    <div className="bg-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
                      <div className="text-white/70 mb-1">Всего инвестировано:</div>
                      <div className="text-2xl font-bold text-white">${investmentTotal.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 bg-white/10 rounded-lg p-6 backdrop-blur-sm flex flex-col">
                  <h4 className="text-xl text-primary-gold mb-4">Распределение портфеля</h4>
                  
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="w-full h-8 bg-white/20 rounded-full overflow-hidden mb-6">
                      {investmentPortfolioData.map((investment, index) => {
                        const prevAllocation = investmentPortfolioData
                          .slice(0, index)
                          .reduce((sum, item) => sum + item.allocation, 0);
                        
                        return (
                          <div 
                            key={investment.id}
                            className={`h-full ${getColorClass(index)} ${index === 0 ? '' : `ml-[${prevAllocation}%]`} w-[${investment.allocation}%]`}
                          ></div>
                        );
                      })}
                    </div>
                    
                    <div className="space-y-2">
                      {investmentPortfolioData.map((investment, index) => (
                        <div key={investment.id} className="flex items-center">
                          <div className={`w-4 h-4 rounded-full mr-2 ${getColorClass(index)}`}></div>
                          <span className="text-white">{investment.name}</span>
                          <span className="ml-auto text-white">{investment.allocation}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button className="w-full px-6 py-3 bg-primary-gold text-black rounded-lg font-medium hover:bg-primary-gold/90 transition-all">
                      Оптимизировать портфель
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function getColorClass(index: number) {
  const colors = [
    'bg-primary-gold',
    'bg-neon-pink',
    'bg-turquoise',
    'bg-neon-purple'
  ]
  return colors[index % colors.length]
} 