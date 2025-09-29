import { TrendingUp } from 'lucide-react';

export function Header() {
  return (
    <header className="mb-8 border-b">
      <div className="container mx-auto flex items-center gap-3 py-4">
        <div className="bg-primary/10 p-2 rounded-lg">
          <TrendingUp className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          TasaReal
        </h1>
      </div>
    </header>
  );
}
