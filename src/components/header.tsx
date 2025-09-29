import { ArrowRightLeft } from 'lucide-react';
import { AboutModal } from './about-modal';

export function Header() {
  return (
    <header className="mb-8 border-b">
      <div className="container mx-auto flex items-center justify-between py-4">
        <div className="w-10"></div> {/* Spacer */}
        <div className="flex items-center justify-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
            <ArrowRightLeft className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            TasaReal
            </h1>
        </div>
        <AboutModal />
      </div>
    </header>
  );
}
