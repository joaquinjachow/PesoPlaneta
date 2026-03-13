import { useState, useCallback, useMemo } from 'react';
import { WeightResult, WeightUnit, ValidationError, WeightCalculation, PlanetFilter, ObjectComparisonResult, SortByOption, SortDirection } from '@/lib/types';
import { PLANETS, WEIGHT_LIMITS, CONVERSION_FACTORS, EVERYDAY_OBJECTS } from '@/lib/constants';

export const usePlanetaryWeight = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<WeightUnit>('kg');
  const [results, setResults] = useState<WeightResult[]>([]);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<WeightCalculation[]>([]);
  const [sortBy, setSortBy] = useState<SortByOption>('weight');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [planetFilters, setPlanetFilters] = useState<PlanetFilter>(() => {
    const initialFilters: PlanetFilter = {};
    PLANETS.forEach(planet => {
      initialFilters[planet.name] = true;
    });
    return initialFilters;
  });

  const validateWeight = useCallback((inputWeight: string, currentUnit: WeightUnit): ValidationError | null => {
    if (!inputWeight.trim()) {
      return { field: 'weight', message: 'Por favor ingresa tu peso' };
    }
    const numWeight = parseFloat(inputWeight);
    if (isNaN(numWeight)) {
      return { field: 'weight', message: 'Por favor ingresa un número válido' };
    }
    if (numWeight <= 0) {
      return { field: 'weight', message: 'El peso debe ser mayor a 0' };
    }
    const limits = currentUnit === 'kg' 
      ? { min: WEIGHT_LIMITS.MIN_KG, max: WEIGHT_LIMITS.MAX_KG }
      : { min: WEIGHT_LIMITS.MIN_LBS, max: WEIGHT_LIMITS.MAX_LBS };
    if (numWeight < limits.min || numWeight > limits.max) {
      const unitText = currentUnit === 'kg' ? 'kg' : 'lbs';
      return { 
        field: 'weight', 
        message: `El peso debe estar entre ${limits.min} y ${limits.max} ${unitText}` 
      };
    }
    return null;
  }, []);

  const convertWeight = useCallback((weightInKg: number, targetUnit: WeightUnit): number => {
    if (targetUnit === 'kg') {
      return weightInKg;
    }
    return weightInKg * CONVERSION_FACTORS.KG_TO_LBS;
  }, []);

  const calculateWeights = useCallback(() => {
    const error = validateWeight(weight, unit);
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError(null);
    const inputWeight = parseFloat(weight);
    const weightInKg = unit === 'kg' 
      ? inputWeight 
      : inputWeight * CONVERSION_FACTORS.LBS_TO_KG;
    const newResults: WeightResult[] = PLANETS.map((planet) => ({
      planet: planet.name,
      weight: weightInKg * planet.gravity,
      gravity: planet.gravity,
      color: planet.color,
      emoji: planet.emoji,
      description: planet.description,
    }));
    setResults(newResults);
    const newCalculation: WeightCalculation = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `calc-${Date.now()}-${inputWeight}-${unit}`,
      inputWeight,
      unit,
      results: newResults,
      timestamp: new Date(),
    };
    setCalculationHistory(prev => [newCalculation, ...prev.slice(0, 9)]);
  }, [weight, unit, validateWeight]);

  const clearResults = useCallback(() => {
    setResults([]);
    setValidationError(null);
  }, []);

  const clearHistory = useCallback(() => {
    setCalculationHistory([]);
  }, []);

  const formatWeight = useCallback((planetWeight: number, displayUnit: WeightUnit): string => {
    const convertedWeight = convertWeight(planetWeight, displayUnit);
    const unitText = displayUnit === 'kg' ? 'kg' : 'lbs';
    return `${convertedWeight.toFixed(2)} ${unitText}`;
  }, [convertWeight]);

  const getObjectComparison = useCallback((planetWeight: number, _planetName: string): ObjectComparisonResult | null => {
    const targetWeight = convertWeight(planetWeight, unit);
    let closestObject = EVERYDAY_OBJECTS[0] as typeof EVERYDAY_OBJECTS[0];
    let minDifference = Math.abs(targetWeight - closestObject.weight);
    EVERYDAY_OBJECTS.forEach(obj => {
      const difference = Math.abs(targetWeight - obj.weight);
      if (difference < minDifference) {
        minDifference = difference;
        closestObject = obj as typeof EVERYDAY_OBJECTS[0];
      }
    });
    const equivalent = targetWeight / closestObject.weight;
    if (equivalent >= 0.1 && equivalent <= 100) {
      return {
        object: closestObject,
        equivalent,
      };
    }
    return null;
  }, [unit, convertWeight]);

  const filteredResults = useMemo(() => {
    const filtered = results.filter(result => planetFilters[result.planet]);
    const mult = sortDirection === 'asc' ? 1 : -1;
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') return mult * a.planet.localeCompare(b.planet);
      return mult * (a.weight - b.weight);
    });
    return sorted;
  }, [results, planetFilters, sortBy, sortDirection]);
  const chartData = useMemo(() => {
    return filteredResults.map(result => ({
      name: result.planet,
      weight: convertWeight(result.weight, unit),
      weightKg: result.weight,
      gravity: result.gravity,
      emoji: result.emoji,
      color: result.color,
      objectComparison: getObjectComparison(result.weight, result.planet),
    }));
  }, [filteredResults, unit, convertWeight, getObjectComparison]);

  const handleFilterChange = useCallback((planetName: string, checked: boolean) => {
    setPlanetFilters(prev => ({
      ...prev,
      [planetName]: checked,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    const allSelected: PlanetFilter = {};
    PLANETS.forEach(planet => {
      allSelected[planet.name] = true;
    });
    setPlanetFilters(allSelected);
  }, []);

  return {
    weight,
    unit,
    results: filteredResults,
    unfilteredResultsLength: results.length,
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
  };
};