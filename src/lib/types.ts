export type CurrencyCode = 'USD' | 'EUR' | 'VES';

export type Currency = {
  code: CurrencyCode;
  name: string;
};

export type ExchangeRate = {
  base: string;
  target: string;
  rate: number;
  source: string;
};
