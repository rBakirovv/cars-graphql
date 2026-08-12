import type { Car } from '@/api/cars/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Car as CarIcon } from 'lucide-react';

export default function CarCard({ car }: { car: Car }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-left">{`${car.brand} ${car.model}`}</CardTitle>
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
