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
  id?: string;
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

export type SortByOption = 'weight' | 'name';
export type SortDirection = 'asc' | 'desc';

export interface ChartData {
  name: string;
  weight: number;
  weightKg?: number;
  gravity: number;
  emoji: string;
  color: string;
  objectComparison?: ObjectComparisonResult | null;
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

export interface CompactPlanetFiltersProps {
  filters: PlanetFilter;
  onFilterChange: (planetName: string, checked: boolean) => void;
  onResetFilters: () => void;
}

export interface ChartTooltipPayloadItem {
  value?: number;
  payload: ChartData & { unit?: string };
}

export interface TooltipProps {
  active?: boolean;
  payload?: ChartTooltipPayloadItem[];
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