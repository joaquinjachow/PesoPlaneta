import { PLANETS, WEIGHT_LIMITS, CONVERSION_FACTORS, EVERYDAY_OBJECTS } from '@/lib/constants'
import type { EverydayObject, ObjectComparisonResult, WeightResult, WeightUnit } from '@/lib/types'

export function toWeightInKg(inputWeight: number, unit: WeightUnit): number {
  return unit === 'kg' ? inputWeight : inputWeight * CONVERSION_FACTORS.LBS_TO_KG
}

export function convertPlanetWeight(weightInKg: number, targetUnit: WeightUnit): number {
  return targetUnit === 'kg' ? weightInKg : weightInKg * CONVERSION_FACTORS.KG_TO_LBS
}

export function convertInputWeight(value: number, fromUnit: WeightUnit, toUnit: WeightUnit): number {
  if (fromUnit === toUnit) return value
  const weightInKg = toWeightInKg(value, fromUnit)
  return convertPlanetWeight(weightInKg, toUnit)
}

export function buildResults(weightInKg: number): WeightResult[] {
  return PLANETS.map((planet) => ({
    planet: planet.name,
    weight: weightInKg * planet.gravity,
    gravity: planet.gravity,
    color: planet.color,
    emoji: planet.emoji,
    description: planet.description,
  }))
}

export function createCalculationId(inputWeight: number, unit: WeightUnit): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `calc-${Date.now()}-${inputWeight}-${unit}`
}

export function validateWeightInput(
  inputWeight: number | null,
  currentUnit: WeightUnit,
): string | null {
  if (inputWeight === null) {
    return 'Por favor ingresa tu peso'
  }
  if (inputWeight <= 0) {
    return 'El peso debe ser mayor a 0'
  }
  const limits =
    currentUnit === 'kg'
      ? { min: WEIGHT_LIMITS.MIN_KG, max: WEIGHT_LIMITS.MAX_KG }
      : { min: WEIGHT_LIMITS.MIN_LBS, max: WEIGHT_LIMITS.MAX_LBS }
  if (inputWeight < limits.min || inputWeight > limits.max) {
    const unitText = currentUnit === 'kg' ? 'kg' : 'lbs'
    return `El peso debe estar entre ${limits.min} y ${limits.max} ${unitText}`
  }
  return null
}

export function formatPlanetWeight(planetWeight: number, displayUnit: WeightUnit): string {
  const convertedWeight = convertPlanetWeight(planetWeight, displayUnit)
  const unitText = displayUnit === 'kg' ? 'kg' : 'lbs'
  return `${convertedWeight.toFixed(2)} ${unitText}`
}

export function getObjectComparison(
  planetWeight: number,
  unit: WeightUnit,
): ObjectComparisonResult | null {
  const targetWeight = convertPlanetWeight(planetWeight, unit)
  let closestObject: EverydayObject = EVERYDAY_OBJECTS[0]
  let minDifference = Math.abs(targetWeight - closestObject.weight)
  for (const obj of EVERYDAY_OBJECTS) {
    const difference = Math.abs(targetWeight - obj.weight)
    if (difference < minDifference) {
      minDifference = difference
      closestObject = obj
    }
  }
  const equivalent = targetWeight / closestObject.weight
  if (equivalent >= 0.1 && equivalent <= 100) {
    return { object: closestObject, equivalent }
  }
  return null
}

export function createInitialPlanetFilters(): Record<string, boolean> {
  return Object.fromEntries(PLANETS.map((planet) => [planet.name, true]))
}