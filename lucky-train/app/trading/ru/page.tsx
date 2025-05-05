'use client'

import { motion } from 'framer-motion'

export default function RussianTradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-white">
      {/* Hero section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-black mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Курсы по трейдингу и инвестициям для начинающих и продвинутых трейдеров. Научитесь торговать как профессионал.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Interactive Platform Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Интерактивная игровая платформа</h2>
              <p className="text-lg text-black mb-4">
                Интерактивная игровая платформа для торговли криптовалютами. Получите опыт трейдинга в безопасной среде.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-black">Инвестируйте в стейкинг TON</h3>
                <p className="text-lg text-black mt-2">Получайте пассивный доход. Профессиональная платформа с высоким уровнем безопасности.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-lg text-black mb-2">Всего в стейкинге</h3>
                <p className="text-3xl font-bold text-black">$15 750 000</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-lg text-black mb-2">Прогнозируемый годовой доход</h3>
                <p className="text-3xl font-bold text-black">12.5%</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-lg text-black mb-2">Средний дневной возврат</h3>
                <p className="text-3xl font-bold text-black">0.66%</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-xl">
                <h3 className="text-lg text-black mb-2">Уверенность</h3>
                <p className="text-3xl font-bold text-black">87%</p>
                <p className="text-sm text-black">Положительный тренд TON в последние 7 дней</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <h3 className="text-2xl font-bold text-black mb-6">Увеличить стейкинг</h3>
              <button className="bg-gray-200 text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all">
                Инвестировать
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Multichain Support */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Поддержка Мультичейн</h2>
            <p className="text-lg text-black">
              Lucky Train интегрируется с ведущими блокчейн-платформами для максимальной гибкости и эффективности
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center shadow-xl">
              <p className="text-xl font-bold text-black">TON</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-xl">
              <p className="text-xl font-bold text-black">Ethereum</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-xl">
              <p className="text-xl font-bold text-black">Solana</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-xl">
              <p className="text-xl font-bold text-black">BNB Chain</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-xl">
              <p className="text-xl font-bold text-black">Polygon</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-xl">
              <p className="text-xl font-bold text-black">Avalanche</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Traders */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Топ Трейдеры</h2>
              <p className="text-lg text-black">
                Следите за лучшими трейдерами и изучайте их стратегии
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-black font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black">CryptoMaster</h4>
                    <p className="text-sm text-black">1245 подписчиков</p>
                    <p className="text-xs text-black">Долгосрочный стейкинг</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-black">+187.4%</p>
                  <p className="text-sm text-black">Win Rate: 76%</p>
                  <button className="mt-1 px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-gray-300 transition-all">
                    Следить
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-black font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black">BlockchainWhale</h4>
                    <p className="text-sm text-black">923 подписчиков</p>
                    <p className="text-xs text-black">Диверсификация активов</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-black">+156.8%</p>
                  <p className="text-sm text-black">Win Rate: 72%</p>
                  <button className="mt-1 px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-gray-300 transition-all">
                    Следить
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-black font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black">SatoshiDisciple</h4>
                    <p className="text-sm text-black">754 подписчиков</p>
                    <p className="text-xs text-black">Активный трейдинг</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-black">+132.1%</p>
                  <p className="text-sm text-black">Win Rate: 68%</p>
                  <button className="mt-1 px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-gray-300 transition-all">
                    Следить
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-black font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black">CryptoQueen</h4>
                    <p className="text-sm text-black">612 подписчиков</p>
                    <p className="text-xs text-black">DeFi инвестиции</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-black">+115.6%</p>
                  <p className="text-sm text-black">Win Rate: 65%</p>
                  <button className="mt-1 px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-gray-300 transition-all">
                    Следить
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-xl">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                    <span className="text-black font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-black">TokenWizard</h4>
                    <p className="text-sm text-black">485 подписчиков</p>
                    <p className="text-xs text-black">Стейкинг + DeFi</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-black">+98.3%</p>
                  <p className="text-sm text-black">Win Rate: 62%</p>
                  <button className="mt-1 px-3 py-1 bg-gray-200 text-black text-sm rounded-full hover:bg-gray-300 transition-all">
                    Следить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">
              Наша платформа обеспечивает безопасность, прозрачность и высокую доходность для всех инвесторов
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center shadow-xl">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Стабильный доход</h3>
              <p className="text-black">
                Стабильный пассивный доход с еженедельными выплатами на ваш кошелек.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-xl">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Прозрачность</h3>
              <p className="text-black">
                Все транзакции записываются в блокчейн и доступны для проверки в любое время.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-xl">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Безопасность</h3>
              <p className="text-black">
                Ваши средства защищены передовыми технологиями шифрования и мультиподписью.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-6">
              Начните зарабатывать на своих криптоактивах уже сегодня. Инвестирование в стейкинг TON еще никогда не было таким простым и надежным.
            </h2>
            <button className="bg-gray-200 text-black px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-300 transition-all">
              Начать инвестирование
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}