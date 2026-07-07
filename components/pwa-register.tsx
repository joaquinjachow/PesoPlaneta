'use client'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import type { BeforeInstallPromptEvent } from '@/lib/types'

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

function isSafari(): boolean {
  const ua = window.navigator.userAgent
  return /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS|Chrome/.test(ua)
}

function showInstallHint(description: string, actionLabel = 'Entendido', onAction?: () => void) {
  if (sessionStorage.getItem(INSTALL_HINT_KEY)) return
  sessionStorage.setItem(INSTALL_HINT_KEY, '1')

  toast.info('Instalable', {
    description,
    duration: 10000,
    action: {
      label: actionLabel,
      onClick: onAction ?? (() => {}),
    },
  })
}

export function PWARegister() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)

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
      deferredPrompt.current = e as BeforeInstallPromptEvent
      if (sessionStorage.getItem(INSTALL_HINT_KEY)) return
      sessionStorage.setItem(INSTALL_HINT_KEY, '1')
      toast.info('Instalable', {
        description: 'Puedes instalar Peso Planetario como app en tu dispositivo.',
        duration: 15000,
        action: {
          label: 'Instalar',
          onClick: () => {
            deferredPrompt.current?.prompt()
          },
        },
      })
    }
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    if (isIOS()) {
      const timer = window.setTimeout(() => {
        if (isSafari()) {
          showInstallHint(
            'Tocá el botón Compartir (□↑) y elegí "Añadir a la pantalla de inicio".',
          )
        } else {
          showInstallHint(
            'Para instalar la app, abrila en Safari → Compartir (□↑) → "Añadir a la pantalla de inicio". Chrome en iOS no permite instalar PWAs.',
          )
        }
      }, 2000)
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