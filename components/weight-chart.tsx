'use client'
import { useTheme } from 'next-themes'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CONVERSION_FACTORS } from '@/lib/constants'
import type { TooltipProps, WeightChartProps } from '@/lib/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

const BAR_COLORS: Record<string, string> = {
  orange: '#f97316',
  yellow: '#eab308',
  blue: '#3b82f6',
  red: '#ef4444',
  cyan: '#06b6d4',
  gray: '#6b7280',
}

const AXIS_COLOR_LIGHT = '#7c3aed'
const AXIS_COLOR_DARK = 'white'

function getBarColor(tailwindColor: string): string {
  const colorKey = tailwindColor
    .replace('bg-', '')
    .replace('-500', '')
    .replace('-600', '')
    .replace('-400', '')
    .replace('-300', '')
  return BAR_COLORS[colorKey] ?? '#3b82f6'
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    const comparison = data.objectComparison
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm min-w-[180px]">
        <p className="font-semibold text-foreground flex items-center gap-1.5">
          <span>{data.emoji}</span>
          {label}
        </p>
        <p className="text-primary font-medium mt-1">
          Peso: {payload[0].value != null ? Number(payload[0].value).toFixed(2) : '—'}{' '}
          {data.unit || 'kg'}
        </p>
        <p className="text-muted-foreground text-sm">Gravedad: {data.gravity}x</p>
        {comparison && (
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-foreground text-sm font-medium">
              ≈ {comparison.equivalent.toFixed(1)} {comparison.object.emoji}
            </p>
            <p className="text-muted-foreground text-xs">{comparison.object.name}</p>
            <p className="text-muted-foreground text-xs mt-0.5">
              Referencia:{' '}
              {data.unit === 'lbs'
                ? (comparison.object.weight * CONVERSION_FACTORS.KG_TO_LBS).toFixed(1)
                : comparison.object.weight.toFixed(0)}{' '}
              {data.unit || 'kg'}
            </p>
          </div>
        )}
      </div>
    )
  }
  return null
}


export function WeightChart({ data, unit }: WeightChartProps) {
  const { resolvedTheme } = useTheme()
  const axisColor = resolvedTheme === 'dark' ? AXIS_COLOR_DARK : AXIS_COLOR_LIGHT

  if (!data.length) return null

  const chartData = data.map((item) => ({ ...item, unit }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <BarChart3 className="h-5 w-5 text-primary" />
          Gráfico de Peso Planetario
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Comparación visual de tu peso en diferentes planetas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--muted-foreground))"
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                fontSize={12}
                tick={{ fill: axisColor }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis
                label={{
                  value: `Peso (${unit})`,
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: axisColor },
                }}
                fontSize={12}
                tick={{ fill: axisColor }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getBarColor(entry.color)}
                    className="opacity-90"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}