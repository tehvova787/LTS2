'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-blue-950">
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
              Обучение <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">трейдингу криптовалют</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              От основ до продвинутых стратегий — изучите искусство торговли на криптовалютных рынках
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/trading/basics" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
                Начать обучение
              </Link>
              <Link href="/trading/simulator" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all">
                Симулятор биржи
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Learning paths */}
      <section className="py-16 bg-indigo-950/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Учебные программы по уровням</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner */}
            <div className="bg-gradient-to-br from-blue-900/80 to-blue-950/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
              <div className="h-2 bg-gradient-to-r from-green-400 to-green-500"></div>
              <div className="p-6">
                <div className="text-green-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Начинающий</h3>
                <ul className="space-y-3 text-blue-100 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Основы криптовалют и блокчейна</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Типы криптовалютных бирж</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Как завести аккаунт и верификация</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Основные типы ордеров</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Безопасность и защита аккаунта</span>
                  </li>
                </ul>
                <Link href="/trading/basics" className="inline-block bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:from-green-500 hover:to-green-600 transition-all">
                  Начать курс
                </Link>
              </div>
            </div>
            
            {/* Intermediate */}
            <div className="bg-gradient-to-br from-blue-900/80 to-blue-950/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
              <div className="p-6">
                <div className="text-yellow-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Средний уровень</h3>
                <ul className="space-y-3 text-blue-100 mb-6">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>Анализ рыночных графиков</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>Технические индикаторы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>Торговые стратегии</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>Управление рисками</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">✓</span>
                    <span>Психология трейдинга</span>
                  </li>
                </ul>
                <Link href="/trading/intermediate" className="inline-block bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-6 py-2 rounded-full font-medium hover:from-yellow-500 hover:to-yellow-600 transition-all">
                  Начать курс
                </Link>
              </div>
            </div>
            
            {/* Advanced */}
            <div className="bg-gradient-to-br from-blue-900/80 to-blue-950/80 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
              <div className="h-2 bg-gradient-to-r from-red-400 to-red-500"></div>
              <div className="p-6">
                <div className="text-red-400 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Продвинутый</h3>
                <ul className="space-y-3 text-blue-100 mb-6">
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✓</span>
                    <span>Алгоритмическая торговля</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✓</span>
                    <span>Фьючерсы и опционы</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✓</span>
                    <span>Маржинальная торговля</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✓</span>
                    <span>Количественный анализ</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 mr-2">✓</span>
                    <span>Разработка собственных стратегий</span>
                  </li>
                </ul>
                <Link href="/trading/advanced" className="inline-block bg-gradient-to-r from-red-400 to-red-500 text-white px-6 py-2 rounded-full font-medium hover:from-red-500 hover:to-red-600 transition-all">
                  Начать курс
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trading simulator preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-indigo-900/30 backdrop-blur-md rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8 lg:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Симулятор трейдинга</h2>
                <p className="text-lg text-blue-100 mb-6">
                  Практикуйте торговлю криптовалютами в безопасной среде без риска потери реальных средств. Наш симулятор воспроизводит реальный интерфейс биржи и поведение рынка.
                </p>
                <ul className="space-y-3 text-blue-100 mb-8">
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>Реалистичные графики и данные</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>Разнообразные торговые пары</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>Виртуальные средства для практики</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal-400 mr-2">•</span>
                    <span>Аналитика ваших торговых результатов</span>
                  </li>
                </ul>
                <Link href="/trading/simulator" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold hover:from-teal-600 hover:to-cyan-600 transition-all">
                  Открыть симулятор
                </Link>
              </div>
              <div className="bg-gray-900 p-6 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p>[Симулятор трейдинга]</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-blue-950/70">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Часто задаваемые вопросы</h2>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">С чего лучше начать обучение трейдингу новичку?</h3>
              <p className="text-blue-100">
                Новичкам рекомендуется начать с изучения основ криптовалют и блокчейна, затем ознакомиться с работой бирж и типами ордеров. Важно также сразу изучить основы безопасности и правила управления рисками. Наш курс для начинающих последовательно проведет вас через все необходимые темы.
              </p>
            </div>
            
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Сколько нужно времени, чтобы научиться трейдингу?</h3>
              <p className="text-blue-100">
                Время обучения индивидуально и зависит от ваших усилий и предыдущего опыта. Базовые принципы можно освоить за несколько недель, но для развития практических навыков и глубокого понимания рынка может потребоваться несколько месяцев или даже лет регулярной практики. Важно постоянно учиться и адаптироваться к изменяющимся условиям рынка.
              </p>
            </div>
            
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Можно ли торговать на бирже без большого капитала?</h3>
              <p className="text-blue-100">
                Да, начать торговлю на криптовалютных биржах можно с минимальных сумм. Большинство бирж не имеют требований к минимальному депозиту, и вы можете покупать дробные части криптовалют. Однако важно помнить о комиссиях, которые могут съедать значительную часть прибыли при торговле очень маленькими суммами. Рекомендуется начинать с суммы, которую вы готовы потерять в процессе обучения.
              </p>
            </div>
            
            <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-3">Какие основные ошибки совершают начинающие трейдеры?</h3>
              <p className="text-blue-100">
                Типичные ошибки новичков включают: торговлю без четкого плана, использование слишком большого кредитного плеча, инвестирование средств, которые нельзя позволить себе потерять, пренебрежение управлением рисками, следование эмоциям вместо стратегии, отсутствие стоп-лоссов, и чрезмерная торговля (overtrading). Наши курсы помогут вам избежать этих и других распространенных ошибок.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Готовы начать свой путь трейдера?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Присоединяйтесь к нашему сообществу и получите доступ ко всем образовательным ресурсам и инструментам для успешной торговли
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/trading/basics" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all">
              Начать обучение
            </Link>
            <a href="https://t.me/LuckyTrainTON" target="_blank" rel="noopener noreferrer" className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all">
              Присоединиться к сообществу
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 