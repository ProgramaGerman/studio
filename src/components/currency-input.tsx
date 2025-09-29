'use client';

import type { ComponentProps } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CurrencyCode } from '@/lib/types';

interface CurrencyInputProps extends Omit<ComponentProps<'input'>, 'onChange'> {
  id: string;
  label: string;
  currency: CurrencyCode;
  value: string;
  onChange: (value: string) => void;
}

export function CurrencyInput({ id, label, currency, value, onChange, ...props }: CurrencyInputProps) {
    const getIconClass = (currency: string) => {
        switch(currency) {
          case 'USD': return 'fa-solid fa-dollar-sign';
          case 'EUR': return 'fa-solid fa-euro-sign';
          case 'VES': return 'fa-solid fa-landmark';
          default: return '';
        }
      }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <i className={`${getIconClass(currency)} h-5 w-5 text-muted-foreground`}></i>
        </div>
        <Input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*\.?\d*$/.test(val)) {
              onChange(val);
            }
          }}
          className="pl-10 pr-16 text-lg"
          {...props}
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
          <span className="text-sm font-semibold text-muted-foreground">{currency}</span>
        </div>
      </div>
    </div>
  );
}

    