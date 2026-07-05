import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { PWARegister } from '@/components/pwa-register'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://peso-planeta.vercel.app'),
  title: {
    default: 'Peso Planetario | Calculadora de peso en otros planetas',
    template: '%s | Peso Planetario',
  },
  description: 'Calculadora de peso planetario - Descubre cuánto pesarías en Mercurio, Venus, Marte, Júpiter y más. Ingresa tu peso en kg o lbs y explora la gravedad del sistema solar.',
  keywords: ['peso planetario', 'gravedad', 'planetas', 'calculadora', 'espacio', 'sistema solar', 'peso en la luna', 'peso en marte'],
  authors: [{ name: 'Peso Planetario App' }],
  openGraph: {
    title: 'Peso Planetario | Calculadora de peso en otros planetas',
    description: 'Descubre cuánto pesarías en diferentes planetas del sistema solar. Calculadora gratuita en español.',
    type: 'website',
    locale: 'es',
    url: '/',
    siteName: 'Peso Planetario',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Peso Planetario — Calculadora de peso en otros planetas',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    title: 'Peso Planetario',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#030712' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Peso Planetario',
    description: 'Calculadora para saber cuánto pesarías en diferentes planetas del sistema solar según su gravedad.',
    applicationCategory: 'UtilitiesApplication',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: 'Cálculo de peso en Mercurio, Venus, Tierra, Marte, Júpiter, Saturno, Urano, Neptuno, Plutón, Luna y Sol; unidades kg y lbs; gráficos y comparación con objetos cotidianos.',
    inLanguage: 'es',
  }

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <PWARegister />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}