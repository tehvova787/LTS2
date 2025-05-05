import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Stats, OrbitControls } from '@react-three/drei';
import { XR, Controllers, Hands, VRButton, useXR } from '@react-three/xr';
import MetaverseScene from './components/MetaverseScene';
import UI from './components/UI';
import LandingPage from './components/ui/LandingPage';
import { useMetaverseStore } from './stores/metaverseStore';
import './App.css';

// Компонент для обработки сообщений от родительского окна
const MessageHandler = () => {
  const xrState = useXR();
  
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Обрабатываем сообщение "enter-vr" от родительского окна
      if (event.data?.type === 'enter-vr') {
        console.log('Received enter-vr message from parent');
        
        // Instead of programmatically entering VR, trigger a click on the VR button
        const vrButton = document.querySelector('.VRButton');
        if (vrButton instanceof HTMLElement) {
          vrButton.click();
        } else {
          console.error('VR button not found, cannot enter VR programmatically');
          window.parent.postMessage({ 
            type: 'webxr-error', 
            error: 'VR button not found, cannot enter VR programmatically' 
          }, '*');
        }
      }
    };

    // Слушаем сообщения
    window.addEventListener('message', handleMessage);
    
    // Сообщаем родительскому окну, что WebXR готов
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-vr')
        .then(supported => {
          if (supported) {
            window.parent.postMessage({ type: 'webxr-ready' }, '*');
          } else {
            window.parent.postMessage({ type: 'webxr-not-supported' }, '*');
          }
        })
        .catch(error => {
          console.error('WebXR check failed:', error);
          window.parent.postMessage({ type: 'webxr-error', error: error.message }, '*');
        });
    } else {
      // WebXR API is not available
      window.parent.postMessage({ type: 'webxr-not-available' }, '*');
    }
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  // При завершении XR сессии сообщаем родительскому окну
  useEffect(() => {
    const handleXRSessionEnd = () => {
      window.parent.postMessage({ type: 'webxr-session-ended' }, '*');
    };
    
    // Регистрируем обработчик события окончания сессии
    const xrSessionEndEvent = new CustomEvent('webxrsessionend');
    window.addEventListener('webxrsessionend', handleXRSessionEnd);
    
    // Also watch for changes in the XR state's isPresenting property
    if (xrState.isPresenting === false && xrState.isHandTracking === false) {
      // This means the session has ended
      window.parent.postMessage({ type: 'webxr-session-ended' }, '*');
    }
    
    return () => {
      window.removeEventListener('webxrsessionend', handleXRSessionEnd);
    };
  }, [xrState.isPresenting, xrState.isHandTracking]);
  
  return null;
};

// Проверка, является ли приложение встроенным в iframe
function isIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

// Component to ensure world loads even without server connection
const FallbackMetaverseInitializer = () => {
  const { initialize, isConnected, worldChunks, setWorldChunks } = useMetaverseStore() as any;
  
  useEffect(() => {
    const setupFallback = async () => {
      try {
        // Try normal initialization first
        await initialize();
      } catch (error) {
        console.warn('Using fallback initialization due to error:', error);
        
        // If there are no world chunks, provide fallback
        if (!worldChunks || worldChunks.length === 0) {
          const DEFAULT_WORLD_CHUNKS = [
            {
              position: { x: 0, y: 0, z: 0 },
              size: 100,
              heightmap: [[0, 0], [0, 0]],
              vegetation: [],
              structures: []
            }
          ];
          
          setWorldChunks(DEFAULT_WORLD_CHUNKS);
        }
      }
    };
    
    setupFallback();
  }, []);
  
  return null;
};

function App() {
  const { initialize, isConnected } = useMetaverseStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isInVR, setIsInVR] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);
  const vrButtonRef = useRef<HTMLButtonElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Проверяем, запущено ли приложение в iframe
    setIsEmbedded(isIframe());
    
    // Если приложение встроено в iframe, пропускаем лендинг
    if (isIframe()) {
      setShowLandingPage(false);
    }
    
    // Progress animation
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 5;
      });
    }, 200);
    
    // Инициализируем подключение к серверу метавселенной
    const init = async () => {
      try {
        await initialize();
        setLoading(false);
        setLoadingProgress(100);
      } catch (err) {
        console.error("Failed to initialize metaverse:", err);
        setError("Failed to connect to metaverse server. Using offline mode.");
        setLoading(false);
        setLoadingProgress(100);
        
        // We still continue to show the metaverse even on error,
        // using the FallbackMetaverseInitializer
      }
    };

    init();
    
    return () => {
      clearInterval(progressInterval);
    };
  }, [initialize]);

  // Обработчик входа в метавселенную
  const handleEnterMetaverse = () => {
    setShowLandingPage(false);
  };
  
  // Обработчики сессии VR
  const handleSessionStart = () => {
    setIsInVR(true);
    
    // Отправляем пользовательское событие для отслеживания начала сессии
    window.dispatchEvent(new CustomEvent('webxrsessionstart'));
    
    // Применяем оптимизации для VR
    // Например, можно уменьшить детализацию мира для лучшей производительности
  };

  const handleSessionEnd = () => {
    setIsInVR(false);
    
    // Отправляем пользовательское событие для отслеживания конца сессии
    window.dispatchEvent(new CustomEvent('webxrsessionend'));
  };

  // Показываем экран загрузки
  if (loading) {
    return (
      <div className="loading-screen">
        <h1>Loading Metaverse...</h1>
        <div className="progress-bar">
          <div 
            className={`progress-bar-fill progress-bar-width-${loadingProgress}`}
          ></div>
        </div>
        <div className="spinner"></div>
      </div>
    );
  }

  // Показываем сообщение об ошибке, если есть
  if (error) {
    return (
      <div className="error-screen">
        <h1>TON Metaverse</h1>
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  // Показываем лендинг если showLandingPage равно true
  if (showLandingPage) {
    return <LandingPage onEnterMetaverse={handleEnterMetaverse} />;
  }

  // Показываем опыт метавселенной
  return (
    <div className="app-container">
      {/* Fallback initializer to ensure metaverse works even with errors */}
      {error && <FallbackMetaverseInitializer />}
      
      {/* Error message */}
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      
      {/* VR Button */}
      <div className={isEmbedded ? "vr-button-container embedded" : "vr-button-container"}>
        <VRButton 
          className="vr-button"
          sessionInit={{
            optionalFeatures: ['local-floor', 'hand-tracking']
          }}
          ref={vrButtonRef}
        />
      </div>
      
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <XR 
          onSessionStart={handleSessionStart}
          onSessionEnd={handleSessionEnd}
        >
          {/* Добавляем обработчик сообщений для iframe интеграции */}
          <MessageHandler />
          
          <Stats />
          <Sky sunPosition={[100, 10, 100]} />
          <ambientLight intensity={0.8} />
          <directionalLight
            castShadow
            position={[10, 10, 10]}
            intensity={1.5}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Показываем OrbitControls только если не в VR */}
          {!isInVR && <OrbitControls />}
          
          {/* VR контроллеры */}
          <Controllers />
          <Hands />
          
          <MetaverseScene />
        </XR>
      </Canvas>

      {/* UI Overlay - показываем 2D UI только если не в VR */}
      {!isInVR && <UI />}

      {/* Статус подключения */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        {isConnected ? 'Connected to Metaverse' : 'Offline Mode'}
      </div>
    </div>
  );
}

export default App; 