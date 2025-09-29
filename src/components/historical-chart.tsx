"use client";

import { useState, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import type { HistoricalRate, WeekendPeak, CurrencyCode } from "@/lib/types";
import { TrendingUp } from "lucide-react";

type HistoricalChartProps = {
  data: HistoricalRate[];
  weekendPeak: WeekendPeak;
};

const chartConfig = {
  rate: {
    label: "Tasa",
    color: "hsl(var(--primary))",
  },
};

export function HistoricalChart({ data, weekendPeak }: HistoricalChartProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("USD");
  const [formattedPeakDate, setFormattedPeakDate] = useState("");

  const chartData = data.map((item) => ({
    date: new Date(`${item.date}T00:00:00Z`).toLocaleDateString('es-VE', { month: 'short', day: 'numeric', timeZone: 'UTC' }),
    rate: item[selectedCurrency],
  }));

  const peak = weekendPeak[selectedCurrency];

  useEffect(() => {
    if (peak && peak.date) {
      const date = new Date(`${peak.date}T00:00:00Z`);
      setFormattedPeakDate(
        date.toLocaleDateString('es-VE', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        })
      );
    } else {
      setFormattedPeakDate("");
    }
  }, [peak]);


  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  const getIconClass = (currency: string) => {
    switch(currency) {
      case 'USD': return 'fa-solid fa-dollar-sign';
      case 'EUR': return 'fa-solid fa-euro-sign';
      default: return '';
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Historial de 30 días</CardTitle>
          <Select value={selectedCurrency} onValueChange={(value) => setSelectedCurrency(value as CurrencyCode)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue asChild>
                <div className="flex items-center gap-2">
                  <i className={`${getIconClass(selectedCurrency)} h-4 w-4 text-muted-foreground`}></i>
                  <span>{selectedCurrency}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">
                <div className="flex items-center gap-2">
                  <i className={`${getIconClass("USD")} h-4 w-4 text-muted-foreground`}></i>
                  <span>USD</span>
                </div>
              </SelectItem>
              <SelectItem value="EUR">
                <div className="flex items-center gap-2">
                  <i className={`${getIconClass("EUR")} h-4 w-4 text-muted-foreground`}></i>
                  <span>EUR</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => formatCurrency(value)}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value) => formatCurrency(value as number)}
                    labelClassName="font-bold"
                  />
                }
              />
              <Bar dataKey="rate" fill="var(--color-rate)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Pico del Fin de Semana
          </CardTitle>
          <CardDescription>
            El valor más alto alcanzado para {selectedCurrency} el último fin de semana.
          </CardDescription>
        </CardHeader>
        <CardContent>
            {peak && peak.value > 0 ? (
                <div className="text-center">
                    <p className="text-4xl font-bold text-primary">
                        {formatCurrency(peak.value)}
                    </p>
                    <p className="text-muted-foreground mt-2">
                        {formattedPeakDate}
                    </p>
                </div>
            ) : (
                <p className="text-center text-muted-foreground">
                    No hay datos disponibles para el último fin de semana.
                </p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
