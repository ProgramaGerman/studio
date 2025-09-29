'use server';

/**
 * @fileOverview A flow to explain the factors influencing current exchange rates.
 *
 * - explainExchangeRateFluctuations - A function that provides a summary of factors influencing exchange rates.
 * - ExplainExchangeRateFluctuationsInput - The input type for the explainExchangeRateFluctuations function.
 * - ExplainExchangeRateFluctuationsOutput - The return type for the explainExchangeRateFluctuations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainExchangeRateFluctuationsInputSchema = z.object({
  baseCurrency: z.string().describe('The base currency (e.g., USD, EUR).'),
  targetCurrency: z.string().describe('The target currency (e.g., VES).'),
});
export type ExplainExchangeRateFluctuationsInput = z.infer<typeof ExplainExchangeRateFluctuationsInputSchema>;

const ExplainExchangeRateFluctuationsOutputSchema = z.object({
  explanation: z.string().describe('A summary of the factors influencing the exchange rate between the base and target currencies.'),
});
export type ExplainExchangeRateFluctuationsOutput = z.infer<typeof ExplainExchangeRateFluctuationsOutputSchema>;

export async function explainExchangeRateFluctuations(input: ExplainExchangeRateFluctuationsInput): Promise<ExplainExchangeRateFluctuationsOutput> {
  return explainExchangeRateFluctuationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainExchangeRateFluctuationsPrompt',
  input: {schema: ExplainExchangeRateFluctuationsInputSchema},
  output: {schema: ExplainExchangeRateFluctuationsOutputSchema},
  prompt: `You are an expert financial analyst. Provide a summary of the factors that may be influencing the current exchange rate between {{baseCurrency}} and {{targetCurrency}}. Consider factors such as economic indicators, political events, and global market trends.`,
});

const explainExchangeRateFluctuationsFlow = ai.defineFlow(
  {
    name: 'explainExchangeRateFluctuationsFlow',
    inputSchema: ExplainExchangeRateFluctuationsInputSchema,
    outputSchema: ExplainExchangeRateFluctuationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
