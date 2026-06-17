'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

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
    if (typeof window === 'undefined') return
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      toast.info('Instalable', {
        description: 'Puedes instalar Peso Planetario en tu dispositivo para usarlo como app.',
        duration: 6000,
        action: {
          label: 'Entendido',
          onClick: () => {},
        },
      })
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])
  return null
}