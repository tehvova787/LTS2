'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Define translations interface and context type
interface Translations {
  [key: string]: string | Translations
}

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: (lang: string) => void
  t: (key: string) => string
}

// Create the context
const LanguageContext = createContext<LanguageContextType | null>(null)

// Simple translations object for basic UI elements
const translations: Record<string, Translations> = {
  en: {
    nav: {
      luckyTrain: 'Lucky Train',
      tradingPlatform: 'Trading Platform',
      tradingEducation: 'Trading Education',
      metaverse: 'Metaverse',
      adminPanel: 'Admin Panel',
      login: 'Login',
      description: {
        luckyTrain: 'Lucky Train Main Page',
        tradingPlatform: 'Lucky Train Trading Platform',
        tradingEducation: 'Lucky Train Educational Platform',
        metaverse: 'Lucky Train Metaverse',
        adminPanel: 'Lucky Train Admin Panel'
      }
    },
    ui: {
      openMenu: 'Open Menu',
      closeMenu: 'Close Menu',
      english: 'English',
      russian: 'Russian',
      languageSwitch: 'Language'
    }
  },
  ru: {
    nav: {
      luckyTrain: 'Lucky Train',
      tradingPlatform: 'Торговая Платформа',
      tradingEducation: 'Обучение трейдингу',
      metaverse: 'Метавселенная',
      adminPanel: 'Панель администратора',
      login: 'Войти',
      description: {
        luckyTrain: 'Главная страница Lucky Train',
        tradingPlatform: 'Торговая платформа Lucky Train',
        tradingEducation: 'Образовательная платформа Lucky Train',
        metaverse: 'Метавселенная Lucky Train',
        adminPanel: 'Панель администратора Lucky Train'
      }
    },
    ui: {
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      english: 'Английский',
      russian: 'Русский',
      languageSwitch: 'Язык'
    }
  }
}

// Helper function to get nested values using dot notation
const getNestedValue = (obj: any, path: string): string => {
  const keys = path.split('.')
  let current = obj
  
  for (const key of keys) {
    if (current === undefined || current === null) {
      return path // Return the path if we can't navigate further
    }
    current = current[key]
  }
  
  return typeof current === 'string' ? current : path
}

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with browser language or default to Russian
  const [currentLanguage, setCurrentLanguage] = useState('ru')
  
  useEffect(() => {
    // Try to get stored language preference
    const savedLanguage = localStorage.getItem('language')
    
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ru')) {
      setCurrentLanguage(savedLanguage)
    } else {
      // Check browser language
      const browserLang = navigator.language.split('-')[0]
      if (browserLang === 'en') {
        setCurrentLanguage('en')
      }
      // Default is already 'ru'
    }
  }, [])
  
  const changeLanguage = (lang: string) => {
    if (lang === 'en' || lang === 'ru') {
      setCurrentLanguage(lang)
      try {
        localStorage.setItem('language', lang)
      } catch (e) {
        console.warn('Could not save language preference:', e)
      }
    }
  }
  
  // Translation function
  const t = (key: string): string => {
    const langTranslations = translations[currentLanguage]
    if (!langTranslations) return key
    
    return getNestedValue(langTranslations, key) || key
  }
  
  // Create context value
  const contextValue: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    t
  }
  
  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext) 