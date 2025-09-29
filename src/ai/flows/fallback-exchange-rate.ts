'use server';

/**
 * @fileOverview A Genkit flow that retrieves exchange rates, with a fallback mechanism using GenAI.
 *
 * - getFallbackExchangeRate - A function that retrieves the exchange rate with fallback.
 * - FallbackExchangeRateInput - The input type for the getFallbackExchangeRate function.
 * - FallbackExchangeRateOutput - The return type for the getFallbackExchangeRate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FallbackExchangeRateInputSchema = z.object({
  primarySourceFailureReason: z
    .string()
    .describe('The reason the primary data source failed.'),
  baseCurrency: z.string().describe('The base currency (e.g., USD, EUR).'),
  targetCurrency: z.string().describe('The target currency (e.g., VES).'),
});
export type FallbackExchangeRateInput = z.infer<typeof FallbackExchangeRateInputSchema>;

const FallbackExchangeRateOutputSchema = z.object({
  exchangeRate: z.number().describe('The exchange rate from base to target currency.'),
  source: z.string().describe('The source from which the exchange rate was obtained.'),
});
export type FallbackExchangeRateOutput = z.infer<typeof FallbackExchangeRateOutputSchema>;

export async function getFallbackExchangeRate(
  input: FallbackExchangeRateInput
): Promise<FallbackExchangeRateOutput> {
  return fallbackExchangeRateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fallbackExchangeRatePrompt',
  input: {schema: FallbackExchangeRateInputSchema},
  output: {schema: FallbackExchangeRateOutputSchema},
  prompt: `The primary source for exchange rates failed because "{{{primarySourceFailureReason}}}".

  Find the current exchange rate for {{{baseCurrency}}} to {{{targetCurrency}}} from reliable alternative sources on the internet.

  Return the exchange rate and the source from which you obtained it.
  Ensure that the exchange rate is a number.
  `,
});

const fallbackExchangeRateFlow = ai.defineFlow(
  {
    name: 'fallbackExchangeRateFlow',
    inputSchema: FallbackExchangeRateInputSchema,
    outputSchema: FallbackExchangeRateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
