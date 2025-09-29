// @ts-nocheck
'use server';

import { unstable_cache } from 'next/cache';
import { getFallbackExchangeRate } from '@/ai/flows/fallback-exchange-rate';
import type { ExchangeRate } from '@/lib/types';

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

    