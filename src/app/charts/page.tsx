import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { HistoricalChart } from '@/components/historical-chart';
import { getHistoricalRates, getWeekendPeak } from '@/lib/actions';

export default async function ChartsPage() {
  const historicalData = await getHistoricalRates();
  const weekendPeak = await getWeekendPeak();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 pb-12 animate-in fade-in duration-500">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground/90">
            Historial de Tasas
          </h2>
          <p className="text-muted-foreground">
            Análisis de la fluctuación de las divisas
          </p>
        </div>

        <section className="max-w-4xl mx-auto">
          <HistoricalChart
            data={historicalData}
            weekendPeak={weekendPeak}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}
