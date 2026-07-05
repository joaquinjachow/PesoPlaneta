import type { WeightCalculation } from '@/lib/types'

const HISTORY_KEY = 'peso-planetario-history'
const MAX_HISTORY_ITEMS = 10
const HISTORY_DEDUP_WINDOW_MS = 60_000

export function prependHistoryEntry(
  history: WeightCalculation[],
  entry: WeightCalculation,
): WeightCalculation[] {
  const latest = history[0]
  if (
    latest &&
    latest.inputWeight === entry.inputWeight &&
    latest.unit === entry.unit &&
    entry.timestamp.getTime() - latest.timestamp.getTime() < HISTORY_DEDUP_WINDOW_MS
  ) {
    return [{ ...entry, id: latest.id }, ...history.slice(1)]
  }
  return [entry, ...history.slice(0, MAX_HISTORY_ITEMS - 1)]
}

type StoredWeightCalculation = Omit<WeightCalculation, 'timestamp'> & {
  timestamp: string
}

export function loadHistory(): WeightCalculation[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredWeightCalculation[]
    return parsed.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }))
  } catch {
    return []
  }
}

export function saveHistory(history: WeightCalculation[]): void {
  if (typeof window === 'undefined') return
  const serialized: StoredWeightCalculation[] = history.map((item) => ({
    ...item,
    timestamp: item.timestamp.toISOString(),
  }))
  localStorage.setItem(HISTORY_KEY, JSON.stringify(serialized))
}

export function clearStoredHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(HISTORY_KEY)
}