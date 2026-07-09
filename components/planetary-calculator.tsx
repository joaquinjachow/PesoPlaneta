'use client'
import { useRef, useEffect } from 'react'
import type React from 'react'
import { WeightInput } from '@/components/weight-input'
import { ResultsGrid } from '@/components/results-grid'
import { CalculationHistory } from '@/components/calculation-history'
import { usePlanetaryWeight } from '@/hooks/use-planetary-weight'
import { useLayoutKey } from '@/hooks/use-layout-key'

export function PlanetaryCalculator() {
  const resultsRef = useRef<HTMLDivElement>(null)
  const shouldFocusAfterResultsRef = useRef(false)
  const layoutKey = useLayoutKey()
  const {
    weight,
    unit,
    results,
    allResults,
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
      const timer = setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [unfilteredResultsLength])

  const handleCalculate = () => {
    shouldFocusAfterResultsRef.current = true
    calculateWeights()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCalculate()
    }
  }

  return (
    <>
      <WeightInput
        weight={weight}
        unit={unit}
        validationError={validationError}
        hasResults={unfilteredResultsLength > 0}
        onWeightChange={setWeight}
        onUnitChange={setUnit}
        onCalculate={handleCalculate}
        onClearResults={clearResults}
        onKeyDown={handleKeyDown}
      />
      {unfilteredResultsLength > 0 && weight !== null && (
        <div
          ref={resultsRef}
          className="max-w-6xl mx-auto space-y-8 focus:outline-none"
          tabIndex={-1}
          aria-label="Resultados del peso en cada planeta"
        >
          <ResultsGrid
            layoutKey={layoutKey}
            inputWeight={weight}
            unit={unit}
            results={results}
            shareResults={allResults}
            chartData={chartData}
            planetFilters={planetFilters}
            sortBy={sortBy}
            sortDirection={sortDirection}
            onSortByChange={setSortBy}
            onSortDirectionToggle={() =>
              setSortDirection((direction) => (direction === 'asc' ? 'desc' : 'asc'))
            }
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            formatWeight={formatWeight}
            getObjectComparison={getObjectComparison}
          />
        </div>
      )}
      {calculationHistory.length > 0 && (
        <div className="max-w-6xl mx-auto mt-8">
          <CalculationHistory
            history={calculationHistory}
            onClearHistory={clearHistory}
            formatWeight={(planetWeight, historyUnit) =>
              formatWeight(planetWeight, historyUnit as 'kg' | 'lbs')
            }
          />
        </div>
      )}
    </>
  )
}