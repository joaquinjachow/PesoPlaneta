import type { KeyboardEvent, ReactNode } from 'react'

export interface Planet {
  name: string
  gravity: number
  color: string
  emoji: string
  description?: string
}

export interface WeightResult {
  planet: string
  weight: number
  gravity: number
  color: string
  emoji: string
  description?: string
}

export interface WeightCalculation {
  id?: string
  inputWeight: number
  unit: WeightUnit
  results: WeightResult[]
  timestamp: Date
}

export type WeightUnit = 'kg' | 'lbs'

export type SortByOption = 'weight' | 'name'
export type SortDirection = 'asc' | 'desc'

export interface ChartData {
  name: string
  weight: number
  gravity: number
  emoji: string
  color: string
  objectComparison?: ObjectComparisonResult | null
}

export interface PlanetFilter {
  [planetName: string]: boolean
}

export interface EverydayObject {
  name: string
  weight: number
  emoji: string
  description: string
}

export interface ObjectComparisonResult {
  object: EverydayObject
  equivalent: number
}

export interface WeightInputProps {
  weight: number | null
  unit: WeightUnit
  validationError: string | null
  hasResults: boolean
  onWeightChange: (weight: number | null) => void
  onUnitChange: (unit: WeightUnit) => void
  onCalculate: () => void
  onClearResults: () => void
  onKeyDown: (event: KeyboardEvent) => void
}

export interface ResultsGridProps {
  layoutKey: string
  inputWeight: number
  unit: WeightUnit
  results: WeightResult[]
  shareResults: WeightResult[]
  chartData: ChartData[]
  planetFilters: PlanetFilter
  sortBy: SortByOption
  sortDirection: SortDirection
  onSortByChange: (value: SortByOption) => void
  onSortDirectionToggle: () => void
  onFilterChange: (planetName: string, checked: boolean) => void
  onResetFilters: () => void
  formatWeight: (weight: number, unit: WeightUnit) => string
  getObjectComparison: (planetWeight: number) => ObjectComparisonResult | null
}

export interface WeightChartProps {
  data: ChartData[]
  unit: string
}

export interface ChartTooltipPayloadItem {
  value?: number
  payload: ChartData & { unit?: string }
}

export interface TooltipProps {
  active?: boolean
  payload?: ChartTooltipPayloadItem[]
  label?: string
}

export interface CalculationHistoryProps {
  history: WeightCalculation[]
  onClearHistory: () => void
  formatWeight: (weight: number, unit: string) => string
}

export interface CompactPlanetFiltersProps {
  filters: PlanetFilter
  onFilterChange: (planetName: string, checked: boolean) => void
  onResetFilters: () => void
}

export interface ShareResultsButtonProps {
  inputWeight: number
  unit: WeightUnit
  results: WeightResult[]
  formatWeight: (weight: number, unit: WeightUnit) => string
}

export interface SpacePageLayoutProps {
  children: ReactNode
}

export interface StarfieldBackgroundProps {
  count?: number
}

export interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}