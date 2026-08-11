import { CarFront } from 'lucide-react';

import { ModeToggle } from '@/components/ModeToggle';

export function Header() {
  return (
    <header className="sticky top-2 z-40 rounded-3xl border border-border bg-background/80 backdrop-blur">
      <div className="flex h-14 items-center gap-6 px-4">
        <a
          href="/"
          className="flex items-center gap-2 font-medium text-foreground"
        >
          <CarFront className="size-5" />
          Автомобили
        </a>

        <div className="ml-auto">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
