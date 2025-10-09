import { Suspense } from 'react';
import { Header } from '@/components/header';
import { ExchangeRateCard } from '@/components/exchange-rate-card';
import { CurrencyConverter } from '@/components/currency-converter';
import { getExchangeRates } from '@/lib/actions';
import { Separator } from '@/components/ui/separator';
import { Footer } from '@/components/footer';
import { Analytics } from "@vercel/analytics/next";
import { ExchangeRateCardSkeleton } from '@/components/exchange-rate-card-skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

async function ExchangeRateContent() {
  // Using a try-catch block for robust error handling
  try {
    const rates = await getExchangeRates();
    const usdRate = rates.find(r => r.base === 'USD');
    const eurRate = rates.find(r => r.base === 'EUR');

    // Check if rates were found
    if (!usdRate && !eurRate) {
        throw new Error("Could not retrieve any exchange rates.");
    }

    return (
      <>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {usdRate ? (
            <ExchangeRateCard {...usdRate} />
          ) : (
            <Alert variant="destructive" className="md:col-span-1">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>No se pudo cargar la tasa de cambio para USD.</AlertDescription>
            </Alert>
          )}
          {eurRate ? (
            <ExchangeRateCard {...eurRate} />
          ) : (
            <Alert variant="destructive" className="md:col-span-1">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>No se pudo cargar la tasa de cambio para EUR.</AlertDescription>
            </Alert>
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
      </>
    );
  } catch (error) {
    return (
        <div className="max-w-2xl mx-auto">
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error de Conexión</AlertTitle>
                <AlertDescription>
                No se pudieron obtener los datos de las tasas de cambio. Por favor, intente de nuevo más tarde.
                </AlertDescription>
            </Alert>
        </div>
    );
  }
}

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow container mx-auto px-4 pb-12 animate-in fade-in duration-500">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground/90">
              Tasas de Cambio Actuales
            </h2>
            <p className="text-muted-foreground">USD & EUR a VES</p>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <ExchangeRateCardSkeleton />
              <ExchangeRateCardSkeleton />
            </div>
          }>
            <ExchangeRateContent />
          </Suspense>

        </main>
        <Footer />
      </div>
    
      <Analytics />
    </>
  );
}