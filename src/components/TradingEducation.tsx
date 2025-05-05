import React, { useState } from 'react';
import Link from 'next/link';

// Course interface
interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  coverImage: string;
  progress?: number;
}

// Mock courses data
const coursesData: Course[] = [
  {
    id: 'crypto-basics',
    title: 'Основы криптовалют',
    description: 'Изучите базовые принципы работы криптовалют, блокчейна и децентрализованных финансов.',
    level: 'beginner',
    duration: '2 часа',
    lessons: 8,
    coverImage: '/images/courses/crypto-basics.jpg',
    progress: 100
  },
  {
    id: 'staking-intro',
    title: 'Введение в стейкинг',
    description: 'Узнайте, как работает стейкинг, его преимущества и риски, а также стратегии максимизации дохода.',
    level: 'beginner',
    duration: '1.5 часа',
    lessons: 6,
    coverImage: '/images/courses/staking-intro.jpg',
    progress: 65
  },
  {
    id: 'trading-strategies',
    title: 'Стратегии трейдинга',
    description: 'Изучите различные стратегии торговли на криптовалютном рынке, управление рисками и анализ рынка.',
    level: 'intermediate',
    duration: '3 часа',
    lessons: 12,
    coverImage: '/images/courses/trading-strategies.jpg',
    progress: 25
  },
  {
    id: 'technical-analysis',
    title: 'Технический анализ',
    description: 'Научитесь читать графики, распознавать паттерны и использовать индикаторы для прогнозирования движения цены.',
    level: 'intermediate',
    duration: '4 часа',
    lessons: 15,
    coverImage: '/images/courses/technical-analysis.jpg',
    progress: 0
  },
  {
    id: 'defi-mastery',
    title: 'Мастерство DeFi',
    description: 'Продвинутый курс по децентрализованным финансам, включая протоколы кредитования, ликвидности и управление.',
    level: 'advanced',
    duration: '5 часов',
    lessons: 20,
    coverImage: '/images/courses/defi-mastery.jpg',
    progress: 0
  },
  {
    id: 'nft-markets',
    title: 'Рынки NFT',
    description: 'Погрузитесь в мир невзаимозаменяемых токенов, изучите принципы их создания, продажи и коллекционирования.',
    level: 'intermediate',
    duration: '2.5 часа',
    lessons: 10,
    coverImage: '/images/courses/nft-markets.jpg',
    progress: 0
  }
];

// Latest articles
const latestArticles = [
  {
    id: 'tokenomics-analysis',
    title: 'Как анализировать токеномику проекта',
    date: '2023-09-15',
    readTime: '8 мин'
  },
  {
    id: 'staking-vs-farming',
    title: 'Стейкинг vs Фарминг: что выбрать?',
    date: '2023-09-10',
    readTime: '5 мин'
  },
  {
    id: 'market-cycles',
    title: 'Циклы криптовалютного рынка',
    date: '2023-09-05',
    readTime: '10 мин'
  }
];

