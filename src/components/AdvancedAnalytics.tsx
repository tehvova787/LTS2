'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import '../styles/advancedAnalytics.css'

// Типы данных для аналитики
interface AnalyticsData {
  dailyReturns: number[]
  totalStaked: number
  projectedAnnualReturn: number
  marketTrends: { date: string; value: number }[]
  aiRecommendations: {
    action: string
    confidence: number
    reason: string
  }[]
}

// Компонент продвинутой аналитики
export default function AdvancedAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('week')

  // Имитация загрузки данных с сервера
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      // В реальном приложении здесь будет API-запрос
      setTimeout(() => {
        setData({
          dailyReturns: [0.5, 0.7, 0.4, 0.9, 0.6, 0.8, 0.7],
          totalStaked: 15750000,
          projectedAnnualReturn: 12.5,
          marketTrends: [
            { date: '01.05', value: 100 },
            { date: '02.05', value: 105 },
            { date: '03.05', value: 103 },
            { date: '04.05', value: 110 },
            { date: '05.05', value: 115 },
            { date: '06.05', value: 112 },
            { date: '07.05', value: 118 },
          ],
          aiRecommendations: [
            {
              action: 'Увеличить стейкинг',
              confidence: 87,
              reason: 'Положительный тренд TON в последние 7 дней'
            },
            {
              action: 'Диверсифицировать активы',
              confidence: 75,
              reason: 'Высокая волатильность рынка'
            },
            {
              action: 'Переждать коррекцию',
              confidence: 62,
              reason: 'Технические индикаторы указывают на краткосрочную коррекцию'
            }
          ]
        })
        setLoading(false)
      }, 1000)
    }
    
    fetchData()
  }, [timeframe])

  // Переключение временного интервала
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
  }

  if (loading) {
    return (
      <div className="min-h-[500px] flex items-center justify-center">
        <div className="loader">
          <div className="gear gear-medium animate-spin"></div>
          <p className="mt-4 text-turquoise">Загрузка аналитики...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard p-6 mechanical-card relative">
      {/* Заголовок панели */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-bold text-gradient mb-2">Продвинутая аналитика</h2>
        <p className="text-turquoise/80">Персонализированный анализ ваших инвестиций и рекомендации</p>
      </motion.div>

      {/* Навигация по вкладкам */}
      <div className="flex mb-6 space-x-4 border-b border-turquoise/20 pb-2">
        {['overview', 'performance', 'recommendations', 'market'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg transition-all ${
              activeTab === tab 
                ? 'bg-turquoise/20 text-primary-gold' 
                : 'text-turquoise/60 hover:text-turquoise'
            }`}
          >
            {tab === 'overview' && 'Обзор'}
            {tab === 'performance' && 'Производительность'}
            {tab === 'recommendations' && 'ИИ-рекомендации'}
            {tab === 'market' && 'Рыночные тренды'}
          </button>
        ))}
      </div>

      {/* Временные рамки */}
      <div className="flex space-x-2 mb-6">
        {['day', 'week', 'month', 'year', 'all'].map(period => (
          <button
            key={period}
            onClick={() => handleTimeframeChange(period)}
            className={`px-3 py-1 text-sm rounded-full ${
              timeframe === period
                ? 'bg-primary-gold text-space-dark'
                : 'bg-turquoise/10 text-turquoise/80 hover:bg-turquoise/20'
            }`}
          >
            {period === 'day' && 'День'}
            {period === 'week' && 'Неделя'}
            {period === 'month' && 'Месяц'}
            {period === 'year' && 'Год'}
            {period === 'all' && 'Всё время'}
          </button>
        ))}
      </div>

      {/* Контент вкладки */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Ключевые метрики */}
            <div className="mechanical-card p-4 analytics-card">
              <h3 className="text-xl mb-3 analytics-title">Ключевые метрики</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="analytics-text">Всего в стейкинге</span>
                  <span className="text-2xl analytics-bold-text">${data.totalStaked.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="analytics-text">Прогнозируемый годовой доход</span>
                  <span className="text-2xl analytics-bold-text">{data.projectedAnnualReturn}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="analytics-text">Средний дневной возврат</span>
                  <span className="text-2xl analytics-bold-text">
                    {(data.dailyReturns.reduce((a, b) => a + b, 0) / data.dailyReturns.length).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>

            {/* График доходности */}
            <div className="mechanical-card p-4 analytics-card">
              <h3 className="text-xl mb-3 analytics-title">Доходность за {timeframe === 'day' ? 'день' : timeframe === 'week' ? 'неделю' : timeframe === 'month' ? 'месяц' : 'год'}</h3>
              <div className="h-40 flex items-end space-x-1">
                {data.dailyReturns.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className={`w-full analytics-chart-bar ${value * 40 <= 40 ? `height-${value * 40}px` : 'height-40px'}`}
                    ></div>
                    <span className="text-xs mt-1 analytics-text">{data.marketTrends[index].date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ИИ-рекомендации */}
            <div className="mechanical-card p-4 col-span-1 md:col-span-2 analytics-card">
              <h3 className="text-xl mb-3 analytics-title">Главная рекомендация ИИ</h3>
              <div className="p-4 rounded-lg border border-gray-300 analytics-recommendation-card">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full mr-3 flex items-center justify-center analytics-ai-avatar">
                    <span className="text-lg analytics-bold-text">ИИ</span>
                  </div>
                  <div>
                    <h4 className="text-xl mb-2 analytics-bold-text">{data.aiRecommendations[0].action}</h4>
                    <div className="flex items-center">
                      <span className="text-sm analytics-text">Уверенность: </span>
                      <div className="ml-2 h-2 w-24 rounded-full overflow-hidden analytics-progress-bg">
                        <div 
                          className={`h-full analytics-progress-fill progress-bar progress-width-${data.aiRecommendations[0].confidence}`}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm analytics-text">{data.aiRecommendations[0].confidence}%</span>
                    </div>
                  </div>
                </div>
                <p className="analytics-text">{data.aiRecommendations[0].reason}</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'recommendations' && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h3 className="text-xl text-turquoise mb-3">Персонализированные ИИ-рекомендации</h3>
            
            {data.aiRecommendations.map((rec, index) => (
              <div key={index} className="mechanical-card p-4 border-l-4 border-primary-gold">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl text-primary-gold mb-2">{rec.action}</h4>
                    <p className="text-white/80">{rec.reason}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-turquoise text-sm mb-1">Уверенность</span>
                    <span className="text-2xl text-primary-gold">{rec.confidence}%</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-turquoise/20 text-turquoise rounded-lg hover:bg-turquoise/30 transition-all">
                    Применить стратегию
                  </button>
                </div>
              </div>
            ))}

            <div className="p-4 border border-dashed border-turquoise/30 rounded-lg mt-6">
              <h3 className="text-xl text-turquoise mb-2">Персональный ИИ-ассистент</h3>
              <p className="text-white/80 mb-4">Задайте вопрос о ваших инвестициях и получите детальный анализ</p>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Например: Стоит ли мне увеличить стейкинг TON?" 
                  className="flex-1 bg-space-dark/50 border border-turquoise/30 rounded-l-lg px-4 py-2 text-white outline-none focus:border-turquoise"
                />
                <button className="bg-gradient-to-r from-turquoise to-neon-pink text-white px-4 py-2 rounded-r-lg">
                  Спросить
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'performance' && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl text-turquoise mb-3">Детальный анализ производительности</h3>
            
            {/* Здесь будет подробный интерактивный график */}
            <div className="mechanical-card p-4 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4">
                  <div className="gear gear-large animate-spin-slow"></div>
                </div>
                <p className="text-turquoise">Интерактивные графики в разработке</p>
                <p className="text-white/60 text-sm mt-2">Будут доступны в следующем обновлении</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="mechanical-card p-4">
                <h4 className="text-lg text-turquoise mb-2">ROI</h4>
                <div className="flex items-end justify-between">
                  <span className="text-3xl text-primary-gold">+8.5%</span>
                  <span className="text-green-500 text-sm">▲ 1.2%</span>
                </div>
              </div>
              <div className="mechanical-card p-4">
                <h4 className="text-lg text-turquoise mb-2">Волатильность</h4>
                <div className="flex items-end justify-between">
                  <span className="text-3xl text-primary-gold">Низкая</span>
                  <span className="text-green-500 text-sm">▼ 0.5%</span>
                </div>
              </div>
              <div className="mechanical-card p-4">
                <h4 className="text-lg text-turquoise mb-2">Риск-рейтинг</h4>
                <div className="flex items-end justify-between">
                  <span className="text-3xl text-primary-gold">AA</span>
                  <span className="text-yellow-500 text-sm">◆ Стабильный</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'market' && data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h3 className="text-xl text-turquoise mb-3">Рыночные тренды и анализ</h3>
            
            {/* Рыночный график */}
            <div className="mechanical-card p-4 h-64 relative">
              <div className="absolute inset-0 flex items-end p-4">
                {data.marketTrends.map((point, index) => (
                  <div 
                    key={index} 
                    className="flex-1 flex flex-col items-center"
                  >
                    <div 
                      className={`w-full analytics-market-bar ${point.value * 40 <= 40 ? `height-${point.value * 40}px` : 'height-40px'} margin-top-auto`}
                    ></div>
                    <span className="text-xs text-turquoise/60 mt-1">{point.date}</span>
                  </div>
                ))}
              </div>
              
              {/* Линия тренда */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline
                  points={data.marketTrends.map((point, index) => {
                    const x = (index / (data.marketTrends.length - 1)) * 100
                    const y = 100 - ((point.value - 100) * 2)
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Рыночные индикаторы */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mechanical-card p-4">
                <h4 className="text-lg text-turquoise mb-2">Рыночный сентимент</h4>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Страх и жадность</span>
                  <div className="flex items-center">
                    <div className="h-2 w-32 bg-turquoise/30 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 progress-bar progress-width-65`}
                      ></div>
                    </div>
                    <span className="ml-2 text-yellow-500">65 - Жадность</span>
                  </div>
                </div>
              </div>
              <div className="mechanical-card p-4">
                <h4 className="text-lg text-turquoise mb-2">Активность сети TON</h4>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Транзакции/день</span>
                  <span className="text-primary-gold">1.2M</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-white/80">Активные кошельки</span>
                  <span className="text-primary-gold">850K</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Механические элементы декора */}
      <div className="absolute top-6 right-6 w-12 h-12 opacity-30">
        <div className="gear gear-medium animate-spin-slow"></div>
      </div>
      <div className="absolute bottom-6 left-6 w-10 h-10 opacity-30">
        <div className="gear gear-small animate-spin-slow"></div>
      </div>
    </div>
  )
} 