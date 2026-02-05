export interface Planet {
  name: string;
  gravity: number;
  color: string;
  emoji: string;
  description?: string;
}

export interface WeightResult {
  planet: string;
  weight: number;
  gravity: number;
  color: string;
  emoji: string;
  description?: string;
}

export interface WeightCalculation {
  inputWeight: number;
  unit: 'kg' | 'lbs';
  results: WeightResult[];
  timestamp: Date;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type WeightUnit = 'kg' | 'lbs';

export interface ChartData {
  name: string;
  weight: number;
  gravity: number;
  emoji: string;
  color: string;
}

export interface WeightChartProps {
  data: ChartData[];
  unit: string;
}

export interface CalculationHistoryProps {
  history: WeightCalculation[];
  onClearHistory: () => void;
  formatWeight: (weight: number, unit: string) => string;
}

export interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export interface CompactPlanetFiltersProps {
  filters: PlanetFilter;
  onFilterChange: (planetName: string, checked: boolean) => void;
  onResetFilters: () => void;
}

export interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export interface PlanetFilter {
  [planetName: string]: boolean;
}

export interface EverydayObject {
  name: string;
  weight: number;
  emoji: string;
  description: string;
}

export interface ObjectComparisonResult {
  object: EverydayObject;
  equivalent: number;
}