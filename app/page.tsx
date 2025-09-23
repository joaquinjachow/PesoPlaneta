"use client"
import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Rocket, Plane as Planet, Weight } from "lucide-react"

// Planetary gravity data (relative to Earth = 1)
const planets = [
  { name: "Mercurio", gravity: 0.378, color: "bg-orange-500", emoji: "☿️" },
  { name: "Venus", gravity: 0.907, color: "bg-yellow-500", emoji: "♀️" },
  { name: "Tierra", gravity: 1.0, color: "bg-blue-500", emoji: "🌍" },
  { name: "Marte", gravity: 0.377, color: "bg-red-500", emoji: "♂️" },
  { name: "Júpiter", gravity: 2.36, color: "bg-orange-600", emoji: "♃" },
  { name: "Saturno", gravity: 0.916, color: "bg-yellow-600", emoji: "♄" },
  { name: "Urano", gravity: 0.889, color: "bg-cyan-500", emoji: "♅" },
  { name: "Neptuno", gravity: 1.13, color: "bg-blue-600", emoji: "♆" },
  { name: "Plutón", gravity: 0.071, color: "bg-gray-500", emoji: "♇" },
  { name: "Luna", gravity: 0.166, color: "bg-gray-300", emoji: "🌙" },
  { name: "Sol", gravity: 27.01, color: "bg-yellow-400", emoji: "☀️" },
]

export default function PlanetaryWeightCalculator() {
  const [weight, setWeight] = useState("")
  const [unit, setUnit] = useState("kg")
  const [results, setResults] = useState<
    Array<{ planet: string; weight: number; gravity: number; color: string; emoji: string }>
  >([])

  const calculateWeights = () => {
    if (!weight || isNaN(Number(weight))) return
    const inputWeight = Number(weight)
    const newResults = planets.map((planet) => ({
      planet: planet.name,
      weight: inputWeight * planet.gravity,
      gravity: planet.gravity,
      color: planet.color,
      emoji: planet.emoji,
    }))
    setResults(newResults)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      calculateWeights()
    }
  }

  const convertWeight = (planetWeight: number) => {
    if (unit === "kg") {
      return `${planetWeight.toFixed(2)} kg`
    } else {
      return `${(planetWeight * 2.20462).toFixed(2)} lbs`
    }
  }

  const generateStars = () => {
    const stars = []
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 2 + 1
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 3
      stars.push(
        <div
          key={i}
          className="star animate-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`,
          }}
        />,
      )
    }
    return stars
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="starfield">{generateStars()}</div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className="h-8 w-8 text-primary animate-float" />
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Calculadora de Peso Planetario
            </h1>
            <Planet className="h-8 w-8 text-accent animate-float" style={{ animationDelay: "1s" }} />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubre cuánto pesarías en diferentes planetas del sistema solar. Ingresa tu peso y explora la gravedad del
            universo.
          </p>
        </div>
        <Card className="max-w-2xl mx-auto mb-12 border-border/50 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-2xl">
              <Weight className="h-6 w-6 text-primary" />
              Calculadora Intergaláctica
            </CardTitle>
            <CardDescription className="text-base">Ingresa tu peso y selecciona la unidad de medida</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-sm font-medium">
                  Tu peso
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ej: 70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-lg h-12"
                  autoComplete="off"
                  autoFocus
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium">
                  Unidad
                </Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                    <SelectItem value="lbs">Libras (lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={calculateWeights}
              className="w-full h-12 text-lg font-semibold"
              disabled={!weight || isNaN(Number(weight))}
            >
              🚀 Calcular Peso Planetario
            </Button>
          </CardContent>
        </Card>
        {results.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-balance">Tu peso en el sistema solar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((result, index) => (
                <Card
                  key={result.planet}
                  className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{result.emoji}</div>
                    <h3 className="font-bold text-lg mb-2">{result.planet}</h3>
                    <div className="text-2xl font-bold text-primary mb-2">{convertWeight(result.weight)}</div>
                    <Badge variant="secondary" className="text-xs">
                      Gravedad: {result.gravity}x
                    </Badge>
                    {result.planet === "Tierra" && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Referencia
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-12 border-border/50 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-xl">🌟 Datos Curiosos</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3 text-muted-foreground">
                <p>• En Júpiter pesarías más del doble debido a su enorme gravedad</p>
                <p>• En la Luna pesarías solo 1/6 de tu peso terrestre</p>
                <p>• En el Sol pesarías 27 veces más (¡pero no podrías sobrevivir!)</p>
                <p>• Plutón tiene tan poca gravedad que apenas sentirías peso</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}