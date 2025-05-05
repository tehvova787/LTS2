import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const METAVERSE_BASE_PATH = path.join(process.cwd(), 'metaverse/frontend');
const FALLBACK_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TON Metaverse</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #121212;
      color: white;
      font-family: Arial, sans-serif;
      overflow: hidden;
    }
    .fallback-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-align: center;
      padding: 20px;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: #5ee7df;
    }
    p {
      max-width: 600px;
      margin-bottom: 2rem;
    }
    .scene {
      width: 100%;
      height: 70%;
      position: relative;
      perspective: 1000px;
    }
    .cube {
      width: 200px;
      height: 200px;
      position: absolute;
      left: 50%;
      top: 40%;
      transform-style: preserve-3d;
      transform: translate(-50%, -50%) rotateX(-20deg) rotateY(45deg);
      animation: rotate 8s infinite linear;
    }
    .face {
      position: absolute;
      width: 200px;
      height: 200px;
      background: rgba(0, 200, 255, 0.3);
      border: 2px solid #5ee7df;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
    }
    .front  { transform: rotateY(0deg) translateZ(100px); }
    .back   { transform: rotateY(180deg) translateZ(100px); }
    .right  { transform: rotateY(90deg) translateZ(100px); }
    .left   { transform: rotateY(-90deg) translateZ(100px); }
    .top    { transform: rotateX(90deg) translateZ(100px); }
    .bottom { transform: rotateX(-90deg) translateZ(100px); }
    
    @keyframes rotate {
      from { transform: translate(-50%, -50%) rotateX(-20deg) rotateY(0); }
      to { transform: translate(-50%, -50%) rotateX(-20deg) rotateY(360deg); }
    }
    
    /* Add stars background */
    .stars {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
    .stars:before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 4px);
      background-size: 100px 100px;
      background-position: 0 0;
      animation: stars 60s linear infinite;
    }
    @keyframes stars {
      from { background-position: 0 0; }
      to { background-position: -1000px 1000px; }
    }
  </style>
  
  <script>
    // Let parent window know we're showing fallback content
    window.addEventListener('load', function() {
      if (window.parent !== window) {
        window.parent.postMessage({ 
          type: 'metaverse-fallback-loaded', 
          reason: 'Метавселенная загружается в резервном режиме'
        }, '*');
      }
    });
  </script>
</head>
<body>
  <div class="stars"></div>
  <div class="fallback-container">
    <h1>TON Метавселенная</h1>
    <p>Загрузка метавселенной в резервном режиме. Возможно, не удалось загрузить некоторые ресурсы или требуется подключение к серверу.</p>
    
    <div class="scene">
      <div class="cube">
        <div class="face front">TON</div>
        <div class="face back">TON</div>
        <div class="face right">TON</div>
        <div class="face left">TON</div>
        <div class="face top">TON</div>
        <div class="face bottom">TON</div>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Расширенный список MIME-типов
const mimeTypes: Record<string, string> = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.fbx': 'application/octet-stream',
  '.obj': 'text/plain',
  '.mtl': 'text/plain',
  '.hdr': 'application/octet-stream',
};

// Проверка, является ли путь директорией
function isDirectory(path: string): boolean {
  try {
    return fs.statSync(path).isDirectory();
  } catch (error) {
    return false;
  }
}

// Serve fallback HTML when metaverse frontend is unavailable
function serveFallbackHTML() {
  return new NextResponse(FALLBACK_HTML, {
    status: 200,
    headers: { 'Content-Type': 'text/html' },
  });
}

