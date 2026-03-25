"use client";
import { CalculationHistoryProps } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, Trash2, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

export function CalculationHistory({ history, onClearHistory, formatWeight }: CalculationHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <CardTitle>Historial de Cálculos</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClearHistory}
            className="text-destructive hover:text-destructive hover:bg-slate-100 hover:border-slate-300 dark:hover:bg-white dark:hover:text-black dark:hover:border-black"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        </div>
        <CardDescription>
          Tus últimos {history.length} cálculos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((calculation) => (
            <div
              key={calculation.id ?? `legacy-${calculation.timestamp.getTime()}-${calculation.inputWeight}`}
              className="p-3 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {formatDistanceToNow(calculation.timestamp, { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {calculation.inputWeight} {calculation.unit}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {calculation.results.slice(0, 4).map((result) => (
                  <div key={result.planet} className="text-center">
                    <div className="text-lg">{result.emoji}</div>
                    <div className="text-xs font-medium">{result.planet}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatWeight(result.weight, calculation.unit)}
                    </div>
                  </div>
                ))}
                {calculation.results.length > 4 && (
                  <div className="text-center flex items-center justify-center">
                    <Badge variant="outline" className="text-xs">
                      +{calculation.results.length - 4} más
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}