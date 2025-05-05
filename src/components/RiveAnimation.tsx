'use client'
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from 'rive-react';
import { useEffect, useState } from 'react';
import '../styles/components/RiveAnimation.css'; // Import CSS file

export interface RiveAnimationProps {
  src: string;
  stateMachine?: string;
  autoplay?: boolean;
  artboard?: string;
  animations?: string[];
  className?: string;
  fit?: Fit;
  alignment?: Alignment;
  layout?: Layout;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick?: () => void;
  height?: number | string;
  width?: number | string;
  inputs?: {
    name: string;
    value: boolean | number;
  }[];
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RiveAnimation({
  src,
  stateMachine,
  artboard,
  animations,
  className = '',
  autoplay = true,
  fit = Fit.Contain,
  alignment = Alignment.Center,
  layout = Layout.new({
    fit: fit,
    alignment: alignment,
  }),
  onMouseEnter,
  onMouseLeave,
  onClick,
  height = '100%',
  width = '100%',
  inputs = [],
  children,
  fallback,
}: RiveAnimationProps) {
  const [hasError, setHasError] = useState(false);
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    artboard,
    animations,
    autoplay,
    layout,
  });

  // Добавляем обработчик ошибок через try-catch в useEffect
  useEffect(() => {
    const handleRiveLoadingError = () => {
      try {
        // Проверяем, удалось ли загрузить Rive компонент
        if (!rive) {
          console.error('Failed to load Rive animation:', src);
          setHasError(true);
        }
      } catch (err) {
        console.error('Error checking Rive animation status:', err);
        setHasError(true);
      }
    };

    // Вызываем проверку после монтирования
    handleRiveLoadingError();
  }, [rive, src]);

  useEffect(() => {
    try {
      if (!rive || !stateMachine) return;
      
      // Set up inputs from props
      inputs.forEach(input => {
        const inputObj = rive.stateMachineInputs(stateMachine)?.find(i => i.name === input.name);
        if (inputObj) {
          if (typeof input.value === 'boolean') {
            inputObj.value = input.value;
          } else if (typeof input.value === 'number') {
            inputObj.value = input.value;
          }
        }
      });
    } catch (err) {
      console.error('Error applying Rive inputs:', err);
      setHasError(true);
    }
  }, [rive, stateMachine, inputs]);

  if (hasError && fallback) {
    return (
      <div 
        className={`rive-fallback-container ${className}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        {fallback}
        {children}
      </div>
    );
  }

  return (
    <div 
      className={`rive-container ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {!hasError && <RiveComponent />}
      {children}
    </div>
  );
}

// Helper component for using Rive with hover states
export function RiveHoverAnimation({
  src,
  stateMachine,
  hoverInput = 'hover',
  children,
  fallback,
  ...props
}: RiveAnimationProps & { hoverInput?: string }) {
  const [hasError, setHasError] = useState(false);
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: stateMachine ? [stateMachine] : undefined,
    autoplay: true,
    layout: props.layout || Layout.new({
      fit: props.fit || Fit.Contain,
      alignment: props.alignment || Alignment.Center,
    }),
  });

  // Проверяем загрузку Rive компонента
  useEffect(() => {
    const handleRiveLoadingError = () => {
      try {
        // Проверяем, удалось ли загрузить Rive компонент
        if (!rive) {
          console.error('Failed to load Rive hover animation:', src);
          setHasError(true);
        }
      } catch (err) {
        console.error('Error checking Rive hover animation status:', err);
        setHasError(true);
      }
    };

    // Вызываем проверку после монтирования
    handleRiveLoadingError();
  }, [rive, src]);

  const hoverState = useStateMachineInput(rive, stateMachine || '', hoverInput);

  return (
    <div
      className={`rive-hover-container ${props.className || ''}`}
      onMouseEnter={() => !hasError && hoverState && (hoverState.value = true)}
      onMouseLeave={() => !hasError && hoverState && (hoverState.value = false)}
      onClick={props.onClick}
    >
      {!hasError && <RiveComponent />}
      {hasError && fallback}
      {children}
    </div>
  );
} 