// Обработчик GET-запросов
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  let pathName = url.pathname.replace('/api/metaverse-proxy', '');
  
  // Check if the metaverse frontend directory exists
  if (!fs.existsSync(METAVERSE_BASE_PATH)) {
    console.error(`Metaverse frontend directory not found: ${METAVERSE_BASE_PATH}`);
    return serveFallbackHTML();
  }
  
  // Если путь пустой или содержит только '/', возвращаем index.html
  if (pathName === '' || pathName === '/') {
    pathName = '/index.html';
  }
  
  let filePath = path.join(METAVERSE_BASE_PATH, pathName);
  
  // Обработка путей, которые заканчиваются на '/'
  if (pathName.endsWith('/') && isDirectory(filePath)) {
    filePath = path.join(filePath, 'index.html');
  }
  
  try {
    // Проверка существования файла
    if (!fs.existsSync(filePath)) {
      console.warn(`Файл не найден: ${filePath}`);
      
      // Проверяем, возможно это запрос к Vite dev-серверу
      if (pathName.startsWith('/@vite/')) {
        // Пытаемся перенаправить к соответствующему файлу в node_modules
        const vitePath = path.join(process.cwd(), 'node_modules', pathName.replace('/@vite/', ''));
        if (fs.existsSync(vitePath)) {
          filePath = vitePath;
        } else {
          // If this is a request for the index page and we couldn't find it, show fallback
          if (pathName === '/index.html') {
            return serveFallbackHTML();
          }
          
          return new NextResponse(JSON.stringify({ error: 'Vite модуль не найден' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      } else {
        // If the file is not found, return a friendly 404 or fallback for HTML requests
        if (pathName.endsWith('.html')) {
          return serveFallbackHTML();
        }
        
        return new NextResponse(JSON.stringify({ error: 'Файл не найден' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    
    // Чтение файла
    const content = fs.readFileSync(filePath);
    
    // Определение MIME-типа
    const extension = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extension] || 'application/octet-stream';
    
    // Если это HTML файл, модифицируем его для поддержки WebXR в iframe
    if (extension === '.html') {
      let htmlContent = content.toString();
      
      // Add error handling for common JS load errors
      if (!htmlContent.includes('window.onerror')) {
        htmlContent = htmlContent.replace(
          '</head>',
          `<script>
    // Global error handler
    window.onerror = function(message, source, lineno, colno, error) {
      console.error('Caught error:', error);
      
      // Notify parent window about errors
      if (window.parent !== window) {
        window.parent.postMessage({ 
          type: 'metaverse-error', 
          error: message,
          source: source,
          lineno: lineno
        }, '*');
      }
      
      return false; // Let normal error handling continue
    };
    
    // Handle Promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled promise rejection:', event.reason);
      
      // Notify parent window about unhandled promise rejections
      if (window.parent !== window) {
        window.parent.postMessage({ 
          type: 'metaverse-error', 
          error: 'Unhandled promise rejection: ' + event.reason
        }, '*');
      }
    });
  </script>
</head>`
        );
      }
      
      // Добавляем мета-тег для поддержки WebXR в iframe
      if (!htmlContent.includes('xr-spatial-tracking')) {
        htmlContent = htmlContent.replace(
          '<head>',
          `<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta http-equiv="origin-trial" content="your-token-here">
    <script>
      // Инициализация WebXR для iframe
      window.addEventListener('load', function() {
        if (navigator.xr && typeof document.createElement('iframe').requestFullscreen === 'function') {
          // Сообщаем родительскому окну о готовности поддержки WebXR
          window.parent.postMessage({ type: 'webxr-ready' }, '*');
        }
      });
    </script>`
        );
      }
      
      return new NextResponse(htmlContent, {
        status: 200,
        headers: { 'Content-Type': contentType },
      });
    }
    
    // Для всех остальных файлов возвращаем контент как есть
    return new NextResponse(content, {
      status: 200,
      headers: { 'Content-Type': contentType },
    });
    
  } catch (error) {
    console.error('Ошибка обработки запроса к метавселенной:', error);
    
    // Check if this is an HTML request, in which case return fallback HTML
    if (pathName.endsWith('.html') || pathName === '/' || pathName === '') {
      return serveFallbackHTML();
    }
    
    return new NextResponse(JSON.stringify({ error: 'Внутренняя ошибка сервера', details: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
} 