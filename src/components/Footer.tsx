'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from './shared/LanguageProvider'

export default function Footer() {
  const languageContext = useLanguage()
  const t = languageContext?.t
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-space-dark relative overflow-hidden">
      {/* Mechanical design elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-turquoise via-blue to-neon-pink opacity-50"></div>
      <div className="absolute top-10 right-10 w-16 h-16 opacity-10">
        <div className="gear gear-large"></div>
      </div>
      <div className="absolute bottom-10 left-10 w-16 h-16 opacity-10">
        <div className="gear gear-medium"></div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1: Logo and short description */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-6">
              <div className="flex items-center">
                <img src="/images/lucky-train-logo.png" alt="Lucky Train Logo" className="h-12 w-auto mr-3" />
                <span className="text-xl font-bold text-white">Lucky Train</span>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Инновационная платформа для стейкинга TON с гарантированной доходностью и высоким уровнем безопасности.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/luckytrain" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-turquoise transition-colors" aria-label="Telegram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.82-.537 3.676-.763 4.878l-.107.33c-.204.62-.42 1.22-1.137 1.22-.723 0-1.01-.371-1.31-.613l-.537-.43c-.696-.557-2.25-1.596-3.846-2.844-.698-.535-1.222-1.207-.222-2.207.6-.6 2.982-2.987 3.76-3.787.268-.268.268-.535.134-.669l-.134-.134c-.134-.134-.402-.134-.669-.134l-3.054.134s-.2-.134-.334-.267c-.134-.134-.334-.134-.468-.134-.268 0-.402.134-.536.268-.669.802-1.873 2.276-2.542 3.346-.268.401-.268.802 0 1.203 1.338 2.81 2.677 5.219 4.683 6.825.334.268.669.401 1.003.401h2.408s.267-.133.401-.267c.134-.133.267-.267.134-.535-.134-1.338-1.873-2.542-1.741-3.211.134-.668 2.409-.668 3.48-.267.267.134.535 0 .669-.134.134-.134.267-.334.267-.535l.134-2.409s.134-.401-.134-.668c-.135-.134-.402-.268-.669-.268z" />
                </svg>
              </a>
              <a href="https://twitter.com/luckytrain" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-turquoise transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/luckytrain" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-turquoise transition-colors" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://discord.gg/luckytrain" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-turquoise transition-colors" aria-label="Discord">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-montserrat">Быстрые ссылки</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/#portfolio" className="text-gray-300 hover:text-turquoise transition-colors">
                  Портфолио
                </Link>
              </li>
              <li>
                <Link href="/game" className="text-gray-300 hover:text-turquoise transition-colors">
                  Торговая платформа
                </Link>
              </li>
              <li>
                <Link href="/trading-education" className="text-gray-300 hover:text-turquoise transition-colors">
                  Обучение трейдингу
                </Link>
              </li>
              <li>
                <Link href="/metaverse-redirect" className="text-gray-300 hover:text-turquoise transition-colors">
                  Метавселенная
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-300 hover:text-turquoise transition-colors">
                  Панель администратора
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-montserrat">Ресурсы</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                  Документация
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                  Статус системы
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-turquoise transition-colors">
                  Блог
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 font-montserrat">Контакты</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-turquoise mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:support@luckytrain.io" className="text-gray-300 hover:text-turquoise transition-colors">
                  support@luckytrain.io
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-turquoise mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
                <a href="https://t.me/luckytrain_support" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-turquoise transition-colors">
                  @luckytrain_support
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-turquoise mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-gray-300">
                  Поддержка 24/7
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <div className="bg-space-gradient rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">Подпишитесь на обновления</h4>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="bg-space-dark border border-gray-700 rounded-l-lg px-4 py-2 text-white w-full focus:outline-none focus:border-turquoise"
                  />
                  <button type="submit" className="bg-turquoise text-space-dark rounded-r-lg px-4 font-medium">
                    ОК
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} Lucky Train. Все права защищены.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-turquoise text-sm transition-colors">
                Условия использования
              </a>
              <a href="#" className="text-gray-400 hover:text-turquoise text-sm transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-gray-400 hover:text-turquoise text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 