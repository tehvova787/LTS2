# Rive Animation Integration

This document outlines how to use Rive animations throughout the project for interactive, vector-based animations that are responsive and performant.

## What is Rive?

Rive (formerly known as Flare) is a modern animation platform for interactive, real-time vector animations.

Benefits:

1. **Vector-based animation** in real-time
2. **Interactive and responsive** to user actions
3. **Compact file sizes** compared to traditional animations
4. **Cross-platform** support

## Getting Started

The project includes several components for working with Rive animations:

### 1. RiveAnimation Component

The basic component for displaying Rive animations:

```tsx
import { RiveAnimation } from '@/components/RiveAnimation';

// Basic usage
<RiveAnimation 
  src="/animations/my_animation.riv"
  height="200px"
  width="200px"
/>

// With state machine
<RiveAnimation
  src="/animations/button.riv"
  stateMachine="ButtonStateMachine"
  height="50px"
  width="180px"
/>
```

### 2. RiveHoverAnimation Component

A specialized component for hover states:

```tsx
import { RiveHoverAnimation } from '@/components/RiveAnimation';

<RiveHoverAnimation
  src="/animations/button.riv"
  stateMachine="ButtonStateMachine"
  height="50px"
  width="180px">
  <span className="relative z-10">Button Text</span>
</RiveHoverAnimation>
```

### 3. AnimatedWrapper with Rive Support

The project's existing animation components now support Rive:

```tsx
import { AnimatedCard } from '@/components/AnimatedWrapper';
import { useRiveAnimationContext } from '@/components/RiveAnimationProvider';

function MyComponent() {
  const { getAnimationAsset } = useRiveAnimationContext();
  
  return (
    <AnimatedCard
      useRive={true}
      riveProps={{
        src: getAnimationAsset('card'),
        stateMachine: 'CardStateMachine'
      }}
    >
      <div className="card">
        <h3>Card Title</h3>
        <p>Card content</p>
      </div>
    </AnimatedCard>
  );
}
```

## Animation Context

The project includes a `RiveAnimationProvider` that manages animation themes and settings:

```tsx
import { useRiveAnimationContext } from '@/components/RiveAnimationProvider';

function MyComponent() {
  const {
    useRiveAnimations, // Boolean flag to enable/disable animations
    setUseRiveAnimations, // Function to toggle animations
    animationTheme, // Current theme: 'modern', 'futuristic', 'playful', or 'minimal'
    setAnimationTheme, // Function to change theme
    getAnimationAsset // Helper to get animation assets by type
  } = useRiveAnimationContext();
  
  // Get a specific animation asset by type
  const buttonAnimation = getAnimationAsset('button');
  
  // Toggle animations
  const handleToggleAnimations = () => {
    setUseRiveAnimations(!useRiveAnimations);
  };
  
  // Change theme
  const handleChangeTheme = () => {
    setAnimationTheme('futuristic');
  };
}
```

## Animation Assets

Animation assets are organized by theme and type. The available asset types are:

- `button` - For button animations
- `card` - For card hover effects
- `loader` - For loading states
- `background` - For background animations
- `transition` - For page/section transitions

## Creating Rive Animations

1. Download the Rive editor from [rive.app](https://rive.app)
2. Create your animations
3. Export as .riv files
4. Place them in the `/public/animations/` directory
5. Update the `ANIMATION_ASSETS` in `RiveAnimationProvider.tsx` if adding new themes or types

## Animation Best Practices

1. Keep animations subtle and purposeful
2. Ensure animations enhance rather than distract from the user experience
3. Provide fallbacks when animations are disabled
4. Keep animation files small (under 100KB) for performance
5. Use state machines for interactive animations
6. Test animations on multiple devices for performance
