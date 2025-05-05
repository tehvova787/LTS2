'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { XR, VRButton } from '@react-three/xr'
import { Text } from '@react-three/drei'
import './page-styles.css'

// Import our components
import MainNavigation from '@/components/MainNavigation'
import SystemDashboard from '@/components/SystemDashboard'
import AdvancedAnalytics from '@/components/AdvancedAnalytics'
import SecurityFeatures from '@/components/SecurityFeatures'
import MultiChainSupport from '@/components/MultiChainSupport'
import SocialTrading from '@/components/SocialTrading'
import EducationHub from '@/components/EducationHub'
import Portfolio from '@/components/Portfolio'
import LoadingFallback from '@/components/LoadingFallback'
import Footer from '@/components/Footer'

// Define types for components
interface Train3DProps {
  speed: number;
  vrInteractive?: boolean;
}

interface HolographicDisplayProps {
  // Add props if needed
}

interface MetaverseBackgroundProps {
  speed: number;
}

// Dynamically import 3D components with error boundary
const Train3D = dynamic(() => import('@/components/Train3D'), { 
  ssr: false,
  loading: () => <LoadingFallback message="Загрузка модели поезда..." />
})

const Scene = dynamic(() => import('@/components/Scene'), { 
  ssr: false,
  loading: () => <LoadingFallback message="Загрузка сцены..." />
})

// Corrected Fallback component to show on error - only using Three.js elements
const ErrorFallback = () => (
  <group position={[0, 0, 0]}>
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
    <pointLight position={[10, 10, 10]} />
    <Text 
      position={[0, 2, 0]} 
      color="white" 
      fontSize={0.5} 
      anchorX="center" 
      anchorY="middle"
    >
      Error loading 3D content
    </Text>
  </group>
)

