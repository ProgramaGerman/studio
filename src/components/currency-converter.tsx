'use client';

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CurrencyInput } from "@/components/currency-input";
import type { ExchangeRate, CurrencyCode } from "@/lib/types";
import { ArrowDownUp } from "lucide-react";

type CurrencyConverterProps = {
  rates: ExchangeRate[];
};

export function CurrencyConverter({ rates }: CurrencyConverterProps) {
  const [values, setValues] = useState({ USD: "", EUR: "", VES: "" });

  const usdToVesRate = rates.find(r => r.base === 'USD')?.rate || 0;
  const eurToVesRate = rates.find(r => r.base === 'EUR')?.rate || 0;

  useEffect(() => {
    if (usdToVesRate > 0) {
      handleAmountChange('USD', '1');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usdToVesRate, eurToVesRate]);

  const handleAmountChange = (currency: CurrencyCode, value: string) => {
    if (value === "") {
      setValues({ USD: "", EUR: "", VES: "" });
      return;
    }
    
    const amount = parseFloat(value);
    if (isNaN(amount)) return;

    const newValues = { USD: "", EUR: "", VES: "" };

    if (currency === 'USD') {
        const vesValue = amount * usdToVesRate;
        newValues.USD = value;
        newValues.VES = vesValue > 0 ? vesValue.toLocaleString('es-VE', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(/\./g, 'TEMP').replace(/,/g, '.').replace(/TEMP/g, ',') : '0.00';
        if (eurToVesRate > 0) {
            newValues.EUR = (vesValue / eurToVesRate).toFixed(2);
        }
    } else if (currency === 'EUR') {
        const vesValue = amount * eurToVesRate;
        newValues.EUR = value;
        newValues.VES = vesValue > 0 ? vesValue.toLocaleString('es-VE', {minimumFractionDigits: 2, maximumFractionDigits: 2}).replace(/\./g, 'TEMP').replace(/,/g, '.').replace(/TEMP/g, ',') : '0.00';
        if (usdToVesRate > 0) {
            newValues.USD = (vesValue / usdToVesRate).toFixed(2);
        }
    } else if (currency === 'VES') {
        const vesAmount = parseFloat(value.replace(/\./g, '').replace(',', '.'));
        if (isNaN(vesAmount)) return;
        newValues.VES = value;
        if (usdToVesRate > 0) {
            newValues.USD = (vesAmount / usdToVesRate).toFixed(2);
        }
        if (eurToVesRate > 0) {
            newValues.EUR = (vesAmount / eurToVesRate).toFixed(2);
        }
    }
    setValues(newValues);
  };
  
  const handleFormattedChange = (currency: CurrencyCode, value: string) => {
    const sanitizedValue = value.replace(/[^0-9,]/g, '');
    handleAmountChange(currency, sanitizedValue.replace(',', '.'));
  }


  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 space-y-6">
        <CurrencyInput
          id="ves"
          label="Bolívares"
          currency="VES"
          value={values.VES}
          onChange={(val) => handleFormattedChange('VES', val)}
          placeholder="0,00"
        />
        <div className="flex items-center justify-center text-muted-foreground">
            <ArrowDownUp className="w-5 h-5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <CurrencyInput
                id="usd"
                label="Dólares"
                currency="USD"
                value={values.USD}
                onChange={(val) => handleAmountChange('USD', val)}
                placeholder="0.00"
            />
            <CurrencyInput
                id="eur"
                label="Euros"
                currency="EUR"
                value={values.EUR}
                onChange={(val) => handleAmountChange('EUR', val)}
                placeholder="0.00"
            />
        </div>
      </CardContent>
    </Card>
  );
}
