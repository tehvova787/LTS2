'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

type ExchangeType = {
  name: string;
  logo: string;
  description: string;
  features: string[];
  link: string;
};

const popularExchanges: ExchangeType[] = [
  {
    name: "Binance",
    logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=024",
    description: "Крупнейшая в мире криптовалютная биржа с широким выбором монет и инструментов для торговли.",
    features: ["Огромная ликвидность", "Низкие комиссии", "Множество торговых пар", "Удобный интерфейс"],
    link: "https://binance.com",
  },
  {
    name: "Bybit",
    logo: "https://cryptologos.cc/logos/bybit-logo.svg?v=024",
    description: "Популярная биржа с акцентом на деривативы и удобный интерфейс для пользователей.",
    features: ["Производные инструменты", "Высокая ликвидность", "Удобная мобильная версия", "Низкие комиссии"],
    link: "https://bybit.com",
  },
  {
    name: "OKX",
    logo: "https://cryptologos.cc/logos/okb-okb-logo.svg?v=024",
    description: "Глобальная криптовалютная биржа, предлагающая расширенные торговые инструменты.",
    features: ["Спотовая и фьючерсная торговля", "Широкий выбор монет", "Маржинальная торговля", "Высокая безопасность"],
    link: "https://okx.com",
  },
  {
    name: "Coinbase",
    logo: "https://cryptologos.cc/logos/coinbase-coin-coin-logo.svg?v=024",
    description: "Одна из самых дружелюбных к новичкам бирж с высоким уровнем безопасности.",
    features: ["Простой интерфейс", "Высокая безопасность", "Регулируемая платформа", "Простое пополнение счета"],
    link: "https://coinbase.com",
  },
];

