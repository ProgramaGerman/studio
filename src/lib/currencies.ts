import { CircleDollarSign, Euro, Landmark } from 'lucide-react';

export const CURRENCIES: Record<string, { name: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }> = {
  USD: { name: 'US Dollar', icon: CircleDollarSign },
  EUR: { name: 'Euro', icon: Euro },
  VES: { name: 'Venezuelan Bolívar', icon: Landmark },
};
