'use client'
import { useState } from 'react'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { formatShareText, shareResults } from '@/lib/share-results'
import type { WeightResult, WeightUnit } from '@/lib/types'

interface ShareResultsButtonProps {
  inputWeight: number
  unit: WeightUnit
  results: WeightResult[]
  formatWeight: (weight: number, unit: WeightUnit) => string
}

export function ShareResultsButton({
  inputWeight,
  unit,
  results,
  formatWeight,
}: ShareResultsButtonProps) {
  const [isSharing, setIsSharing] = useState(false)

  const handleShare = async () => {
    if (results.length === 0) return
    setIsSharing(true)
    try {
      const text = formatShareText(inputWeight, unit, results, formatWeight)
      const outcome = await shareResults(text)
      toast.success(outcome === 'shared' ? 'Resultados compartidos' : 'Resultados copiados', {
        description:
          outcome === 'shared'
            ? 'Se abrió el menú de compartir de tu dispositivo.'
            : 'El texto se copió al portapapeles.',
      })
    } catch {
      toast.error('No se pudieron compartir los resultados', {
        description: 'Intentá de nuevo en unos segundos.',
      })
    } finally {
      setIsSharing(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="gap-2 dark:hover:bg-white dark:hover:text-black dark:hover:border-black"
      onClick={handleShare}
      disabled={isSharing || results.length === 0}
    >
      <Share2 className="h-4 w-4" />
      Compartir
    </Button>
  )
}