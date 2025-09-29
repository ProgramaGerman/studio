"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRightLeft, LineChart, Home } from 'lucide-react';
import { AboutModal } from './about-modal';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();

  const isChartsPage = pathname === '/charts';
  const linkHref = isChartsPage ? '/' : '/charts';
  const buttonIcon = isChartsPage ? <Home className="h-4 w-4" /> : <LineChart className="h-4 w-4" />;
  const srText = isChartsPage ? 'Inicio' : 'Gráficos';


  return (
    <header className="mb-8 border-b">
      <div className="container mx-auto flex items-center justify-evenly py-4 px-4 sm:px-0">
        <AboutModal />
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              TasaReal
            </h1>
          </Link>
        </div>
        <Link href={linkHref} passHref>
          <Button variant="outline" size="icon">
            {buttonIcon}
            <span className="sr-only">{srText}</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
