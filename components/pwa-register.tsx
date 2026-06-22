'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

const INSTALL_HINT_KEY = 'pwa-install-hint-shown'

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

function isIOS(): boolean {
  const ua = window.navigator.userAgent
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
  )
}

function isAndroid(): boolean {
  return /Android/i.test(window.navigator.userAgent)
}

function showInstallHint(description: string) {
  if (sessionStorage.getItem(INSTALL_HINT_KEY)) return
  sessionStorage.setItem(INSTALL_HINT_KEY, '1')

  toast.info('Instalable', {
    description,
    duration: 8000,
    action: {
      label: 'Entendido',
      onClick: () => {},
    },
  })
}

export function PWARegister() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return
    window.navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('[PWA] Service worker registrado:', reg.scope)
        }
      })
      .catch(() => {
        toast.error('No se pudo activar la app sin conexión', {
          description: 'La instalación offline no está disponible.',
          duration: 5000,
        })
      })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || isStandalone()) return

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      showInstallHint(
        'Puedes instalar Peso Planetario en tu dispositivo para usarlo como app.',
      )
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    // iOS/Safari no implementa beforeinstallprompt; solo permite "Añadir a inicio" manualmente.
    if (isIOS()) {
      const timer = window.setTimeout(() => {
        showInstallHint(
          'En Safari, tocá Compartir (□↑) y elegí "Añadir a la pantalla de inicio".',
        )
      }, 2000)
      return () => {
        window.clearTimeout(timer)
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }

    // Android: si Chrome aún no dispara el evento (criterios de engagement), mostrar instrucciones.
    if (isAndroid()) {
      const timer = window.setTimeout(() => {
        if (!sessionStorage.getItem(INSTALL_HINT_KEY)) {
          showInstallHint(
            'En Chrome, abrí el menú (⋮) y elegí "Instalar aplicación" o "Añadir a la pantalla de inicio".',
          )
        }
      }, 4000)
      return () => {
        window.clearTimeout(timer)
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  return null
}
