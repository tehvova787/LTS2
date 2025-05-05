'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useLanguage } from './shared/LanguageProvider'
import LanguageSwitcher from './shared/LanguageSwitcher'

interface NavItem {
  name: string
  href: string
  description: string
  icon: React.ReactNode
  translationKey: string
  descriptionKey: string
}

export default function MainNavigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const languageContext = useLanguage()
  const t = languageContext?.t

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setScrolled(offset > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainNavItems: NavItem[] = [
    {
      name: t ? t('nav.luckyTrain') : 'Lucky Train',
      href: '/',
      description: t ? t('nav.description.luckyTrain') : 'Главная страница Lucky Train',
      translationKey: 'nav.luckyTrain',
      descriptionKey: 'nav.description.luckyTrain',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      ),
    },
    {
      name: t ? t('nav.portfolio') : 'Портфолио',
      href: '/#portfolio',
      description: t ? t('nav.description.portfolio') : 'Портфолио, социальный трейдинг и инвестиции',
      translationKey: 'nav.portfolio',
      descriptionKey: 'nav.description.portfolio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: t ? t('nav.tradingPlatform') : 'Торговая Платформа',
      href: '/game',
      description: t ? t('nav.description.tradingPlatform') : 'Торговая платформа Lucky Train',
      translationKey: 'nav.tradingPlatform',
      descriptionKey: 'nav.description.tradingPlatform',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      name: t ? t('nav.tradingEducation') : 'Обучение трейдингу',
      href: '/trading-education',
      description: t ? t('nav.description.tradingEducation') : 'Образовательная платформа Lucky Train',
      translationKey: 'nav.tradingEducation',
      descriptionKey: 'nav.description.tradingEducation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      name: t ? t('nav.metaverse') : 'Метавселенная',
      href: '/metaverse-redirect',
      description: t ? t('nav.description.metaverse') : 'Метавселенная Lucky Train',
      translationKey: 'nav.metaverse',
      descriptionKey: 'nav.description.metaverse',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
    },
    {
      name: t ? t('nav.adminPanel') : 'Панель администратора',
      href: '/admin',
      description: t ? t('nav.description.adminPanel') : 'Панель администратора Lucky Train',
      translationKey: 'nav.adminPanel',
      descriptionKey: 'nav.description.adminPanel',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      {/* Mobile menu button */}
      <motion.div 
        className="fixed top-4 right-4 z-50 md:hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md rounded-full p-3 mobile-menu-button"
          aria-label={isOpen ? (t ? t('ui.closeMenu') : 'Закрыть меню') : (t ? t('ui.openMenu') : 'Открыть меню')}
          title={isOpen ? (t ? t('ui.closeMenu') : 'Закрыть меню') : (t ? t('ui.openMenu') : 'Открыть меню')}
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.nav 
        className={`block fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-2 scroll-active' : 'bg-black/20 backdrop-blur-md py-4'
        }`}
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="relative logo-container">
                <img src="/images/lucky-train-logo.png" alt="Lucky Train Logo" className="h-12 w-auto mr-3 logo-float logo-min-width" />
                <div className="absolute -bottom-2 left-0 right-0 h-px bg-secondary"></div>
              </div>
              <span className={`text-xl font-bold font-montserrat ${scrolled ? 'text-gray-800' : 'text-white'}`}>Lucky Train</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {mainNavItems.map((item) => (
                <Link
                  key={item.translationKey}
                  href={item.href}
                  className={`nav-link flex items-center text-sm font-medium transition-all duration-300 ${
                    pathname === item.href 
                      ? (scrolled ? 'text-primary' : 'text-turquoise') 
                      : (scrolled ? 'text-gray-600 hover:text-primary' : 'text-white hover:text-turquoise')
                  }`}
                  aria-label={item.description}
                  title={item.name}
                >
                  <span className={`mr-2 transition-all duration-300 ${
                    pathname === item.href 
                      ? (scrolled ? 'text-primary' : 'text-turquoise') 
                      : (scrolled ? 'text-gray-400' : 'text-gray-300')
                  }`}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />
              <button 
                className={`btn ${scrolled ? 'btn-primary text-white' : 'bg-turquoise text-gray-900'} px-6 py-2 rounded-lg text-sm font-medium transition-all`}
                aria-label={t ? t('nav.login') : 'Войти'}
                title={t ? t('nav.login') : 'Войти'}
              >
                {t ? t('nav.login') : 'Войти'}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Menu */}
      <motion.div
        className={`fixed inset-0 z-40 flex flex-col md:hidden mobile-nav-overlay ${isOpen ? 'block' : 'hidden'}`}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex-1 flex flex-col bg-white mobile-nav-container">
          <div className="flex justify-between items-center p-4">
            <div className="ml-2 flex items-center">
              <img src="/images/lucky-train-logo.png" alt="Lucky Train Logo" className="h-10 w-auto mr-2 logo-float" />
              <span className="text-xl font-bold font-montserrat text-gray-800">Lucky Train</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 p-2"
              aria-label={t ? t('ui.closeMenu') : 'Закрыть меню'}
              title={t ? t('ui.closeMenu') : 'Закрыть меню'}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center px-4 relative overflow-hidden">
            {/* Mobile nav design element */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-200"></div>
            
            {mainNavItems.map((item, index) => (
              <motion.div
                key={item.translationKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-8 ml-8"
              >
                <Link
                  href={item.href}
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="mr-4 bg-gray-100 p-3 rounded-lg text-primary">
                    {item.icon}
                  </span>
                  <div>
                    <div className="text-gray-800 text-xl font-medium font-poppins">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="p-8 relative safe-area-padding">
            <div className="w-full h-px bg-gray-200 absolute -top-1 left-0"></div>
            <div className="flex space-x-4 mb-4">
              <LanguageSwitcher />
            </div>
            <button 
              className="w-full btn btn-primary text-white px-6 py-3 text-lg font-medium"
              onClick={() => setIsOpen(false)}
              aria-label={t ? t('nav.login') : 'Войти'}
              title={t ? t('nav.login') : 'Войти'}
            >
              {t ? t('nav.login') : 'Войти'}
            </button>
          </div>
        </div>
      </motion.div>
    </>
  )
} 