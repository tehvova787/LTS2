import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-white mr-1">Lucky</span>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-500">Train</span>
            </div>
            <p className="text-sm mb-4">
              Образовательная платформа для изучения трейдинга, стейкинга и работы на криптовалютных биржах.
            </p>
            <div className="flex space-x-4">
              <a href="https://t.me/LuckyTrainTON" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-2.5 12.5l7.5-4-7.5-4v8zm-1-7.958l6.75 3.958-6.75 3.958v-7.916z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
              <a href="#" className="text-blue-300 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Обучение</h3>
            <ul className="space-y-2">
              <li><Link href="/learn/basics" className="hover:text-white transition-colors">Основы криптовалют</Link></li>
              <li><Link href="/learn/blockchain" className="hover:text-white transition-colors">Блокчейн технологии</Link></li>
              <li><Link href="/learn/ton" className="hover:text-white transition-colors">TON экосистема</Link></li>
              <li><Link href="/learn/courses" className="hover:text-white transition-colors">Видео курсы</Link></li>
              <li><Link href="/learn/glossary" className="hover:text-white transition-colors">Глоссарий терминов</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Сервисы</h3>
            <ul className="space-y-2">
              <li><Link href="/trading" className="hover:text-white transition-colors">Трейдинг</Link></li>
              <li><Link href="/staking" className="hover:text-white transition-colors">Стейкинг</Link></li>
              <li><Link href="/exchange" className="hover:text-white transition-colors">Биржа</Link></li>
              <li><Link href="/ai-assistant" className="hover:text-white transition-colors">AI-Ассистент</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Калькулятор доходности</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Поддержка</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Связаться с нами</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Условия использования</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-900 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Lucky Train. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
} 