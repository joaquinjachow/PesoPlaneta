"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ChartData, WeightChartProps, TooltipProps } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm">
        <p className="font-semibold text-foreground">{`${label}`}</p>
        <p className="text-primary font-medium">
          {`Peso: ${payload[0].value.toFixed(2)} ${payload[0].payload.unit || 'kg'}`}
        </p>
        <p className="text-muted-foreground text-sm">
          {`Gravedad: ${payload[0].payload.gravity}x`}
        </p>
      </div>
    );
  }
  return null;
};

export function WeightChart({ data, unit }: WeightChartProps) {
  if (!data || data.length === 0) {
    return null;
  }
  const chartData = data.map(item => ({
    ...item,
    unit: unit,
  }));

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
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 40,
              }}
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
                tick={{ fill: 'white' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <YAxis 
                label={{ 
                  value: `Peso (${unit})`, 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: 'white' }
                }}
                fontSize={12}
                tick={{ fill: 'white' }}
                axisLine={{ stroke: 'hsl(var(--border))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="weight" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => {
                  const colorMap: { [key: string]: string } = {
                    'orange': '#f97316',
                    'yellow': '#eab308',
                    'blue': '#3b82f6',
                    'red': '#ef4444',
                    'cyan': '#06b6d4',
                    'gray': '#6b7280',
                  };
                  
                  const colorKey = entry.color
                    .replace('bg-', '')
                    .replace('-500', '')
                    .replace('-600', '')
                    .replace('-400', '')
                    .replace('-300', '');
                  
                  return (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colorMap[colorKey] || '#3b82f6'}
                      className="opacity-90"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}