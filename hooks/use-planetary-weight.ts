'use client'
import { useState, useCallback, useMemo, useEffect } from 'react'
import type { WeightResult, WeightUnit, WeightCalculation, PlanetFilter, SortByOption, SortDirection } from '@/lib/types'
import { PLANETS, WEIGHT_LIMITS } from '@/lib/constants'
import { toWeightInKg, convertPlanetWeight, convertInputWeight, buildResults, createCalculationId, validateWeightInput, formatPlanetWeight, getObjectComparison, createInitialPlanetFilters } from '@/lib/planetary-calculations'
import { loadHistory, saveHistory, clearStoredHistory, prependHistoryEntry } from '@/lib/history-storage'

export const usePlanetaryWeight = () => {
  const [weight, setWeight] = useState<number | null>(null)
  const [unit, setUnit] = useState<WeightUnit>('kg')
  const [results, setResults] = useState<WeightResult[]>([])
  const [validationError, setValidationError] = useState<string | null>(null)
  const [calculationHistory, setCalculationHistory] = useState<WeightCalculation[]>([])
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [sortBy, setSortBy] = useState<SortByOption>('weight')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [planetFilters, setPlanetFilters] = useState<PlanetFilter>(createInitialPlanetFilters)

  useEffect(() => {
    setCalculationHistory(loadHistory())
    setHistoryLoaded(true)
  }, [])

  useEffect(() => {
    if (!historyLoaded) return
    saveHistory(calculationHistory)
  }, [calculationHistory, historyLoaded])

  const applyCalculation = useCallback((inputWeight: number, currentUnit: WeightUnit) => {
    const newResults = buildResults(toWeightInKg(inputWeight, currentUnit))
    setResults(newResults)
    setCalculationHistory((prev) =>
      prependHistoryEntry(prev, {
        id: createCalculationId(inputWeight, currentUnit),
        inputWeight,
        unit: currentUnit,
        results: newResults,
        timestamp: new Date(),
      }),
    )
  }, [])

  const calculateWeights = useCallback(() => {
    const error = validateWeightInput(weight, unit)
    if (error) {
      setValidationError(error)
      return
    }
    setValidationError(null)
    applyCalculation(weight as number, unit)
  }, [weight, unit, applyCalculation])

  const clearResults = useCallback(() => {
    setResults([])
    setValidationError(null)
  }, [])

  const clearHistory = useCallback(() => {
    setCalculationHistory([])
    clearStoredHistory()
  }, [])

  const formatWeight = useCallback(
    (planetWeight: number, displayUnit: WeightUnit) =>
      formatPlanetWeight(planetWeight, displayUnit),
    [],
  )

  const compareObject = useCallback(
    (planetWeight: number) => getObjectComparison(planetWeight, unit),
    [unit],
  )

  const filteredResults = useMemo(() => {
    const filtered = results.filter((result) => planetFilters[result.planet])
    const mult = sortDirection === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      if (sortBy === 'name') return mult * a.planet.localeCompare(b.planet)
      return mult * (a.weight - b.weight)
    })
  }, [results, planetFilters, sortBy, sortDirection])

  const chartData = useMemo(
    () =>
      filteredResults.map((result) => ({
        name: result.planet,
        weight: convertPlanetWeight(result.weight, unit),
        gravity: result.gravity,
        emoji: result.emoji,
        color: result.color,
        objectComparison: getObjectComparison(result.weight, unit),
      })),
    [filteredResults, unit],
  )

  const handleFilterChange = useCallback((planetName: string, checked: boolean) => {
    setPlanetFilters((prev) => ({ ...prev, [planetName]: checked }))
  }, [])

  const resetFilters = useCallback(() => {
    setPlanetFilters(createInitialPlanetFilters())
  }, [])

  const handleUnitChange = useCallback(
    (newUnit: WeightUnit) => {
      if (newUnit === unit) return
      let newWeight = weight
      if (weight !== null) {
        newWeight = Math.round(convertInputWeight(weight, unit, newUnit) * 100) / 100
        const maxValue = newUnit === 'kg' ? WEIGHT_LIMITS.MAX_KG : WEIGHT_LIMITS.MAX_LBS
        if (newWeight > maxValue) {
          newWeight = null
        }
      }
      setUnit(newUnit)
      setWeight(newWeight)
      if (results.length > 0 && newWeight !== null && validateWeightInput(newWeight, newUnit) === null) {
        setValidationError(null)
        applyCalculation(newWeight, newUnit)
      }
    },
    [weight, unit, results.length, applyCalculation],
  )

  return {
    weight,
    unit,
    results: filteredResults,
    allResults: results,
    unfilteredResultsLength: results.length,
    validationError,
    calculationHistory,
    planetFilters,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    setWeight,
    setUnit: handleUnitChange,
    calculateWeights,
    clearResults,
    clearHistory,
    formatWeight,
    chartData,
    handleFilterChange,
    resetFilters,
    getObjectComparison: compareObject,
  }
}