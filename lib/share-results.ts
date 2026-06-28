import type { WeightResult, WeightUnit } from '@/lib/types'

const APP_URL = 'https://peso-planeta.vercel.app'

export function formatShareText(
  inputWeight: number,
  unit: WeightUnit,
  results: WeightResult[],
  formatWeight: (weight: number, unit: WeightUnit) => string,
): string {
  const header = `🚀 Mi peso en el sistema solar (${inputWeight} ${unit} en Tierra)\n\n`
  const lines = results
    .map((result) => `${result.emoji} ${result.planet}: ${formatWeight(result.weight, unit)}`)
    .join('\n')
  return `${header}${lines}\n\nCalculado con Peso Planetario — ${APP_URL}`
}

export async function shareResults(text: string): Promise<'shared' | 'copied'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    await navigator.share({
      title: 'Peso Planetario',
      text,
    })
    return 'shared'
  }
  await navigator.clipboard.writeText(text)
  return 'copied'
}