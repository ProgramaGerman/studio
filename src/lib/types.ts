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

export type HistoricalRate = {
  date: string;
  USD: number;
  EUR: number;
};

export type WeekendPeak = {
  USD: { date: string; value: number };
  EUR: { date: string; value: number };
};
