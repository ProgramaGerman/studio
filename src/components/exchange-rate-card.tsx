import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type ExchangeRateCardProps = {
  base: string;
  target: string;
  rate: number;
  source: string;
};

export function ExchangeRateCard({ base, target, rate, source }: ExchangeRateCardProps) {
  const getIconClass = (currency: string) => {
    switch(currency) {
      case 'USD': return 'fa-solid fa-dollar-sign';
      case 'EUR': return 'fa-solid fa-euro-sign';
      case 'VES': return 'fa-solid fa-landmark';
      default: return '';
    }
  }

  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-xl font-semibold gap-4">
          <div className="flex items-center gap-2">
            <i className={`${getIconClass(base)} h-6 w-6 text-muted-foreground`}></i>
            <span>{base}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground shrink-0" />
          <div className="flex items-center gap-2">
            <i className={`${getIconClass(target)} h-6 w-6 text-muted-foreground`}></i>
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
              <i className={`${getIconClass(base)} text-2xl text-muted-foreground`}></i>
              <i className={`${getIconClass(target)} text-2xl text-muted-foreground`}></i>
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

    