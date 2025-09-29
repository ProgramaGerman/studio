// @ts-nocheck
'use server';

import { unstable_cache } from 'next/cache';
import { getFallbackExchangeRate } from '@/ai/flows/fallback-exchange-rate';
import type { ExchangeRate } from '@/lib/types';

async function fetchFromPrimarySource(base: string, target: string): Promise<number | null> {
    console.log(`Attempting to fetch ${base}/${target} from primary source...`);
    // This is a mock. DolarApi.com is for ARS, not VES.
    // We return null to simulate an API failure or unsupported currency.
    return null;
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
            let source = 'DolarApi.com (Mock)';
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
