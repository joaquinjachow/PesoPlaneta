"use client";
import { lazy, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WeightChartProps } from '@/lib/types';

const WeightChart = lazy(() => import('./weight-chart').then(module => ({ default: module.WeightChart })));

function ChartSkeleton() {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-4 w-64" />
          <div className="h-80 w-full">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function LazyWeightChart(props: WeightChartProps) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      <WeightChart {...props} />
    </Suspense>
  );
}