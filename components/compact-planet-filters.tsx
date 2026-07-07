'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Filter, RotateCcw } from 'lucide-react'
import { PLANETS } from '@/lib/constants'
import type { CompactPlanetFiltersProps } from '@/lib/types'
import { outlineButtonHoverClass } from '@/lib/ui-classes'

export function CompactPlanetFilters({
  filters,
  onFilterChange,
  onResetFilters,
}: CompactPlanetFiltersProps) {
  const [open, setOpen] = useState(false)
  const selectedCount = Object.values(filters).filter(Boolean).length
  const totalCount = PLANETS.length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`gap-2 ${outlineButtonHoverClass}`}>
          <Filter className="h-4 w-4" />
          Filtros
          <Badge variant="secondary" className="ml-1">
            {selectedCount}/{totalCount}
          </Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Filtros de Planetas
              </DialogTitle>
              <DialogDescription>
                Selecciona qué planetas mostrar en los resultados
              </DialogDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onResetFilters} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetear
            </Button>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {PLANETS.map((planet) => (
            <div
              key={planet.name}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                id={planet.name}
                checked={filters[planet.name] || false}
                onCheckedChange={(checked) => onFilterChange(planet.name, checked as boolean)}
              />
              <label
                htmlFor={planet.name}
                className="text-sm font-medium leading-none cursor-pointer flex items-center gap-2"
              >
                <span className="text-lg">{planet.emoji}</span>
                <span>{planet.name}</span>
              </label>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}