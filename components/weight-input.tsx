'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Weight, AlertCircle } from 'lucide-react'
import { WEIGHT_LIMITS } from '@/lib/constants'
import type { WeightInputProps, WeightUnit } from '@/lib/types'
import { outlineButtonHoverClass } from '@/lib/ui-classes'

export function WeightInput({
  weight,
  unit,
  validationError,
  hasResults,
  onWeightChange,
  onUnitChange,
  onCalculate,
  onClearResults,
  onKeyDown,
}: WeightInputProps) {
  const maxValue = unit === 'kg' ? WEIGHT_LIMITS.MAX_KG : WEIGHT_LIMITS.MAX_LBS

  return (
    <Card className="max-w-2xl mx-auto mb-12 border-border/50 bg-card/80 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Weight className="h-6 w-6 text-primary" />
          Calculadora Intergaláctica
        </CardTitle>
        <CardDescription className="text-base">
          Ingresa tu peso y selecciona la unidad de medida
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
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
              value={weight ?? ''}
              onChange={(event) => {
                const value = event.target.value
                if (value === '') {
                  onWeightChange(null)
                  return
                }
                const numValue = Number.parseFloat(value)
                if (Number.isNaN(numValue) || numValue > maxValue) {
                  return
                }
                onWeightChange(numValue)
              }}
              onKeyDown={onKeyDown}
              className="text-lg font-normal"
              style={{ height: '48px' }}
              autoComplete="off"
              autoFocus
              max={maxValue}
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
            <Select value={unit} onValueChange={(value) => onUnitChange(value as WeightUnit)}>
              <SelectTrigger
                id="unit"
                aria-label="Unidad de peso"
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
            onClick={onCalculate}
            className="w-full h-12 text-lg font-semibold"
            disabled={weight === null}
          >
            🚀 Calcular Peso Planetario
          </Button>
          {hasResults && (
            <Button
              onClick={onClearResults}
              variant="outline"
              className={`w-full h-12 ${outlineButtonHoverClass}`}
            >
              Limpiar Resultados
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}