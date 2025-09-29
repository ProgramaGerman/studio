import Link from 'next/link';
import { ArrowRightLeft, LineChart } from 'lucide-react';
import { AboutModal } from './about-modal';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="mb-8 border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
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
        <Link href="/charts" passHref>
          <Button variant="outline" size="icon">
            <LineChart className="h-4 w-4" />
            <span className="sr-only">Gráficos</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
