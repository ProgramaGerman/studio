import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { CURRENCIES } from '@/lib/currencies';
import { ArrowRight } from 'lucide-react';

type ExchangeRateCardProps = {
  base: string;
  target: string;
  rate: number;
  source: string;
};

export function ExchangeRateCard({ base, target, rate, source }: ExchangeRateCardProps) {
  const BaseIcon = CURRENCIES[base]?.icon;
  const TargetIcon = CURRENCIES[target]?.icon;

  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-semibold gap-4">
          <div className="flex items-center gap-2">
            {BaseIcon && <BaseIcon className="h-6 w-6 text-muted-foreground" />}
            <span>{base}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex items-center gap-2">
            {TargetIcon && <TargetIcon className="h-6 w-6 text-muted-foreground" />}
            <span>{target}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-4xl font-bold text-primary text-center tracking-tight">
          {rate > 0 ? rate.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : 'N/A'}
        </p>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-center w-full">
          Fuente: {source}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