// Course card component
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="bg-blue-900/30 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg">
      <div className="h-40 bg-blue-800/50 relative">
        {/* Course level badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          course.level === 'beginner' ? 'bg-green-500/80 text-white' :
          course.level === 'intermediate' ? 'bg-yellow-500/80 text-white' :
          'bg-red-500/80 text-white'
        }`}>
          {course.level === 'beginner' ? 'Начинающий' :
           course.level === 'intermediate' ? 'Средний' : 'Продвинутый'}
        </div>
        
        {/* Placeholder for course image */}
        <div className="absolute inset-0 flex items-center justify-center text-blue-300/40">
          <span className="text-4xl">🎓</span>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
        <p className="text-blue-200 text-sm mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex justify-between text-sm text-blue-300 mb-4">
          <div>Уроков: {course.lessons}</div>
          <div>{course.duration}</div>
        </div>
        
        {/* Progress bar if the course has started */}
        {course.progress !== undefined && course.progress > 0 ? (
          <div>
            <div className="flex justify-between text-xs text-blue-300 mb-1">
              <span>Прогресс</span>
              <span>{course.progress}%</span>
            </div>
            <div className="h-1.5 bg-blue-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-teal-500" 
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <Link href={`/trading-education/courses/${course.id}`}>
              <button className="w-full mt-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-sm font-medium transition-colors">
                {course.progress === 100 ? 'Пройти повторно' : 'Продолжить'}
              </button>
            </Link>
          </div>
        ) : (
          <Link href={`/trading-education/courses/${course.id}`}>
            <button className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white text-sm font-medium hover:from-green-600 hover:to-teal-600 transition-all">
              Начать курс
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

// Main trading education component
const TradingEducation = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter courses by level and search query
  const filteredCourses = coursesData.filter(course => {
    const matchesTab = activeTab === 'all' || course.level === activeTab;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  // Calculate progress
  const coursesStarted = coursesData.filter(course => course.progress !== undefined && course.progress > 0).length;
  const coursesCompleted = coursesData.filter(course => course.progress === 100).length;
  const overallProgress = coursesData.length > 0 
    ? Math.round((coursesData.reduce((sum, course) => sum + (course.progress || 0), 0) / (coursesData.length * 100)) * 100) 
    : 0;
  
  return (
    <div className="bg-blue-950/50 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Образовательная платформа</h2>
          <p className="text-blue-200">Повышайте свои знания в криптовалютах, трейдинге и DeFi</p>
        </div>
        
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Поиск курсов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-80 px-4 py-2 pl-10 bg-blue-900/30 border border-blue-700/50 rounded-lg text-white placeholder-blue-300"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Learning Progress Dashboard */}
      <div className="bg-gradient-to-r from-blue-800/30 to-indigo-800/30 rounded-xl p-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Ваш прогресс обучения</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between text-sm text-blue-200">
                <span>Общий прогресс</span>
                <span>{overallProgress}%</span>
              </div>
              <div className="h-2 bg-blue-900/70 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-teal-500" 
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white">{coursesCompleted}</div>
            <div className="text-blue-200 text-sm text-center">Курсов завершено</div>
          </div>
          
          <div className="flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white">{coursesStarted - coursesCompleted}</div>
            <div className="text-blue-200 text-sm text-center">Курсов в процессе</div>
          </div>
        </div>
      </div>
      
      {/* Course Tabs */}
      <div className="flex overflow-x-auto space-x-2 mb-6 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'all' ? 'bg-blue-700 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'
          }`}
        >
          Все курсы
        </button>
        <button
          onClick={() => setActiveTab('beginner')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'beginner' ? 'bg-green-600 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'
          }`}
        >
          Для начинающих
        </button>
        <button
          onClick={() => setActiveTab('intermediate')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'intermediate' ? 'bg-yellow-600 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'
          }`}
        >
          Средний уровень
        </button>
        <button
          onClick={() => setActiveTab('advanced')}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            activeTab === 'advanced' ? 'bg-red-600 text-white' : 'bg-blue-900/30 text-blue-200 hover:bg-blue-800/30'
          }`}
        >
          Продвинутый
        </button>
      </div>
      
      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-blue-900/20 rounded-xl mb-10">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">Курсы не найдены</h3>
          <p className="text-blue-200">Попробуйте изменить параметры поиска или выбрать другую категорию</p>
        </div>
      )}
      
      {/* Latest Articles */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Последние статьи</h3>
          <Link href="/trading-education/articles" className="text-teal-400 hover:text-teal-300 text-sm">
            Все статьи →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map(article => (
            <Link key={article.id} href={`/trading-education/articles/${article.id}`}>
              <div className="bg-blue-900/30 hover:bg-blue-800/30 transition-colors rounded-xl p-5">
                <h4 className="text-white font-medium mb-2">{article.title}</h4>
                <div className="flex justify-between text-xs text-blue-300">
                  <span>{article.date}</span>
                  <span>{article.readTime} чтения</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Study Plan - Personalized recommendation */}
      <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-5">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold text-white mb-2">Персональный план обучения</h3>
            <p className="text-blue-200">
              Получите индивидуальную программу обучения, основанную на ваших целях и опыте
            </p>
          </div>
          <Link href="/trading-education/personal-plan">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg">
              Создать план
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TradingEducation; 