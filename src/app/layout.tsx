import type { Metadata } from 'next'
import { Montserrat, Poppins, Open_Sans, Roboto, Lato, Source_Sans_3, Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import '../styles/main.css'
import '@/styles/dynamicStyles.css'
import GlobalAIChat from '../components/shared/GlobalAIChat'
import { RiveAnimationProvider } from '../components/RiveAnimationProvider'
import { LanguageProvider } from '../components/shared/LanguageProvider'
import { DeviceDetectProvider } from '../components/shared/DeviceDetect'

const montserrat = Montserrat({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  preload: true
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  preload: false
})

const opensans = Open_Sans({ 
  subsets: ['latin', 'cyrillic'],
  variable: '--font-opensans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false
})

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-roboto',
  display: 'swap',
  preload: false
})

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
  preload: false
})

const sourcesans = Source_Sans_3({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sourcesans',
  display: 'swap',
  preload: false
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  preload: true
})

export const metadata: Metadata = {
  title: 'Lucky Train - Футуристический Стейкинг TON | Futuristic TON Staking',
  description: 'Инновационная платформа для стейкинга TON с высокой доходностью, торговая платформа, обучение трейдингу и метавселенная в одной экосистеме | Innovative TON staking platform with high returns, trading platform, trading education, and metaverse in one ecosystem',
  keywords: 'Lucky Train, TON, стейкинг, блокчейн, инвестиции, криптовалюта, метавселенная, VR, виртуальная реальность, staking, blockchain, investments, cryptocurrency, metaverse, virtual reality',
  authors: [{ name: 'Lucky Train Team' }],
  openGraph: {
    title: 'Lucky Train - Футуристический Стейкинг TON | Futuristic TON Staking',
    description: 'Инновационная платформа для стейкинга TON с высокой доходностью | Innovative TON staking platform with high returns',
    images: ['/images/lucky-train-og.jpg'],
  },
  themeColor: '#50E3C2',
  other: {
    'xr-spatial-tracking': 'true',
    'apple-mobile-web-app-capable': 'yes',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className={`scroll-smooth ${montserrat.variable} ${poppins.variable} ${opensans.variable} ${roboto.variable} ${lato.variable} ${sourcesans.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
        <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap" />
        <Script 
          src="https://cdn.jsdelivr.net/npm/webxr-polyfill@latest/build/webxr-polyfill.js"
          strategy="beforeInteractive"
        />
        <Script 
          id="webxr-polyfill-init"
          strategy="afterInteractive"
        >
          {`
            if (window.WebXRPolyfill) {
              new WebXRPolyfill();
            }
          `}
        </Script>
        <style dangerouslySetInnerHTML={{
          __html: `
            .vr-button {
              position: fixed;
              bottom: 16px;
              right: 16px;
              background: rgba(80, 227, 194, 0.7);
              color: #333;
              font-family: var(--font-poppins);
              border: none;
              border-radius: 4px;
              padding: 6px 12px;
              font-size: 13px;
              cursor: pointer;
              z-index: 1000;
              transition: all 0.2s ease;
              box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
            }
            .vr-button:hover {
              background: rgba(80, 227, 194, 0.9);
              transform: translateY(-2px);
              box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
            }
            .vr-button:disabled {
              background: rgba(200, 200, 200, 0.5);
              color: #666;
              cursor: not-allowed;
              box-shadow: none;
            }
            
            /* Added responsive mobile and tablet styles */
            @media (max-width: 768px) {
              .container {
                padding-left: 12px;
                padding-right: 12px;
              }
              
              .vr-button {
                bottom: 12px;
                right: 12px;
                padding: 5px 10px;
                font-size: 12px;
              }
            }
            
            /* iOS & Android specific adjustments */
            @supports (-webkit-touch-callout: none) {
              /* iOS specific styles */
              body {
                overflow-y: scroll;
              }
              
              /* Fix for iOS notch */
              .safe-area-padding {
                padding-top: env(safe-area-inset-top);
                padding-bottom: env(safe-area-inset-bottom);
                padding-left: env(safe-area-inset-left);
                padding-right: env(safe-area-inset-right);
              }
              
              /* Fix for iOS button appearance */
              button {
                -webkit-appearance: none;
                appearance: none;
              }
            }
            
            /* Additional responsive utilities */
            .hide-on-mobile {
              @media (max-width: 640px) {
                display: none !important;
              }
            }
            
            .show-on-mobile {
              @media (min-width: 641px) {
                display: none !important;
              }
            }
            
            /* Make sure canvas elements are properly sized */
            canvas {
              width: 100% !important;
              height: auto !important;
              max-height: 70vh !important;
            }
            
            /* Reduce oversized elements on mobile */
            @media (max-width: 640px) {
              .mechanical-card {
                transform: scale(0.95);
              }
              
              .dashboard, .glass {
                padding: 0.75rem !important;
              }
              
              .stats-container > div {
                padding: 0.75rem !important;
              }
              
              .feature-box {
                padding: 1rem !important;
              }
            }
          `
        }} />
      </head>
      <body className="font-inter text-dark-text">
        <DeviceDetectProvider>
          <LanguageProvider>
            <RiveAnimationProvider defaultTheme="futuristic" defaultUseAnimations={true}>
              {children}
              <GlobalAIChat />
            </RiveAnimationProvider>
          </LanguageProvider>
        </DeviceDetectProvider>
      </body>
    </html>
  )
} 