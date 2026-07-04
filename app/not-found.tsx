import Link from 'next/link'
import { Rocket, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SpacePageLayout } from '@/components/space-page-layout'

export default function NotFound() {
  return (
    <SpacePageLayout>
      <Card className="max-w-lg w-full border-border/50 bg-card/80 backdrop-blur-sm text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Rocket className="h-12 w-12 text-primary animate-float" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            404
          </CardTitle>
          <CardDescription className="text-base">
            Este planeta no existe en nuestro sistema solar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            La ruta que buscás se perdió en el espacio. Volvé a la Tierra para seguir calculando tu
            peso en otros planetas.
          </p>
          <Button asChild className="w-full h-12 text-lg text-white">
            <Link href="/">
              <Home className="h-5 w-5 mr-2 text-white" />
              Volver al inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </SpacePageLayout>
  )
}
