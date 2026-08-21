import CarCard from './CarCard';
import { useCars, useSearchCars } from '@/hooks/cars/useСars';
import { CarCardSkeleton } from './CarCardSkeleton';
import { AlertCircleIcon } from 'lucide-react';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '../ui/button';

type CarsListProps = {
  query?: string;
};

export default function CarsList({ query = '' }: CarsListProps) {
  const isSearching = query.trim().length > 0;

  const allCars = useCars(!isSearching);
  const foundCars = useSearchCars(query);

  const source = isSearching ? foundCars : allCars;
  const cars = isSearching ? foundCars.data?.searchCars : allCars.data?.getCars;

  if (source.isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (source.isError) {
    return (
      <Alert variant="destructive" className="w-full">
        <AlertCircleIcon />
        <AlertTitle>
          {isSearching
            ? 'Не удалось выполнить поиск'
            : 'Не удалось загрузить каталог'}
        </AlertTitle>
        <AlertDescription>
          {source.error instanceof Error
            ? source.error.message
            : 'Неизвестная ошибка'}
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="default" onClick={() => source.refetch()}>
            Повторить
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  if (!cars?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        {isSearching
          ? `По запросу «${query}» ничего не нашлось`
          : 'Каталог пуст'}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {cars.map((car) => (
        <CarCard car={car} key={car.id} />
      ))}
    </div>
  );
}
