'use server';

import { unstable_cache } from 'next/cache';
import { getFallbackExchangeRate } from '@/ai/flows/fallback-exchange-rate';
import type { ExchangeRate, HistoricalRate, WeekendPeak } from '@/lib/types';

async function fetchFromPrimarySource(base: string, target: string): Promise<number | null> {
    console.log(`Attempting to fetch ${base}/${target} from primary source...`);
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
        if (!response.ok) {
            console.error('Failed to fetch from ExchangeRate-API');
            return null;
        }
        const data = await response.json();
        if (data.rates && data.rates[target]) {
            return data.rates[target];
        }
        return null;
    } catch (error) {
        console.error('Error fetching from ExchangeRate-API:', error);
        return null;
    }
}

export const getExchangeRates = unstable_cache(
    async () => {
        const currenciesToFetch = [
            { base: 'USD', target: 'VES' },
            { base: 'EUR', target: 'VES' },
        ];

        const rates: ExchangeRate[] = [];

        for (const { base, target } of currenciesToFetch) {
            let rate: number | null = await fetchFromPrimarySource(base, target);
            let source = 'ExchangeRate-API';
            let error = '';

            if (!rate) {
                error = `Primary source failed or does not support ${base}/${target}.`;
                console.log(error);
                try {
                    const fallback = await getFallbackExchangeRate({
                        primarySourceFailureReason: error,
                        baseCurrency: base,
                        targetCurrency: target,
                    });
                    rate = fallback.exchangeRate;
                    source = fallback.source;
                } catch (e) {
                    console.error(`Fallback failed for ${base}/${target}:`, e);
                    rate = 0;
                    source = 'Fallback Failed';
                }
            }
            if (rate) {
                rates.push({ base, target, rate, source });
            }
        }
        
        return rates;
    },
    ['exchange-rates'],
    {
        revalidate: 3600, // Revalidate every hour
        tags: ['rates'],
    }
);

// Faking historical data for the last 30 days
export const getHistoricalRates = unstable_cache(
  async (): Promise<HistoricalRate[]> => {
    const today = new Date();
    const data: HistoricalRate[] = [];
    const currentRates = await getExchangeRates();
    const usdRate = currentRates.find(r => r.base === 'USD')?.rate || 36;
    const eurRate = currentRates.find(r => r.base === 'EUR')?.rate || 40;

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toLocaleDateString('en-CA'); // YYYY-MM-DD

      // Simulate some fluctuations
      const usdFluctuation = (Math.random() - 0.5) * 0.5;
      const eurFluctuation = (Math.random() - 0.5) * 0.6;
      
      data.push({
        date: dateString,
        USD: parseFloat((usdRate - (i / 10) + usdFluctuation).toFixed(2)),
        EUR: parseFloat((eurRate - (i / 10) + eurFluctuation).toFixed(2)),
      });
    }

    return data;
  },
  ['historical-rates'],
  {
    revalidate: 3600,
    tags: ['rates'],
  }
);


// Faking weekend peak data
export const getWeekendPeak = unstable_cache(
  async (): Promise<WeekendPeak> => {
    const historicalData = await getHistoricalRates();
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday is 0, Saturday is 6

    const mostRecentSaturday = new Date(today);
    mostRecentSaturday.setDate(today.getDate() - dayOfWeek - 1);
    const mostRecentSunday = new Date(today);
    mostRecentSunday.setDate(today.getDate() - dayOfWeek);

    const weekendRates = historicalData.filter(rate => {
        const rateDate = new Date(rate.date);
        const rateTime = new Date(rateDate.getUTCFullYear(), rateDate.getUTCMonth(), rateDate.getUTCDate()).getTime();
        const satTime = new Date(mostRecentSaturday.getUTCFullYear(), mostRecentSaturday.getUTCMonth(), mostRecentSaturday.getUTCDate()).getTime();
        const sunTime = new Date(mostRecentSunday.getUTCFullYear(), mostRecentSunday.getUTCMonth(), mostRecentSunday.getUTCDate()).getTime();
        return rateTime === satTime || rateTime === sunTime;
    });

    let peakUsd = { date: '', value: 0 };
    let peakEur = { date: '', value: 0 };

    if (weekendRates.length > 0) {
        peakUsd = weekendRates.reduce((max, rate) => rate.USD > max.value ? { date: rate.date, value: rate.USD } : max, { date: '', value: 0 });
        peakEur = weekendRates.reduce((max, rate) => rate.EUR > max.value ? { date: rate.date, value: rate.EUR } : max, { date: '', value: 0 });
    }
    
    return {
        USD: peakUsd,
        EUR: peakEur,
    };
  },
  ['weekend-peak'],
  {
    revalidate: 86400, // Revalidate daily
    tags: ['rates'],
  }
);
