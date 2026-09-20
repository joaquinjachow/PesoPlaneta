'use client'

import { Download, Share2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { ObjectComparisonResult, WeightResult, WeightUnit } from '@/lib/types'
import { outlineButtonHoverClass } from '@/lib/ui-classes'

type WeightSummaryCardProps = {
  inputWeight: number
  unit: WeightUnit
  results: WeightResult[]
  formatWeight: (weight: number, unit: WeightUnit) => string
  getObjectComparison: (weight: number) => ObjectComparisonResult | null
}

function drawLine(context: CanvasRenderingContext2D, text: string, x: number, y: number, font: string, color: string) {
  context.font = font
  context.fillStyle = color
  context.fillText(text, x, y)
}

export function WeightSummaryCard({
  inputWeight,
  unit,
  results,
  formatWeight,
  getObjectComparison,
}: WeightSummaryCardProps) {
  if (results.length === 0) return null

  const lightest = results.reduce((current, result) => (result.weight < current.weight ? result : current))
  const heaviest = results.reduce((current, result) => (result.weight > current.weight ? result : current))
  const lightestComparison = getObjectComparison(lightest.weight)
  const heaviestComparison = getObjectComparison(heaviest.weight)

  const createImageFile = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1080
    canvas.height = 1350
    const context = canvas.getContext('2d')
    if (!context) throw new Error('No se pudo crear la imagen')
    const gradient = context.createLinearGradient(0, 0, 1080, 1350)
    gradient.addColorStop(0, '#120b2e')
    gradient.addColorStop(0.55, '#43258d')
    gradient.addColorStop(1, '#ba2a8c')
    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)
    for (let index = 0; index < 90; index += 1) {
      const x = (index * 137) % canvas.width
      const y = (index * 251) % canvas.height
      const size = index % 4 === 0 ? 5 : 2
      context.fillStyle = `rgba(255, 255, 255, ${0.25 + (index % 3) * 0.2})`
      context.beginPath()
      context.arc(x, y, size, 0, Math.PI * 2)
      context.fill()
    }
    drawLine(context, 'PESO PLANETARIO', 80, 130, '700 38px Arial', '#f5e8ff')
    drawLine(context, 'Tu resumen cósmico', 80, 205, '700 74px Arial', '#ffffff')
    drawLine(context, `Partiste de ${inputWeight} ${unit} en la Tierra`, 80, 270, '400 34px Arial', '#eadcff')
    context.fillStyle = 'rgba(10, 6, 34, 0.42)'
    context.roundRect(60, 360, 960, 300, 42)
    context.fill()
    drawLine(context, 'TU MAYOR PESO', 110, 435, '700 28px Arial', '#d9c4ff')
    drawLine(context, heaviest.planet, 110, 510, '700 64px Arial', '#ffffff')
    drawLine(context, formatWeight(heaviest.weight, unit), 110, 585, '700 48px Arial', '#ffd1f3')
    drawLine(context, `Gravedad: ${heaviest.gravity}x`, 110, 630, '400 28px Arial', '#f5e8ff')
    context.fillStyle = 'rgba(10, 6, 34, 0.42)'
    context.roundRect(60, 710, 960, 300, 42)
    context.fill()
    drawLine(context, 'TU MENOR PESO', 110, 785, '700 28px Arial', '#d9c4ff')
    drawLine(context, lightest.planet, 110, 860, '700 64px Arial', '#ffffff')
    drawLine(context, formatWeight(lightest.weight, unit), 110, 935, '700 48px Arial', '#ffd1f3')
    drawLine(context, `Gravedad: ${lightest.gravity}x`, 110, 980, '400 28px Arial', '#f5e8ff')
    const comparison = heaviestComparison ?? lightestComparison
    if (comparison) {
      drawLine(context, 'COMPARACIÓN DESTACADA', 80, 1110, '700 28px Arial', '#d9c4ff')
      drawLine(context, `≈ ${comparison.equivalent.toFixed(1)} ${comparison.object.name}`, 80, 1170, '700 42px Arial', '#ffffff')
    }
    drawLine(context, 'peso-planeta.vercel.app', 80, 1260, '400 28px Arial', '#f5e8ff')
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((image) => (image ? resolve(image) : reject(new Error('No se pudo exportar la imagen'))), 'image/png')
    })
    return new File([blob], 'mi-peso-planetario.png', { type: 'image/png' })
  }

  const handleSave = async () => {
    try {
      const image = await createImageFile()
      const url = URL.createObjectURL(image)
      const link = document.createElement('a')
      link.href = url
      link.download = image.name
      link.click()
      URL.revokeObjectURL(url)
      toast.success('Tarjeta guardada', { description: 'La imagen se descargó en tu dispositivo.' })
    } catch {
      toast.error('No se pudo guardar la tarjeta')
    }
  }

  const handleShare = async () => {
    try {
      const image = await createImageFile()
      const shareData = { files: [image], title: 'Mi peso planetario' }
      if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        await navigator.share(shareData)
        toast.success('Tarjeta compartida')
        return
      }
      await handleSave()
      toast.info('Tu navegador no admite compartir imágenes', { description: 'Descargamos la tarjeta para que puedas enviarla.' })
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      toast.error('No se pudo compartir la tarjeta')
    }
  }

  return (
    <Card className="overflow-hidden border-primary/40 bg-linear-to-br from-violet-950 via-primary/80 to-fuchsia-700 text-white shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl text-white">
          <Sparkles className="h-6 w-6 text-yellow-200" />
          Tu resumen cósmico
        </CardTitle>
        <CardDescription className="text-violet-100">
          Un Wrapped de tu peso a través del sistema solar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-2xl border border-white/20 bg-black/20 p-5">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet-200">Peso de partida</p>
          <p className="mt-2 text-4xl font-bold">{inputWeight} {unit}</p>
          <p className="mt-1 text-sm text-violet-100">en la Tierra</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/20 bg-black/20 p-5">
            <p className="text-sm font-medium text-violet-200">Donde más pesarías</p>
            <p className="mt-2 text-2xl font-bold">{heaviest.emoji} {heaviest.planet}</p>
            <p className="mt-1 text-lg text-fuchsia-100">{formatWeight(heaviest.weight, unit)}</p>
            {heaviestComparison && <p className="mt-3 text-sm text-violet-100">≈ {heaviestComparison.equivalent.toFixed(1)} {heaviestComparison.object.emoji} {heaviestComparison.object.name}</p>}
          </div>
          <div className="rounded-2xl border border-white/20 bg-black/20 p-5">
            <p className="text-sm font-medium text-violet-200">Donde menos pesarías</p>
            <p className="mt-2 text-2xl font-bold">{lightest.emoji} {lightest.planet}</p>
            <p className="mt-1 text-lg text-fuchsia-100">{formatWeight(lightest.weight, unit)}</p>
            {lightestComparison && <p className="mt-3 text-sm text-violet-100">≈ {lightestComparison.equivalent.toFixed(1)} {lightestComparison.object.emoji} {lightestComparison.object.name}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="button" className="flex-1 bg-white text-violet-950 hover:bg-violet-100" onClick={handleSave}>
            <Download className="h-4 w-4" />
            Guardar tarjeta
          </Button>
          <Button type="button" variant="outline" className={`flex-1 border-white/40 bg-transparent text-white hover:text-violet-950 ${outlineButtonHoverClass}`} onClick={handleShare}>
            <Share2 className="h-4 w-4" />
            Compartir tarjeta
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}