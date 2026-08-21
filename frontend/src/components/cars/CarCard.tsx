import type { Car } from '@/api/cars/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Car as CarIcon, Trash } from 'lucide-react';
import ConfirmActionModal from './ConfirmActionModal';
import { useDeleteCar } from '@/hooks/cars/useСars';

export default function CarCard({ car }: { car: Car }) {
  const deleteCar = useDeleteCar();

  return (
    <Card className="relative">
      <ConfirmActionModal
        title="Удалить автомобиль?"
        description={`${car.brand} ${car.model}, ${car.year} год — будет удалён безвозвратно. Отменить это действие нельзя`}
        confirmLabel="Удалить"
        onConfirm={() => deleteCar.mutateAsync(car.id)}
        className="absolute right-2 top-2"
      >
        <Trash strokeWidth={2.5} />
        <span className="sr-only">Удалить автомобиль</span>
      </ConfirmActionModal>
      <CardHeader>
        <CardTitle className="text-left">{`${car.color} ${car.brand} ${car.model}`}</CardTitle>
        <CardDescription className="text-left">
          {`${car.year} год, пробег ${car.mileage}км`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="flex justify-center items-center py-12">
          <CarIcon size={100} strokeWidth={1} />
        </Card>
      </CardContent>
    </Card>
  );
}
