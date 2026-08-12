import CarCard from './CarCard';
import { useCars } from '@/hooks/cars/useСars';
import { CarCardSkeleton } from './CarCardSkeleton';
import { AlertCircleIcon } from 'lucide-react';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '../ui/button';

export default function CarsList() {
  const { data, isLoading, isError, error, refetch } = useCars();

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }, (_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive" className="f-wull">
        <AlertCircleIcon />
        <AlertTitle>Не удалось загрузить каталог</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'Неизвестная ошибка'}
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="default" onClick={() => refetch()}>
            Повторить
          </Button>
        </AlertAction>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {data?.getCars &&
        data.getCars.map((car) => {
          return <CarCard car={car} key={car.id} />;
        })}
    </div>
  );
}
