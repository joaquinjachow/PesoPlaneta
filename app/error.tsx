'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SpacePageLayout } from '@/components/space-page-layout'

import type { ErrorPageProps } from '@/lib/types'

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('[Peso Planetario]', error)
  }, [error])

  return (
    <SpacePageLayout>
      <Card className="max-w-lg w-full border-border/50 bg-card/80 backdrop-blur-sm text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-destructive animate-float" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Algo salió mal
          </CardTitle>
          <CardDescription className="text-base">La nave se desvió de su órbita</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Ocurrió un error inesperado. Podés intentar de nuevo o volver al inicio para continuar
            explorando el sistema solar.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={reset} className="flex-1 h-12">
              <RefreshCw className="h-5 w-5 mr-2" />
              Reintentar
            </Button>
            <Button asChild variant="outline" className="flex-1 h-12 text-white">
              <Link href="/">
                <Home className="h-5 w-5 mr-2 text-white" />
                Volver al inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </SpacePageLayout>
  )
}