'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function MetaverseRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Здесь можно добавить логику перед перенаправлением
    // Например, загрузка состояния пользователя или другие подготовительные действия
    
    // Перенаправление произойдет через 2 секунды
    const timer = setTimeout(() => {
      // Перенаправляем на страницу метавселенной вместо API
      router.push('/metaverse')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-space-gradient stars">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-6 text-gradient">Переход в метавселенную</h1>
        <div className="relative w-64 h-8 bg-space-dark/50 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2 }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-turquoise to-neon-pink"
          />
        </div>
        <p className="text-turquoise mt-4">Подготовка виртуального пространства...</p>
      </motion.div>
    </div>
  )
} 