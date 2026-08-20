import { CarFront } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { Card } from './ui/card';
import AddCarModal from './cars/AddCarModal';

export function Header() {
  return (
    <header className="sticky top-2 z-40 bg-background/80 backdrop-blur rounded-4xl">
      <Card className="flex flex-row items-center gap-6 p-4">
        <a
          href="/"
          className="flex items-center gap-2 text-lg font-medium text-foreground"
        >
          <CarFront className="size-6" strokeWidth={2} />
          Автомобили
        </a>

        <div className="ml-auto flex items-center gap-2">
          <AddCarModal />
          <ModeToggle />
        </div>
      </Card>
    </header>
  );
}
