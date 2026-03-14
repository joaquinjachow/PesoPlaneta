"use client"
import { useMemo, useRef, useEffect } from "react"
import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket, Plane as Planet, Weight, AlertCircle, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { LazyWeightChart } from "@/components/lazy-components"
import { CalculationHistory } from "@/components/calculation-history"
import { CompactPlanetFilters } from "@/components/compact-planet-filters"
import { CreativeFooter } from "@/components/creative-footer"
import { usePlanetaryWeight } from "@/hooks/use-planetary-weight"
import { useLayoutKey } from "@/hooks/use-layout-key"
import { CONVERSION_FACTORS } from "@/lib/constants"

export default function PlanetaryWeightCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const shouldFocusAfterResultsRef = useRef(false)
  const layoutKey = useLayoutKey()
  const {
    weight,
    unit,
    results,
    unfilteredResultsLength,
    validationError,
    calculationHistory,
    planetFilters,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    setWeight,
    setUnit,
    calculateWeights,
    clearResults,
    clearHistory,
    formatWeight,
    chartData,
    handleFilterChange,
    resetFilters,
    getObjectComparison,
  } = usePlanetaryWeight()

  useEffect(() => {
    if (unfilteredResultsLength > 0 && shouldFocusAfterResultsRef.current) {
      shouldFocusAfterResultsRef.current = false
      const t = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 600)
      return () => clearTimeout(t)
    }
  }, [unfilteredResultsLength])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      shouldFocusAfterResultsRef.current = true
      calculateWeights()
    }
  }

  const stars = useMemo(() => {
    const items = []
    for (let i = 0; i < 100; i++) {
      const size = Math.random() * 2 + 1
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 3
      items.push(
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
    return items
  }, [])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="starfield">{stars}</div>
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
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
          </div>
          <ThemeToggle />
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
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError.message}</AlertDescription>
              </Alert>
            )}
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
                  onChange={(e) => {
                    const value = e.target.value;
                    const numValue = parseFloat(value);
                    if (value === '') {
                      setWeight('');
                      return;
                    }
                    if (isNaN(numValue)) {
                      return;
                    }
                    const maxValue = unit === 'kg' ? 1000 : 2204.62;
                    if (numValue <= maxValue) {
                      setWeight(value);
                    }
                  }}
                  onKeyDown={handleKeyDown}
                  className="text-lg font-normal"
                  style={{ height: '48px' }}
                  autoComplete="off"
                  autoFocus
                  max={unit === 'kg' ? 1000 : 2204.62}
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  Rango: 0 - {unit === 'kg' ? '1000 kg' : '2204.62 lbs'}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium">
                  Unidad
                </Label>
                <Select value={unit} onValueChange={(value) => {
                  const newUnit = value as 'kg' | 'lbs';
                  setUnit(newUnit);
                  if (weight) {
                    const numWeight = parseFloat(weight);
                    const maxValue = newUnit === 'kg' ? 1000 : 2204.62;
                    if (numWeight > maxValue) {
                      setWeight('');
                    }
                  }
                }}>
                  <SelectTrigger 
                    className="text-lg font-normal"
                    style={{ height: '48px' }}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogramos (kg)</SelectItem>
                    <SelectItem value="lbs">Libras (lbs)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => {
                  shouldFocusAfterResultsRef.current = true
                  calculateWeights()
                }}
                className="w-full h-12 text-lg font-semibold"
                disabled={!weight || isNaN(Number(weight))}
              >
                🚀 Calcular Peso Planetario
              </Button>
              {unfilteredResultsLength > 0 && (
                <Button
                  onClick={clearResults}
                  variant="outline"
                  className="w-full h-12 hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black"
                >
                  Limpiar Resultados
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
        {unfilteredResultsLength > 0 && (
          <div
            ref={resultsRef}
            className="max-w-6xl mx-auto space-y-8 focus:outline-none"
            tabIndex={-1}
            aria-label="Resultados del peso en cada planeta"
          >
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-balance">Tu peso en el sistema solar</h2>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 rounded-md border border-input bg-background">
                  <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'weight' | 'name')}>
                    <SelectTrigger className="w-[170px] gap-2 border-0 shadow-none focus:ring-0">
                      <ArrowUpDown className="h-4 w-4 shrink-0" />
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weight">Por peso</SelectItem>
                      <SelectItem value="name">Por nombre</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0 rounded-l-none border-l border-input"
                    onClick={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
                    title={sortDirection === 'asc' ? 'Ascendente (clic para descendente)' : 'Descendente (clic para ascendente)'}
                  >
                    {sortDirection === 'asc' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <CompactPlanetFilters 
                  filters={planetFilters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={resetFilters}
                />
              </div>
            </div>
            {results.length === 0 ? (
              <Alert className="border-amber-500/50 bg-amber-500/10">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Activa al menos un planeta en los filtros para ver los resultados.
                </AlertDescription>
              </Alert>
            ) : (
              <>
            <div key={`chart-${layoutKey}`}>
              <LazyWeightChart data={chartData} unit={unit} />
            </div>
            <div key={`grid-${layoutKey}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {results.map((result, index) => (
                <Card
                  key={result.planet}
                  className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{result.emoji}</div>
                    <h3 className="font-bold text-lg mb-2">{result.planet}</h3>
                    <div className="text-2xl font-bold text-primary mb-2">{formatWeight(result.weight, unit)}</div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      Gravedad: {result.gravity}x
                    </Badge>
                    {(() => {
                      const comparison = getObjectComparison(result.weight, result.planet);
                      if (!comparison) return null;
                      const refWeightInUnit = unit === "kg" ? comparison.object.weight : comparison.object.weight * CONVERSION_FACTORS.KG_TO_LBS;
                      const refWeightFormatted = unit === "kg" ? refWeightInUnit.toFixed(0) : refWeightInUnit.toFixed(1);
                      return (
                        <div className="mt-2 p-2 bg-muted/30 rounded-lg">
                          <div className="text-sm font-medium text-foreground">
                            ≈ {comparison.equivalent.toFixed(1)} {comparison.object.emoji}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {comparison.object.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5">
                            Referencia: {refWeightFormatted} {unit}
                          </div>
                        </div>
                      );
                    })()}
                    {result.planet === "Tierra" && (
                      <Badge variant="default" className="mt-2 text-xs">
                        Referencia
                      </Badge>
                    )}
                    {result.description && (
                      <p className="text-xs text-muted-foreground mt-2">{result.description}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
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
              </>
            )}
          </div>
        )}
        {calculationHistory.length > 0 && (
          <div className="max-w-6xl mx-auto mt-8">
            <CalculationHistory 
              history={calculationHistory}
              onClearHistory={clearHistory}
              formatWeight={(weight: number, unit: string) => formatWeight(weight, unit as 'kg' | 'lbs')}
            />
          </div>
        )}
      </div>
      <CreativeFooter />
    </div>
  )
}