export default function ExchangePage() {
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
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Криптовалютные биржи
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl text-blue-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Изучите основы работы с криптовалютными биржами: от регистрации до совершения успешных сделок
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/exchange/guide" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
                Руководство по биржам
              </Link>
              <Link href="/trading/simulator" className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all">
                Попробовать симулятор
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction to exchanges section */}
      <section className="py-16 bg-indigo-950/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Что такое криптовалютная биржа?</h2>
              <p className="text-lg text-blue-100 mb-4">
                Криптовалютная биржа — это платформа, которая позволяет покупать, продавать и обменивать криптовалюты. Биржи работают как посредники между покупателями и продавцами, обеспечивая ликвидность и безопасность транзакций.
              </p>
              <p className="text-lg text-blue-100 mb-6">
                На современных биржах можно торговать множеством криптовалют, использовать различные инструменты для анализа рынка и применять разные торговые стратегии.
              </p>
              <h3 className="text-xl font-semibold text-white mb-4">Типы криптовалютных бирж:</h3>
              <div className="space-y-4">
                <div className="bg-blue-900/30 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Централизованные биржи (CEX)</h4>
                  <p className="text-blue-100 text-sm">Управляются компаниями, требуют верификации, имеют высокую ликвидность</p>
                </div>
                <div className="bg-blue-900/30 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Децентрализованные биржи (DEX)</h4>
                  <p className="text-blue-100 text-sm">Работают на блокчейне без посредников, обеспечивают большую конфиденциальность</p>
                </div>
                <div className="bg-blue-900/30 backdrop-blur-sm p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Гибридные биржи</h4>
                  <p className="text-blue-100 text-sm">Сочетают преимущества централизованных и децентрализованных платформ</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-900/30 backdrop-blur-md rounded-xl p-8 shadow-xl">
              <div className="text-center mb-6">
                <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Как выбрать биржу</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-950/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Безопасность</h4>
                  <p className="text-blue-100 text-sm">История безопасности, защита средств, двухфакторная аутентификация</p>
                </div>
                <div className="bg-blue-950/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Комиссии</h4>
                  <p className="text-blue-100 text-sm">Комиссии за торговлю, депозит и вывод средств</p>
                </div>
                <div className="bg-blue-950/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Ликвидность</h4>
                  <p className="text-blue-100 text-sm">Объем торгов и глубина рынка для интересующих вас криптовалют</p>
                </div>
                <div className="bg-blue-950/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Доступные криптовалюты</h4>
                  <p className="text-blue-100 text-sm">Разнообразие торговых пар и поддерживаемых монет</p>
                </div>
                <div className="bg-blue-950/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-1">Регулирование</h4>
                  <p className="text-blue-100 text-sm">Соответствие законодательству вашей страны и общие юридические аспекты</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular exchanges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Популярные криптовалютные биржи</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularExchanges.map((exchange, index) => (
              <motion.div 
                key={exchange.name}
                className="bg-blue-900/30 backdrop-blur-md rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-full p-2 mr-4 flex items-center justify-center">
                    <img 
                      src={exchange.logo} 
                      alt={exchange.name} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">{exchange.name}</h3>
                </div>
                <p className="text-blue-100 mb-4">{exchange.description}</p>
                <ul className="space-y-2 mb-6">
                  {exchange.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-blue-400 mr-2">✓</span>
                      <span className="text-blue-100 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={exchange.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Посетить сайт →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting started steps */}
      <section className="py-16 bg-indigo-950/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Как начать работу на бирже</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-600 hidden md:block"></div>
              
              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold z-10 mb-4 md:mb-0">
                      1
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-white mb-3">Выберите биржу и зарегистрируйтесь</h3>
                      <div className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-xl">
                        <p className="text-blue-100 mb-3">
                          Выберите подходящую биржу исходя из ваших потребностей, создайте аккаунт, указав email и установив надежный пароль.
                        </p>
                        <div className="bg-blue-950/50 p-3 rounded-lg text-sm text-blue-100">
                          <strong className="text-white">Совет:</strong> Используйте уникальный надежный пароль и сразу активируйте двухфакторную аутентификацию для защиты вашего аккаунта.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold z-10 mb-4 md:mb-0">
                      2
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-white mb-3">Пройдите верификацию (KYC)</h3>
                      <div className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-xl">
                        <p className="text-blue-100 mb-3">
                          Большинство бирж требуют верификацию личности для соответствия нормативным требованиям. Подготовьте удостоверение личности, подтверждение адреса и сделайте селфи, если требуется.
                        </p>
                        <div className="bg-blue-950/50 p-3 rounded-lg text-sm text-blue-100">
                          <strong className="text-white">Совет:</strong> Процесс верификации может занять от нескольких минут до нескольких дней в зависимости от биржи и загруженности их системы.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold z-10 mb-4 md:mb-0">
                      3
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-white mb-3">Пополните счет</h3>
                      <div className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-xl">
                        <p className="text-blue-100 mb-3">
                          Внесите средства на биржу, используя банковский перевод, кредитную карту или перевод криптовалюты с другого кошелька.
                        </p>
                        <div className="bg-blue-950/50 p-3 rounded-lg text-sm text-blue-100">
                          <strong className="text-white">Совет:</strong> Начните с небольшой суммы, чтобы ознакомиться с процессом. Разные методы пополнения имеют разные комиссии и сроки зачисления.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold z-10 mb-4 md:mb-0">
                      4
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-white mb-3">Изучите интерфейс и начните торговлю</h3>
                      <div className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-xl">
                        <p className="text-blue-100 mb-3">
                          Ознакомьтесь с интерфейсом биржи, разберитесь с типами ордеров и начните торговать, начиная с простых рыночных ордеров.
                        </p>
                        <div className="bg-blue-950/50 p-3 rounded-lg text-sm text-blue-100">
                          <strong className="text-white">Совет:</strong> Используйте наш симулятор или демо-режим биржи, чтобы практиковаться без риска потери реальных средств.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 5 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold z-10 mb-4 md:mb-0">
                      5
                    </div>
                    <div className="md:ml-8">
                      <h3 className="text-xl font-bold text-white mb-3">Обеспечьте безопасность ваших активов</h3>
                      <div className="bg-blue-900/30 backdrop-blur-sm p-5 rounded-xl">
                        <p className="text-blue-100 mb-3">
                          Настройте дополнительные меры безопасности и рассмотрите возможность хранения долгосрочных инвестиций на аппаратном кошельке.
                        </p>
                        <div className="bg-blue-950/50 p-3 rounded-lg text-sm text-blue-100">
                          <strong className="text-white">Совет:</strong> Помните принцип "не ваши ключи - не ваши монеты". Храните на бирже только те средства, которыми активно торгуете.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety tips */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 backdrop-blur-md rounded-xl p-8 shadow-xl">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="text-red-400 mr-6 mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Правила безопасности при работе с биржами</h2>
                <p className="text-lg text-blue-100">
                  Защитите свои средства и данные, следуя этим важным рекомендациям
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-950/50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Используйте надежные пароли</h3>
                <p className="text-blue-100">
                  Создавайте сложные пароли длиной не менее 12 символов, содержащие буквы, цифры и специальные символы. Используйте разные пароли для разных бирж.
                </p>
              </div>
              
              <div className="bg-blue-950/50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Включите двухфакторную аутентификацию</h3>
                <p className="text-blue-100">
                  Всегда используйте 2FA для дополнительного уровня защиты. Предпочтительно использовать аппаратные ключи или приложения для аутентификации, а не SMS.
                </p>
              </div>
              
              <div className="bg-blue-950/50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Проверяйте адреса при выводе средств</h3>
                <p className="text-blue-100">
                  Всегда дважды проверяйте адреса назначения при выводе криптовалюты. Отправка на неправильный адрес обычно означает безвозвратную потерю средств.
                </p>
              </div>
              
              <div className="bg-blue-950/50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Будьте осторожны с фишинговыми сайтами</h3>
                <p className="text-blue-100">
                  Всегда проверяйте URL-адрес биржи и используйте закладки для доступа к официальным сайтам. Не переходите по ссылкам из подозрительных писем или сообщений.
                </p>
              </div>
              
              <div className="bg-blue-950/50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Используйте холодные кошельки</h3>
                <p className="text-blue-100">
                  Храните большую часть своих криптоактивов в холодных (аппаратных) кошельках, а на бирже держите только те средства, которыми активно торгуете.
                </p>
              </div>
              
              <div className="bg-blue-950/50 p-5 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Регулярно проверяйте активность аккаунта</h3>
                <p className="text-blue-100">
                  Следите за активностью вашего аккаунта и настройте уведомления о входе и транзакциях. Немедленно сообщайте о подозрительной активности в службу поддержки.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-b from-indigo-900 to-blue-950">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">
              Готовы начать торговлю на бирже?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Изучайте, практикуйтесь и развивайте свои навыки с помощью наших образовательных ресурсов
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/trading/simulator" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all">
                Попробовать симулятор
              </Link>
              <Link href="/ai-assistant" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-white/20 transition-all">
                Задать вопрос AI-ассистенту
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 