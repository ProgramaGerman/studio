import { Header } from '@/components/header';
import { ExchangeRateCard } from '@/components/exchange-rate-card';
import { CurrencyConverter } from '@/components/currency-converter';
import { getExchangeRates } from '@/lib/actions';
import { Separator } from '@/components/ui/separator';

export default async function Home() {
  const rates = await getExchangeRates();
  const usdRate = rates.find(r => r.base === 'USD');
  const eurRate = rates.find(r => r.base === 'EUR');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 pb-12 animate-in fade-in duration-500">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground/90">
            Tasas de Cambio Actuales
          </h2>
          <p className="text-muted-foreground">USD & EUR a VES</p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {usdRate ? (
            <ExchangeRateCard {...usdRate} />
          ) : (
            <p>Could not load USD rate.</p>
          )}
          {eurRate ? (
            <ExchangeRateCard {...eurRate} />
          ) : (
            <p>Could not load EUR rate.</p>
          )}
        </section>

        <Separator className="my-12 max-w-md mx-auto bg-border/60" />

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground/90">
            Convertidor de Divisas
          </h2>
          <p className="text-muted-foreground">Conversión instantánea</p>
        </div>

        <section className="max-w-md mx-auto">
          <CurrencyConverter rates={rates} />
        </section>
      </main>
    </div>
  );
}
