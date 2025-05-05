'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import '../styles/components/MultiChainSupport.css' // Import CSS file

// Типы данных для поддерживаемых блокчейнов
interface BlockchainData {
  id: string
  name: string
  logo: string
  gradient: string
  apy: number
  marketCap: number
  securityRating: string
  description: string
  supported: boolean
  comingSoon?: boolean
}

const blockchains: BlockchainData[] = [
  {
    id: 'ton',
    name: 'TON',
    logo: '/images/blockchains/ton-logo.svg',
    gradient: 'from-blue-500 to-blue-600',
    apy: 12.5,
    marketCap: 15000000000,
    securityRating: 'A+',
    description: 'The Open Network (TON) - высокопроизводительный блокчейн, созданный командой Telegram. Обеспечивает быстрые транзакции и низкие комиссии.',
    supported: true
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: '/images/blockchains/ethereum-logo.svg',
    gradient: 'from-purple-500 to-purple-600',
    apy: 4.8,
    marketCap: 320000000000,
    securityRating: 'A+',
    description: 'Ethereum - ведущая платформа для смарт-контрактов, обеспечивающая децентрализованные приложения и DeFi экосистему.',
    supported: true
  },
  {
    id: 'solana',
    name: 'Solana',
    logo: '/images/blockchains/solana-logo.svg',
    gradient: 'from-green-500 to-green-600',
    apy: 6.2,
    marketCap: 48000000000,
    securityRating: 'A',
    description: 'Solana - высокопроизводительный блокчейн с низкими комиссиями, поддерживающий тысячи транзакций в секунду.',
    supported: true
  },
  {
    id: 'bnb',
    name: 'BNB Chain',
    logo: '/images/blockchains/bnb-logo.svg',
    gradient: 'from-yellow-500 to-yellow-600',
    apy: 5.7,
    marketCap: 45000000000,
    securityRating: 'A',
    description: 'BNB Chain (бывший Binance Smart Chain) - блокчейн для децентрализованных приложений с низкими комиссиями.',
    supported: false,
    comingSoon: true
  },
  {
    id: 'polygon',
    name: 'Polygon',
    logo: '/images/blockchains/polygon-logo.svg',
    gradient: 'from-pink-500 to-pink-600',
    apy: 5.3,
    marketCap: 8000000000,
    securityRating: 'A',
    description: 'Polygon - решение второго уровня для Ethereum, обеспечивающее масштабируемость и низкие комиссии.',
    supported: false,
    comingSoon: true
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    logo: '/images/blockchains/avalanche-logo.svg',
    gradient: 'from-red-500 to-red-600',
    apy: 7.1,
    marketCap: 9500000000,
    securityRating: 'A',
    description: 'Avalanche - быстрая, недорогая и экологичная платформа для смарт-контрактов и децентрализованных приложений.',
    supported: false,
    comingSoon: true
  }
]

export default function MultiChainSupport() {
  const [selectedChain, setSelectedChain] = useState<string>('ton')
  const [showComingSoon, setShowComingSoon] = useState<boolean>(false)
  
  // Получение выбранного блокчейна
  const activeChain = blockchains.find(chain => chain.id === selectedChain) || blockchains[0]
  
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4 text-gradient">Поддержка Мультичейн</h2>
        <p className="text-xl max-w-3xl mx-auto multichain-description">
          Lucky Train интегрируется с ведущими блокчейн-платформами для максимальной гибкости и эффективности
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {blockchains.map((chain, index) => (
          <motion.div
            key={chain.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="mechanical-card relative overflow-hidden"
          >
            <div className={`h-2 w-full bg-gradient-to-r ${chain.gradient}`}></div>
            <div className="p-6 glass chain-card">
              <div className="relative w-full aspect-square mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={chain.logo}
                    alt={`${chain.name} Logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-center chain-name">{chain.name}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 