'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DashboardCard {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  route: string
  imageUrl?: string
  mechanical?: {
    type: 'gear' | 'piston' | 'wheel' | 'cylinder'
    position: string
  }[]
}

export default function SystemDashboard() {
  const router = useRouter()
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  const dashboardCards: DashboardCard[] = [
    {
      title: 'Стейкинг TON',
      description: 'Инвестируйте в стейкинг TON и получайте пассивный доход. Профессиональная платформа с высоким уровнем безопасности.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-turquoise to-neon-pink',
      route: '/game',
      imageUrl: '/images/lucky-train-mascot.png',
      mechanical: [
        { type: 'gear', position: 'top-3 right-3 w-16 h-16 opacity-40' },
        { type: 'piston', position: 'bottom-5 left-10 w-20 h-6 opacity-60' }
      ]
    },
    {
      title: 'Торговая Платформа',
      description: 'Интерактивная игровая платформа для торговли криптовалютами. Получите опыт трейдинга в безопасной среде.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      gradient: 'from-neon-blue to-neon-purple',
      route: '/game',
      imageUrl: '/images/rocket-train-3d.png',
      mechanical: [
        { type: 'wheel', position: 'bottom-2 right-5 w-14 h-14 opacity-60' },
        { type: 'cylinder', position: 'top-8 left-5 w-16 h-8 opacity-40' }
      ]
    },
    {
      title: 'Образовательная Платформа',
      description: 'Курсы по трейдингу и инвестициям для начинающих и продвинутых трейдеров. Научитесь торговать как профессионал.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      gradient: 'from-primary-gold to-primary-orange',
      route: '/trading-education',
      imageUrl: '/images/lucky-train-mascot-wave.png',
      mechanical: [
        { type: 'gear', position: 'bottom-10 right-10 w-12 h-12 opacity-50' },
        { type: 'gear', position: 'bottom-4 right-4 w-8 h-8 opacity-40' }
      ]
    },
    {
      title: 'Метавселенная TON',
      description: 'Погрузитесь в виртуальный мир блокчейна TON. Исследуйте, общайтесь и развивайтесь в новой цифровой реальности.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      gradient: 'from-neon-pink to-neon-purple',
      route: '/metaverse',
      imageUrl: '/images/stars-large.png',
      mechanical: [
        { type: 'piston', position: 'top-5 left-5 w-16 h-4 opacity-40' },
        { type: 'cylinder', position: 'bottom-5 right-20 w-14 h-6 opacity-30' }
      ]
    },
    {
      title: 'TTC_002 Метаверсенная Интеграция',
      description: 'Специальная интеграция TTC_002 в метавселенную. Управляйте виртуальными поездами и взаимодействуйте с системой.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-purple-600',
      route: '/metaverse/ttc002',
      imageUrl: '/images/train-vr-3d.png',
      mechanical: [
        { type: 'gear', position: 'bottom-6 left-6 w-12 h-12 opacity-40' },
        { type: 'piston', position: 'top-8 right-8 w-16 h-4 opacity-50' }
      ]
    },
    {
      title: 'Администрирование',
      description: 'Панель управления для администраторов системы. Управляйте пользователями, контентом и настройками.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-turquoise to-primary-blue',
      route: '/admin',
      imageUrl: '/images/security-icon-3d.png',
      mechanical: [
        { type: 'gear', position: 'top-5 right-5 w-12 h-12 opacity-50' },
        { type: 'gear', position: 'top-10 right-14 w-8 h-8 opacity-30' },
        { type: 'gear', position: 'top-14 right-6 w-6 h-6 opacity-40' }
      ]
    },
  ]

  const handleCardClick = (route: string) => {
    if (route.startsWith('http')) {
      window.open(route, '_blank')
    } else {
      router.push(route)
    }
  }

  const renderMechanicalElement = (type: string, className: string) => {
    switch(type) {
      case 'gear':
        return <div className={`absolute ${className} gear gear-medium`}></div>;
      case 'piston':
        return <div className={`absolute ${className} piston`}></div>;
      case 'wheel':
        return (
          <div className={`absolute ${className} rounded-full border-4 border-primary-gold animate-wheels`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-full bg-primary-gold/50"></div>
            </div>
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-2 h-8 bg-primary-gold/70 transform-wheel-${i * 45}`}
              />
            ))}
          </div>
        );
      case 'cylinder':
        return <div className={`absolute ${className} cylinder`}></div>;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-space-dark stars quantum-particles">
      <div className="container mx-auto px-4 relative">
        {/* Rail tracks */}
        <div className="absolute left-0 right-0 h-1 top-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 track"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary-gold"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-primary-gold"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary-gold"></div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 relative"
        >
          <div className="flex justify-center mb-6">
            <motion.div 
              className="gear gear-large w-16 h-16 mx-2"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            />
            <motion.div 
              className="gear gear-medium w-12 h-12 mt-2 mx-2"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            />
            <motion.div 
              className="gear gear-small w-10 h-10 mt-3 mx-2"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            />
          </div>
          
          <h2 className="text-4xl font-bold mb-4 text-gradient">Экосистема Lucky Train</h2>
          <p className="text-xl blue-text max-w-3xl mx-auto">
            Исследуйте все компоненты нашей интегрированной экосистемы. Каждая платформа разработана для обеспечения лучшего пользовательского опыта.
          </p>
          
          <div className="steam-container mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div 
                key={i} 
                className={`steam steam-element left-${30 + i * 15} delay-${i * 0.5}`}
              />
            ))}
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-20">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {dashboardCards.map((card, index) => (
              <motion.div
                key={`dashboard-card-${index}`}
                className="mechanical-card relative overflow-hidden"
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.route)}
              >
                {/* Card content */}
                <div className={`h-3 w-full bg-gradient-to-r ${card.gradient}`}></div>
                <div className="p-8 glass relative glass-panel">
                  {card.mechanical?.map((mech, mechIndex) => (
                    <div key={`mech-${index}-${mechIndex}`} className={`absolute ${mech.position}`}>
                      {renderMechanicalElement(mech.type, '')}
                    </div>
                  ))}
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 text-turquoise">
                        {card.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">{card.title}</h3>
                    </div>
                    
                    <p className="text-white mb-6 font-medium">{card.description}</p>
                    
                    {card.imageUrl && (
                      <div className="relative w-full h-48 mb-6">
                        <img 
                          src={card.imageUrl} 
                          alt={card.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom rail track */}
        <div className="absolute left-0 right-0 h-1 bottom-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 track"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary-gold"></div>
            <div className="absolute left-2/4 top-0 bottom-0 w-px bg-primary-gold"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary-gold"></div>
          </div>
        </div>
      </div>
    </section>
  )
} 