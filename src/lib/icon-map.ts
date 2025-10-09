import { faDollarSign, faEuroSign, faLandmark } from '@fortawesome/free-solid-svg-icons';
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const getCurrencyIcon = (currency: string): IconDefinition | null => {
  switch(currency) {
    case 'USD': return faDollarSign;
    case 'EUR': return faEuroSign;
    case 'VES': return faLandmark;
    default: return null;
  }
};
