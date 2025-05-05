'use client'

import { useState } from 'react'
import { useLanguage } from './LanguageProvider'

const LanguageSwitcher = () => {
  const { currentLanguage, changeLanguage } = useLanguage() || { currentLanguage: 'ru', changeLanguage: () => {} }
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ]

  const handleLanguageChange = (langCode: string) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        className="flex items-center px-2 py-1 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Переключить язык"
        title="Переключить язык"
      >
        <span className="mr-1">
          {languages.find(lang => lang.code === currentLanguage)?.flag || '🇷🇺'}
        </span>
        <span className="text-sm font-medium">
          {currentLanguage.toUpperCase()}
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`ml-1 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg overflow-hidden z-20 min-w-[120px]">
          {languages.map(lang => (
            <button
              key={lang.code}
              className={`flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors ${
                currentLanguage === lang.code ? 'bg-gray-50 font-medium' : ''
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="mr-2">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher 