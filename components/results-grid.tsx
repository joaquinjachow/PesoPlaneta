'use client'
import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertCircle, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react'
import { ChartSkeleton } from '@/components/chart-skeleton'
import { CompactPlanetFilters } from '@/components/compact-planet-filters'
import { ShareResultsButton } from '@/components/share-results-button'
import { CONVERSION_FACTORS } from '@/lib/constants'
import type { ResultsGridProps, SortByOption } from '@/lib/types'

const LazyWeightChart = dynamic(
  () => import('@/components/weight-chart').then((mod) => mod.WeightChart),
  { loading: () => <ChartSkeleton /> },
)

export function ResultsGrid({
  layoutKey,
  inputWeight,
  unit,
  results,
  shareResults,
  chartData,
  planetFilters,
  sortBy,
  sortDirection,
  onSortByChange,
  onSortDirectionToggle,
  onFilterChange,
  onResetFilters,
  formatWeight,
  getObjectComparison,
}: ResultsGridProps) {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-balance">Tu peso en el sistema solar</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-md border border-input bg-background">
            <Select value={sortBy} onValueChange={(value) => onSortByChange(value as SortByOption)}>
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
              onClick={onSortDirectionToggle}
              title={
                sortDirection === 'asc'
                  ? 'Ascendente (clic para descendente)'
                  : 'Descendente (clic para ascendente)'
              }
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
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
          />
          <ShareResultsButton
            inputWeight={inputWeight}
            unit={unit}
            results={shareResults}
            formatWeight={formatWeight}
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
          <div
            key={`grid-${layoutKey}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {results.map((result, index) => {
              const comparison = getObjectComparison(result.weight)
              const refWeightInUnit =
                unit === 'kg'
                  ? comparison?.object.weight
                  : (comparison?.object.weight ?? 0) * CONVERSION_FACTORS.KG_TO_LBS
              const refWeightFormatted =
                comparison && refWeightInUnit !== undefined
                  ? unit === 'kg'
                    ? refWeightInUnit.toFixed(0)
                    : refWeightInUnit.toFixed(1)
                  : null
              return (
                <Card
                  key={result.planet}
                  className="border-border/50 bg-card/80 backdrop-blur-sm transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{result.emoji}</div>
                    <h3 className="font-bold text-lg mb-2">{result.planet}</h3>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {formatWeight(result.weight, unit)}
                    </div>
                    <Badge variant="secondary" className="text-xs mb-2">
                      Gravedad: {result.gravity}x
                    </Badge>
                    {comparison && refWeightFormatted && (
                      <div className="mt-2 p-2 bg-muted/30 rounded-lg">
                        <div className="text-sm font-medium text-foreground">
                          ≈ {comparison.equivalent.toFixed(1)} {comparison.object.emoji}
                        </div>
                        <div className="text-xs text-muted-foreground">{comparison.object.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Referencia: {refWeightFormatted} {unit}
                        </div>
                      </div>
                    )}
                    {result.planet === 'Tierra' && (
                      <Badge variant="default" className="mt-2 text-xs">
                        Referencia
                      </Badge>
                    )}
                    {result.description && (
                      <p className="text-xs text-muted-foreground mt-2">{result.description}</p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}