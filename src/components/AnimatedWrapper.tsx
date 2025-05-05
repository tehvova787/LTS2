'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { RiveAnimation, RiveHoverAnimation } from './RiveAnimation'
import { Fit, Alignment } from 'rive-react'

interface AnimatedWrapperProps {
  children: React.ReactNode;
  useRive?: boolean;
  riveProps?: {
    src: string;
    stateMachine?: string;
    artboard?: string;
    animations?: string[];
  }
}

export function AnimatedWrapper({ 
  children, 
  useRive = false,
  riveProps
}: AnimatedWrapperProps) {
  if (useRive && riveProps) {
    return (
      <RiveAnimation
        src={riveProps.src}
        stateMachine={riveProps.stateMachine}
        artboard={riveProps.artboard}
        animations={riveProps.animations}
        height="auto"
      >
        {children}
      </RiveAnimation>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedSectionProps {
  children: React.ReactNode;
  useRive?: boolean;
  riveProps?: {
    src: string;
    stateMachine?: string;
    artboard?: string;
    animations?: string[];
  }
}

export function AnimatedSection({ 
  children,
  useRive = false,
  riveProps
}: AnimatedSectionProps) {
  if (useRive && riveProps) {
    return (
      <RiveAnimation
        src={riveProps.src}
        stateMachine={riveProps.stateMachine}
        artboard={riveProps.artboard}
        animations={riveProps.animations}
        height="auto"
      >
        {children}
      </RiveAnimation>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedCardProps {
  children: React.ReactNode;
  useRive?: boolean;
  riveProps?: {
    src: string;
    stateMachine?: string;
    hoverInput?: string;
  }
}

export function AnimatedCard({ 
  children,
  useRive = false,
  riveProps
}: AnimatedCardProps) {
  if (useRive && riveProps) {
    return (
      <RiveHoverAnimation
        src={riveProps.src}
        stateMachine={riveProps.stateMachine}
        hoverInput={riveProps.hoverInput || 'hover'}
        height="auto"
      >
        {children}
      </RiveHoverAnimation>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedListProps {
  children: React.ReactNode;
  useRive?: boolean;
  riveProps?: {
    src: string;
    stateMachine?: string;
    artboard?: string;
    animations?: string[];
  }
}

export function AnimatedList({ 
  children,
  useRive = false,
  riveProps
}: AnimatedListProps) {
  if (useRive && riveProps) {
    return (
      <RiveAnimation
        src={riveProps.src}
        stateMachine={riveProps.stateMachine}
        artboard={riveProps.artboard}
        animations={riveProps.animations}
        height="auto"
      >
        {children}
      </RiveAnimation>
    )
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedPresenceWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {children}
    </AnimatePresence>
  )
} 