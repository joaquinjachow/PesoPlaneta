import { Rocket, Plane as Planet } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function PageHeader() {
  return (
    <div className="flex justify-between items-start mb-8">
      <div className="flex-1">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Calculadora de Peso Planetario
            </h1>
            <Planet className="h-8 w-8 text-accent animate-float" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubre cuánto pesarías en diferentes planetas del sistema solar. Ingresa tu peso y
            explora la gravedad del universo.
          </p>
        </div>
      </div>
      <ThemeToggle />
    </div>
  )
}