import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCurrencyIcon } from '@/lib/icon-map';

type ExchangeRateCardProps = {
  base: string;
  target: string;
  rate: number;
  source: string;
};

export function ExchangeRateCard({ base, target, rate, source }: ExchangeRateCardProps) {
  const baseIcon = getCurrencyIcon(base);
  const targetIcon = getCurrencyIcon(target);

  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-semibold gap-4">
          <div className="flex items-center gap-2">
            {baseIcon && <FontAwesomeIcon icon={baseIcon} className="h-6 w-6 text-muted-foreground" />}
            <span>{base}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex items-center gap-2">
            {targetIcon && <FontAwesomeIcon icon={targetIcon} className="h-6 w-6 text-muted-foreground" />}
            <span>{target}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-center">
            <p className="text-4xl font-bold text-primary tracking-tight">
            {rate > 0 ? rate.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : 'N/A'}
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              {baseIcon && <FontAwesomeIcon icon={baseIcon} className="text-2xl text-muted-foreground" />}
              {targetIcon && <FontAwesomeIcon icon={targetIcon} className="text-2xl text-muted-foreground" />}
            </div>
        </div>
      </CardContent>
      <CardFooter>
        <CardDescription className="text-center w-full">
          Fuente: {source}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}