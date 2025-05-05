'use client'

import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import MainNavigation from '@/components/MainNavigation'
import { XR, VRButton } from '@react-three/xr'

const Train3D = dynamic(() => import('@/components/Train3D'), { 
  ssr: false,
  loading: () => null 
})
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

export default function GamePage() {
  const [tokens, setTokens] = useState(10)
  const [speed, setSpeed] = useState(1)
  const [isRunning, setIsRunning] = useState(true)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')

  // Simulate token accumulation
  useEffect(() => {
    if (!isRunning) return

    const intervalId = setInterval(() => {
      setTokens(current => {
        const newAmount = current + speed * 0.1
        
        // Game winning condition
        if (newAmount >= 100) {
          setGameStatus('won')
          setIsRunning(false)
          return 100
        }
        
        // Random event that can cause loss
        if (Math.random() < 0.01 && speed > 2) {
          setGameStatus('lost')
          setIsRunning(false)
          return Math.max(0, current - 20)
        }
        
        return newAmount
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning, speed])

  const increaseSpeed = () => {
    if (speed < 10) {
      setSpeed(prev => prev + 1)
    }
  }

  const decreaseSpeed = () => {
    if (speed > 1) {
      setSpeed(prev => prev - 1)
    }
  }

  const collectTokens = () => {
    // Add a small bonus when collecting tokens
    setTokens(current => current + 5)
  }

  const resetGame = () => {
    setTokens(10)
    setSpeed(1)
    setIsRunning(true)
    setGameStatus('playing')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <MainNavigation />
      
      {/* Game Interface */}
      <div className="relative h-screen">
        <Canvas className="absolute inset-0">
          <Suspense fallback={null}>
            <XR>
              <Scene />
              <Train3D speed={speed} />
            </XR>
          </Suspense>
        </Canvas>
        <VRButton className="absolute top-4 right-4 z-50" />
        
        <div className="relative z-10 container mx-auto px-4 py-8">
          {/* Game Header */}
          <div className="flex justify-between items-center mb-10">
            <Link href="/" className="text-xl font-bold hover:text-yellow-300">
              ← Назад
            </Link>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200">
              Lucky Train
            </h1>
            <div className="invisible">Placeholder</div>
          </div>
          
          {/* Game Status */}
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg text-gray-300">Токены</h2>
                <p className="text-4xl font-bold text-yellow-400">{tokens.toFixed(1)}</p>
              </div>
              
              <div>
                <h2 className="text-lg text-gray-300">Скорость</h2>
                <p className="text-4xl font-bold text-green-400">{speed}x</p>
              </div>
              
              <div>
                <h2 className="text-lg text-gray-300">Статус</h2>
                <p className={`text-2xl font-bold ${
                  gameStatus === 'playing' ? 'text-blue-400' : 
                  gameStatus === 'won' ? 'text-green-400' : 
                  'text-red-400'
                }`}>
                  {
                    gameStatus === 'playing' ? 'В пути' : 
                    gameStatus === 'won' ? 'Победа!' : 
                    'Авария!'
                  }
                </p>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
              <div 
                className={`progress-bar progress-width-${tokens}`}
              ></div>
            </div>
            
            {/* Game controls */}
            {gameStatus === 'playing' ? (
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={decreaseSpeed}
                  disabled={speed <= 1}
                  className={`px-6 py-3 rounded-lg ${speed <= 1 ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  Снизить скорость
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={collectTokens}
                  className="px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700"
                >
                  Собрать монеты
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={increaseSpeed}
                  disabled={speed >= 10}
                  className={`px-6 py-3 rounded-lg ${speed >= 10 ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  Увеличить скорость
                </motion.button>
              </div>
            ) : (
              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                  className="px-8 py-4 rounded-lg bg-purple-600 hover:bg-purple-700 font-bold text-xl"
                >
                  Играть снова
                </motion.button>
                
                {gameStatus === 'won' && (
                  <p className="mt-4 text-xl text-yellow-300">Поздравляем! Вы накопили 100 токенов!</p>
                )}
                
                {gameStatus === 'lost' && (
                  <p className="mt-4 text-xl text-red-300">Поезд сошел с рельсов! Вы потеряли часть токенов.</p>
                )}
              </div>
            )}
          </div>
          
          {/* Game instructions */}
          <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-2">Как играть:</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Увеличивайте скорость поезда, чтобы быстрее зарабатывать токены</li>
              <li>Нажимайте &quot;Собрать монеты&quot; для получения дополнительных бонусов</li>
              <li>Будьте осторожны! На высокой скорости есть риск аварии</li>
              <li>Цель: накопить 100 токенов для победы</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
} 