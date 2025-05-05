'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define animation theme options
export type AnimationTheme = 'modern' | 'futuristic' | 'playful' | 'minimal';

// Animation assets for different themes
const ANIMATION_ASSETS = {
  modern: {
    button: '/animations/modern_button.riv',
    card: '/animations/modern_card.riv',
    loader: '/animations/modern_loader.riv',
    background: '/animations/modern_background.riv',
    transition: '/animations/modern_transition.riv',
  },
  futuristic: {
    button: '/animations/futuristic_button.riv',
    card: '/animations/futuristic_card.riv',
    loader: '/animations/futuristic_loader.riv',
    background: '/animations/futuristic_background.riv',
    transition: '/animations/futuristic_transition.riv',
  },
  playful: {
    button: '/animations/playful_button.riv',
    card: '/animations/playful_card.riv',
    loader: '/animations/playful_loader.riv',
    background: '/animations/playful_background.riv',
    transition: '/animations/playful_transition.riv',
  },
  minimal: {
    button: '/animations/minimal_button.riv',
    card: '/animations/minimal_card.riv',
    loader: '/animations/minimal_loader.riv',
    background: '/animations/minimal_background.riv',
    transition: '/animations/minimal_transition.riv',
  },
};

// Define context types
interface RiveAnimationContextType {
  useRiveAnimations: boolean;
  setUseRiveAnimations: (use: boolean) => void;
  animationTheme: AnimationTheme;
  setAnimationTheme: (theme: AnimationTheme) => void;
  getAnimationAsset: (type: keyof typeof ANIMATION_ASSETS.modern) => string;
}

// Create context with default values
const RiveAnimationContext = createContext<RiveAnimationContextType>({
  useRiveAnimations: true,
  setUseRiveAnimations: () => {},
  animationTheme: 'modern',
  setAnimationTheme: () => {},
  getAnimationAsset: () => '',
});

// Provider component
export function RiveAnimationProvider({ 
  children,
  defaultTheme = 'modern',
  defaultUseAnimations = true,
}: { 
  children: ReactNode;
  defaultTheme?: AnimationTheme;
  defaultUseAnimations?: boolean;
}) {
  const [useRiveAnimations, setUseRiveAnimations] = useState<boolean>(defaultUseAnimations);
  const [animationTheme, setAnimationTheme] = useState<AnimationTheme>(defaultTheme);

  // Helper function to get animation asset by type
  const getAnimationAsset = (type: keyof typeof ANIMATION_ASSETS.modern): string => {
    return ANIMATION_ASSETS[animationTheme][type];
  };

  return (
    <RiveAnimationContext.Provider
      value={{
        useRiveAnimations,
        setUseRiveAnimations,
        animationTheme,
        setAnimationTheme,
        getAnimationAsset,
      }}
    >
      {children}
    </RiveAnimationContext.Provider>
  );
}

// Custom hook to use the RiveAnimation context
export function useRiveAnimationContext() {
  const context = useContext(RiveAnimationContext);
  if (context === undefined) {
    throw new Error('useRiveAnimationContext must be used within a RiveAnimationProvider');
  }
  return context;
} 