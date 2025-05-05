'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type SuggestedQuestion = {
  id: string;
  text: string;
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ваш AI-ассистент по вопросам криптовалют, трейдинга, стейкинга и работы на биржах. Что вы хотели бы узнать?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const suggestedQuestions: SuggestedQuestion[] = [
    { id: '1', text: 'Что такое стейкинг и как он работает?' },
    { id: '2', text: 'Как начать торговать на бирже?' },
    { id: '3', text: 'Какие основные стратегии трейдинга существуют?' },
    { id: '4', text: 'Что такое ордера и какие их типы?' },
    { id: '5', text: 'Как анализировать графики криптовалют?' },
    { id: '6', text: 'Что такое DeFi и как использовать децентрализованные финансы?' },
  ];

  // Simulated AI responses
  const aiResponses: Record<string, string> = {
    'что такое стейкинг и как он работает?': `
      Стейкинг - это способ заработка на криптовалютах, работающих на алгоритме Proof-of-Stake (PoS). 
      
      Вот как это работает:
      
      1. Вы блокируете (стейкаете) определенное количество монет в кошельке или на платформе.
      2. Эти монеты участвуют в процессе валидации транзакций в сети.
      3. За предоставление своих монет для обеспечения работы сети вы получаете вознаграждение в виде дополнительных монет.
      
      Преимущества стейкинга:
      • Пассивный доход (обычно от 5% до 20% годовых)
      • Более энергоэффективен, чем майнинг
      • Не требует специального оборудования
      
      В Lucky Train мы предлагаем удобный стейкинг TON с годовой доходностью около 12%.
      
      Хотите узнать больше о том, как начать стейкинг с нами?
    `,
    'как начать торговать на бирже?': `
      Чтобы начать торговать на криптобирже, следуйте этим шагам:
      
      1. Выберите надежную биржу с хорошей репутацией (Binance, Coinbase, Kraken, Bybit и др.)
      2. Создайте аккаунт и пройдите верификацию личности (KYC)
      3. Обеспечьте безопасность аккаунта (сложный пароль, двухфакторная аутентификация)
      4. Пополните счет удобным способом (банковский перевод, карта, электронные деньги)
      5. Начните с изучения интерфейса биржи и базовых типов ордеров (рыночный, лимитный)
      6. Определите бюджет для торговли и стратегию управления рисками
      7. Начните с небольших сумм и простых торговых пар
      
      Важно помнить:
      • Не инвестируйте больше, чем готовы потерять
      • Изучите основы технического и фундаментального анализа
      • Начните с демо-счета или небольших сумм
      
      У нас есть подробный курс "Основы трейдинга" для начинающих. Интересует?
    `,
    'какие основные стратегии трейдинга существуют?': `
      Основные стратегии трейдинга криптовалют:
      
      1. Дневной трейдинг (Day Trading)
      • Открытие и закрытие позиций в течение одного дня
      • Требует активного анализа рынка и быстрых решений
      
      2. Скальпинг (Scalping)
      • Сверхкраткосрочная торговля с маленькой прибылью, но большим количеством сделок
      • Требует отличной реакции и низких комиссий
      
      3. Свинг-трейдинг (Swing Trading)
      • Удержание позиций от нескольких дней до недель
      • Использует более широкие ценовые движения
      
      4. Позиционная торговля (Position Trading)
      • Долгосрочное удержание (недели, месяцы)
      • Основано на фундаментальном анализе
      
      5. Арбитраж
      • Использование разницы цен на разных биржах
      • Требует быстрого исполнения и хорошей ликвидности
      
      Для новичков часто рекомендуют начать со свинг-трейдинга, так как он менее стрессовый и не требует постоянного мониторинга рынка.
      
      Хотите узнать, какая стратегия подойдет именно вам?
    `,
    'что такое ордера и какие их типы?': `
      Ордер - это инструкция бирже на покупку или продажу актива. Основные типы ордеров:
      
      1. Рыночный ордер (Market Order)
      • Моментальное исполнение по текущей рыночной цене
      • Плюс: мгновенное исполнение
      • Минус: возможно проскальзывание цены (slippage)
      
      2. Лимитный ордер (Limit Order)
      • Исполняется только по указанной вами цене или лучше
      • Плюс: контроль цены исполнения
      • Минус: может не исполниться, если цена не достигнет указанного уровня
      
      3. Стоп-лосс ордер (Stop Loss)
      • Автоматически закрывает позицию при достижении определенного уровня убытка
      • Защищает от больших потерь
      
      4. Тейк-профит ордер (Take Profit)
      • Автоматически фиксирует прибыль при достижении целевой цены
      
      5. Трейлинг-стоп (Trailing Stop)
      • Динамический стоп-лосс, который перемещается вместе с ценой в выгодном направлении
      
      Также существуют OCO (One Cancels the Other), айсберг ордера и другие специальные типы.
      
      Хотите увидеть примеры использования разных типов ордеров?
    `,
    'как анализировать графики криптовалют?': `
      Анализ графиков криптовалют включает несколько подходов:
      
      1. Технический анализ:
      • Изучение ценовых паттернов (треугольники, голова и плечи, флаги)
      • Использование индикаторов (RSI, MACD, Bollinger Bands)
      • Анализ уровней поддержки и сопротивления
      • Определение трендов и их силы
      
      2. Свечной анализ:
      • Изучение свечных паттернов (доджи, молот, поглощение)
      • Анализ размера тел свечей и их теней
      
      3. Анализ объемов:
      • Соотношение объема торгов с движением цены
      • Определение силы тренда через объемы
      
      4. Анализ временных фреймов:
      • Сопоставление графиков разных временных интервалов
      
      Полезные инструменты для анализа:
      • TradingView
      • Криптопанель (CryptoView)
      • Индикаторы волатильности
      
      Мы рекомендуем начать с освоения базовых свечных паттернов и простых индикаторов, таких как скользящие средние.
      
      Хотите узнать о конкретных паттернах и их значении?
    `,
    'что такое defi и как использовать децентрализованные финансы?': `
      DeFi (Decentralized Finance) - это экосистема финансовых приложений, построенных на блокчейне, которые работают без централизованных посредников.
      
      Основные компоненты DeFi:
      
      1. Децентрализованные биржи (DEX)
      • Uniswap, SushiSwap, PancakeSwap
      • Позволяют обменивать токены напрямую без посредников
      
      2. Кредитные платформы
      • Aave, Compound
      • Позволяют брать и предоставлять займы
      
      3. Стейблкоины
      • DAI, USDC, USDT
      • Криптовалюты с привязкой к фиатным валютам
      
      4. Протоколы для стейкинга и фарминга
      • Предоставляют доходность за блокировку активов
      
      Как начать использовать DeFi:
      
      1. Создайте криптокошелек (MetaMask, Trust Wallet)
      2. Пополните его базовой криптовалютой сети (ETH, BNB, TON)
      3. Подключите кошелек к DeFi-протоколам
      4. Начните с небольших сумм для понимания процессов
      
      Важные моменты безопасности:
      • Всегда проверяйте смарт-контракты и URL сайтов
      • Остерегайтесь фишинговых атак
      • Понимайте риски (смарт-контракты, волатильность, импермаентные потери)
      
      Интересуетесь каким-то конкретным DeFi-протоколом?
    `,
  };

  const handleSend = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const normalizedInput = inputText.toLowerCase().trim();
      
      // Find response
      let response = '';
      for (const [question, answer] of Object.entries(aiResponses)) {
        if (normalizedInput.includes(question) || 
            question.includes(normalizedInput) || 
            similarityCheck(normalizedInput, question)) {
          response = answer;
          break;
        }
      }
      
      // Default response if no match
      if (!response) {
        response = 'Извините, я пока не могу ответить на этот вопрос. Попробуйте задать другой вопрос или выбрать один из предложенных вариантов.';
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  // Very simple similarity check
  const similarityCheck = (input: string, question: string): boolean => {
    const words1 = input.split(' ');
    const words2 = question.split(' ');
    let matches = 0;
    
    for (const word1 of words1) {
      if (word1.length < 3) continue; // Skip short words
      for (const word2 of words2) {
        if (word2.includes(word1) || word1.includes(word2)) {
          matches++;
          break;
        }
      }
    }
    
    return matches / Math.max(words1.length, words2.length) > 0.3; // Threshold
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
    
    // Focus on input after selecting a question
    const input = document.getElementById('chat-input');
    if (input) input.focus();
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-950 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI-ассистент по криптовалютам</h1>
            <p className="text-xl text-blue-200">
              Задайте любой вопрос о трейдинге, стейкинге или работе с биржами и получите мгновенный ответ
            </p>
          </motion.div>
          
          {/* Chat interface */}
          <div className="bg-blue-950/80 backdrop-blur-md rounded-xl shadow-xl overflow-hidden">
            {/* Messages area */}
            <div className="h-[500px] overflow-y-auto p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-xl p-4 whitespace-pre-line ${
                        message.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-tr-none' 
                          : 'bg-blue-800/40 text-blue-50 rounded-tl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-blue-800/40 text-blue-50 rounded-xl rounded-tl-none p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Suggested questions */}
            <div className="bg-blue-900/80 px-6 py-4 overflow-x-auto">
              <div className="flex space-x-2">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleSuggestedQuestion(question.text)}
                    className="px-4 py-2 bg-blue-800/70 hover:bg-blue-700/70 text-blue-100 rounded-full text-sm whitespace-nowrap transition-colors"
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Input area */}
            <div className="p-4 bg-blue-950 border-t border-blue-800/50">
              <div className="flex items-center">
                <textarea
                  id="chat-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Задайте вопрос..."
                  className="flex-1 bg-blue-900/40 text-white placeholder-blue-300 border-none rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={inputText.trim() === ''}
                  className={`ml-3 p-3 rounded-full ${
                    inputText.trim() === '' 
                      ? 'bg-blue-700/50 text-blue-300 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  } transition-colors`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Info cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-teal-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Обучающие курсы</h3>
              <p className="text-blue-200 mb-4">Структурированные курсы для последовательного изучения криптовалют и трейдинга.</p>
              <a href="/learn/courses" className="text-teal-400 hover:text-teal-300">Перейти к курсам →</a>
            </div>
            
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-yellow-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Глоссарий терминов</h3>
              <p className="text-blue-200 mb-4">Словарь с объяснением всех специализированных терминов из мира криптовалют.</p>
              <a href="/learn/glossary" className="text-yellow-400 hover:text-yellow-300">Открыть глоссарий →</a>
            </div>
            
            <div className="bg-blue-900/30 backdrop-blur-sm p-6 rounded-xl">
              <div className="text-blue-400 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Практический тренажер</h3>
              <p className="text-blue-200 mb-4">Симулятор биржи для тренировки навыков трейдинга без риска потери реальных средств.</p>
              <a href="/trading/simulator" className="text-blue-400 hover:text-blue-300">Попробовать тренажер →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 