export default function Home() {
  const router = useRouter()
  const [buttonPressed, setButtonPressed] = useState(false)
  const [videoIndex, setVideoIndex] = useState(0)
  const [is3DLoaded, setIs3DLoaded] = useState(false)
  const [has3DError, setHas3DError] = useState(false)

  const promoVideos = [
    {
      src: '/videos/lucky-train-promo1.mp4',
      poster: '/images/lucky-train-mascot.png'
    },
    {
      src: '/videos/lucky-train-promo2.mp4',
      poster: '/images/lucky-train-mascot-wave.png'
    },
    {
      src: '/videos/lucky-train-promo3.mp4',
      poster: '/images/lucky-train-logo.png'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % promoVideos.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Mark 3D components as loaded after a delay
    const timer = setTimeout(() => {
      setIs3DLoaded(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const handleStartGame = () => {
    setButtonPressed(true)
    setTimeout(() => {
      router.push('/game')
    }, 1000)
  }

  // We'll dynamically load the HolographicDisplay and MetaverseBackground components
  // once the basic scene is working
  const HolographicDisplay = is3DLoaded 
    ? dynamic(() => import('@/components/HolographicDisplay'), { 
        ssr: false,
        loading: () => <LoadingFallback message="Загрузка голограммы..." position={[0, 1, 0]} />
      }) 
    : null
    
  const MetaverseBackground = is3DLoaded
    ? dynamic(() => import('@/components/MetaverseBackground'), { 
        ssr: false,
        loading: () => <LoadingFallback message="Загрузка фона метавселенной..." position={[0, -1, 0]} />
      })
    : null

  // Handle 3D loading errors
  const handle3DError = (error: any) => {
    console.error('Error loading 3D components:', error)
    setHas3DError(true)
  }

  return (
    <main className="min-h-screen bg-light-gradient overflow-x-hidden">
      {/* Navigation - ensure it's visible and not hidden */}
      <MainNavigation />
      
      {/* Hero Section with 3D Environment */}
      <section className="relative min-h-screen bg-white pattern-bg">
        {/* 3D Canvas with improved error handling and initialization */}
        <div className="absolute inset-0 opacity-20 canvas-container">
          <Canvas 
            shadows 
            gl={{ 
              antialias: true,
              alpha: true,
              powerPreference: 'high-performance',
              failIfMajorPerformanceCaveat: false
            }}
            camera={{ position: [0, 2, 5], fov: 50 }}
            dpr={[1, 1.5]} // Reduced pixel ratio for better performance
            onError={handle3DError}
          >
            <color attach="background" args={['#121824']} />
            <fog attach="fog" args={['#121824', 20, 60]} />
            <ambientLight intensity={0.4} />
            
            <Suspense fallback={null}>
              <XR>
                {has3DError ? <ErrorFallback /> : (
                  <>
                    {Scene && <Scene />}
                    <Train3D speed={1.0} />
                    {is3DLoaded && HolographicDisplay && <HolographicDisplay />}
                    {is3DLoaded && MetaverseBackground && <MetaverseBackground speed={0.5} />}
                  </>
                )}
              </XR>
            </Suspense>
          </Canvas>
        </div>
        <VRButton className="vr-button" aria-label="Включить VR режим" title="Включить VR режим" />
        
        <div className="relative container mx-auto px-4 pt-16 md:pt-24 hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content text-center"
          >
            <div className="relative mb-6">
              <img 
                src="/images/lucky-train-mascot.png" 
                alt="Lucky Train Mascot" 
                className="w-24 h-24 mx-auto mb-6 animate-float"
              />
            </div>
            
            <h1 className="hero-title">
              <span className="block mb-2 text-primary font-bold">Lucky Train:</span>
              <span className="text-gradient font-bold">
                Профессиональный Стейкинг TON
              </span>
            </h1>
            
            <motion.p 
              className="hero-subtitle font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Надежная платформа для стейкинга токенов на блокчейне TON с гарантированной 
              доходностью и высоким уровнем безопасности. Управляйте своими инвестициями 
              прямо в Telegram.
            </motion.p>
            
            <div className="hero-buttons">
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleStartGame}
                className="btn btn-primary font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                aria-label="Начать инвестирование"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Начать инвестирование
                </span>
              </motion.button>
              
              <motion.a
                href="/metaverse-redirect"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-secondary font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.75 }}
                aria-label="Войти в метавселенную"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Войти в метавселенную
                </span>
              </motion.a>
              
              <motion.a
                href="#portfolio"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-outline-secondary font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                aria-label="Просмотреть портфолио"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Просмотреть портфолио
                </span>
              </motion.a>
              
              <motion.a
                href="#system-dashboard"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="btn btn-outline font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.85 }}
                aria-label="Изучить доступные сервисы"
              >
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Исследовать все сервисы
                </span>
              </motion.a>
            </div>
            
            <motion.div 
              className="stats-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <div className="bg-white shadow-sm rounded-lg p-4 text-center">
                <span className="stat-value text-primary font-bold">12.5%</span>
                <span className="stat-label text-dark-text font-medium">Годовая доходность</span>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-4 text-center">
                <span className="stat-value text-primary font-bold">$15M+</span>
                <span className="stat-label text-dark-text font-medium">Общая стоимость активов</span>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-4 text-center">
                <span className="stat-value text-primary font-bold">5000+</span>
                <span className="stat-label text-dark-text font-medium">Активных инвесторов</span>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-4 text-center">
                <span className="stat-value text-primary font-bold">500+</span>
                <span className="stat-label text-dark-text font-medium">Социальных трейдеров</span>
              </div>
              <div className="bg-white shadow-sm rounded-lg p-4 text-center">
                <span className="stat-value text-primary font-bold">10+</span>
                <span className="stat-label text-dark-text font-medium">Вариантов портфелей</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated scroll indicator */}
        <motion.div 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Add the System Dashboard */}
      <div id="system-dashboard">
        <SystemDashboard />
      </div>

      {/* Security Features Section */}
      <SecurityFeatures />

      {/* Education Hub Section */}
      <EducationHub />

      {/* Advanced Analytics Section */}
      <section className="py-20 bg-space-dark relative quantum-particles">
        <div className="container mx-auto px-4">
          <AdvancedAnalytics />
        </div>
      </section>

      {/* Multi-chain Support Section */}
      <section className="py-20 bg-space-dark relative stars">
        <div className="container mx-auto px-4">
          <MultiChainSupport />
        </div>
      </section>

      {/* Social Trading Section */}
      <section className="py-20 bg-space-dark relative stars">
        <div className="container mx-auto px-4">
          <SocialTrading />
        </div>
      </section>

      {/* Portfolio Section */}
      <Portfolio />

      {/* Promotional Video Section */}
      <section className="py-20 bg-space-dark relative overflow-hidden">
        {/* Background track elements */}
        <div className="absolute top-0 left-0 right-0 h-1 track"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1 track"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 track"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1 track"></div>
        
        {/* Mechanical elements с пониженной непрозрачностью */}
        <div className="absolute top-20 right-20 w-20 h-20 opacity-20">
          <div className="gear gear-large"></div>
        </div>
        <div className="absolute bottom-20 left-20 w-20 h-20 opacity-20">
          <div className="gear gear-medium"></div>
        </div>
        <div className="absolute top-40 left-40 w-32 h-4 piston opacity-20"></div>
        <div className="absolute bottom-40 right-40 w-32 h-4 piston opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gradient">Посмотрите, как это работает</h2>
              <p className="text-xl text-white max-w-2xl mx-auto">Узнайте больше о нашей революционной платформе</p>
            </div>
            
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mechanical-card">
              {/* Video track outlines */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute left-3 right-3 top-3 h-1 bg-gradient-to-r from-turquoise to-neon-pink opacity-50"></div>
                <div className="absolute left-3 right-3 bottom-3 h-1 bg-gradient-to-r from-neon-pink to-turquoise opacity-50"></div>
                <div className="absolute top-3 bottom-3 left-3 w-1 bg-gradient-to-b from-turquoise to-neon-pink opacity-50"></div>
                <div className="absolute top-3 bottom-3 right-3 w-1 bg-gradient-to-b from-neon-pink to-turquoise opacity-50"></div>
                <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-turquoise"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-r-2 border-t-2 border-turquoise"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-l-2 border-b-2 border-turquoise"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-turquoise"></div>
              </div>
              
              <div className="video-section">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={videoIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={promoVideos[videoIndex].poster}
                      className="w-full h-full object-cover"
                    >
                      <source src={promoVideos[videoIndex].src} type="video/mp4" />
                    </video>
                  </motion.div>
                </AnimatePresence>
              </div>
              
              <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
                {promoVideos.map((_, index) => (
                  <button 
                    key={index}
                    onClick={() => setVideoIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      videoIndex === index 
                        ? 'bg-primary-gold animate-pulse-slow' 
                        : 'bg-white bg-opacity-50'
                    }`}
                    aria-label={`Переключить на видео ${index + 1}`}
                    title={`Переключить на видео ${index + 1}`}
                  ></button>
                ))}
              </div>
              
              {/* Animated controls */}
              <div className="absolute bottom-6 left-6 flex items-center space-x-3 z-20">
                <div className="w-8 h-8 rounded-full bg-turquoise/20 flex items-center justify-center border border-turquoise/50">
                  <div className="w-3 h-3 bg-primary-gold rounded-full"></div>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-turquoise to-neon-pink"></div>
              </div>
              
              {/* Video steam overlay */}
              <div className="absolute top-0 right-10 steam-container">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div 
                    key={i}
                    className={`steam steam-delay-${i+1}`}
                  />
                ))}
              </div>
              
              {/* Energy flow effect */}
              <div className="absolute inset-0 energy-flow pointer-events-none z-2 opacity-30"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section with 3D Icons */}
      <section id="learn-more" className="py-24 bg-space-dark quantum-particles">
        <div className="container mx-auto px-4 relative">
          {/* Rail tracks */}
          <div className="absolute top-0 left-10 right-10 h-1">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 track"></div>
            </div>
          </div>
          
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Инвестируйте с уверенностью</h2>
            <p className="text-xl text-white max-w-3xl mx-auto">Наша платформа обеспечивает безопасность, прозрачность и высокую доходность для всех инвесторов</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            {[
              {
                icon: '/images/security-icon-3d.png',
                title: 'Безопасность',
                description: 'Ваши средства защищены передовыми технологиями шифрования и мультиподписью.',
                gradient: 'from-turquoise to-neon-blue'
              },
              {
                icon: '/images/transparency-icon-3d.png',
                title: 'Прозрачность',
                description: 'Все транзакции записываются в блокчейн и доступны для проверки в любое время.',
                gradient: 'from-primary-gold to-primary-orange'
              },
              {
                icon: '/images/profit-icon-3d.png',
                title: 'Доходность',
                description: 'Стабильный пассивный доход с еженедельными выплатами на ваш кошелек.',
                gradient: 'from-neon-pink to-neon-purple'
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="mechanical-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className={`h-3 w-full bg-gradient-to-r ${feature.gradient}`}></div>
                <div className="p-8 glass relative glass-container">
                  {/* Mechanical elements с пониженной непрозрачностью */}
                  <div className="absolute top-3 right-3 w-8 h-8 opacity-20">
                    <div className="gear gear-small"></div>
                  </div>
                  
                  <div className="w-20 h-20 mx-auto mb-6 relative feature-icon-container">
                    <img src={feature.icon} alt={feature.title} className="w-full h-full object-contain animate-float" />
                    
                    {/* Steam effect */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 steam-container">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div
                          key={i}
                          className={`steam small-steam-delay-${i+1}`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-center text-white">{feature.title}</h3>
                  <p className="text-white font-medium">{feature.description}</p>
                  
                  {/* Animated pistons */}
                  <div className="mt-6 flex justify-center">
                    <div className="w-16 h-3 piston opacity-20"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-light-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-montserrat text-gray-800">Часто задаваемые вопросы</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-opensans">
              Ответы на наиболее популярные вопросы о нашей платформе
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                question: 'Что такое Lucky Train?',
                answer: 'Lucky Train - это инновационная платформа для стейкинга криптовалюты TON, предлагающая пользователям высокую доходность и безопасность инвестиций. Наша экосистема также включает торговую платформу, образовательные ресурсы и доступ к метавселенной.'
              },
              {
                question: 'Как начать инвестировать в TON через Lucky Train?',
                answer: 'Для начала инвестирования необходимо зарегистрироваться на платформе, пройти верификацию, пополнить баланс в TON и выбрать подходящий вам инвестиционный план. Весь процесс занимает всего несколько минут.'
              },
              {
                question: 'Какая годовая доходность предлагается на платформе?',
                answer: 'Lucky Train предлагает годовую доходность до 12.5% для стейкинга TON. Точный процент зависит от выбранного плана инвестирования, срока стейкинга и объема инвестиций.'
              },
              {
                question: 'Как обеспечивается безопасность средств пользователей?',
                answer: 'Безопасность обеспечивается использованием многофакторной аутентификации, холодного хранения активов, системы мультиподписи для транзакций и регулярными аудитами смарт-контрактов от ведущих компаний в области блокчейн-безопасности.'
              },
              {
                question: 'Что предлагает образовательная платформа Lucky Train?',
                answer: 'Наша образовательная платформа предлагает структурированные курсы по криптовалютам, трейдингу и инвестициям для пользователей различного уровня подготовки - от начинающих до профессионалов. Все материалы создаются опытными трейдерами и аналитиками.'
              },
              {
                question: 'Как работает метавселенная Lucky Train?',
                answer: 'Метавселенная Lucky Train - это виртуальное пространство, где пользователи могут взаимодействовать с 3D-представлением платформы, общаться с другими инвесторами, участвовать в виртуальных мероприятиях и управлять своими инвестициями в иммерсивной среде.'
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center font-medium cursor-pointer p-6">
                    <span className="text-gray-800 font-montserrat">{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="p-6 pt-0 text-gray-600 font-opensans">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">У вас остались вопросы?</p>
            <a 
              href="https://t.me/luckytrain_support" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Задать вопрос в поддержку
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-space-dark relative overflow-hidden cta-section">
        <div className="absolute inset-0 overflow-hidden">
          <div className="stars-small absolute inset-0"></div>
          <div className="stars-large absolute inset-0"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-gradient">Начните свое путешествие в мире криптовалют</h2>
              <p className="text-xl text-white mb-8">Присоединяйтесь к сообществу инвесторов Lucky Train и откройте новые возможности для роста вашего капитала</p>
              
              <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleStartGame}
                  className="btn btn-primary font-medium px-8 py-4 w-full sm:w-auto"
                  aria-label="Начать инвестирование"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Начать инвестирование
                  </span>
                </motion.button>
                
                <motion.a
                  href="/trading-education"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn btn-outline-white font-medium px-8 py-4 w-full sm:w-auto"
                  aria-label="Изучить обучающие материалы"
                >
                  <span className="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Начать обучение
                  </span>
                </motion.a>
              </div>
              
              <div className="mt-12 flex flex-wrap justify-center items-center">
                <div className="m-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-turquoise" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-white">Безопасность</span>
                </div>
                
                <div className="m-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-white">Доходность</span>
                </div>
                
                <div className="m-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <span className="text-white">Инновации</span>
                </div>
                
                <div className="m-4 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neon-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-white">Метавселенная</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
} 