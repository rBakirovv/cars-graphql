import { CarFront } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { Card } from './ui/card';

export function Header() {
  return (
    <header className="sticky top-2 z-40 bg-background/80 backdrop-blur rounded-4xl">
      <Card className="flex flex-row items-center gap-6 p-4">
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
      </Card>
    </header>
  );
}
