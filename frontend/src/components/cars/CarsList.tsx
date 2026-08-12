import { Spinner } from '@/components/ui/spinner';
import CarCard from './CarCard';
import { useCars } from '@/hooks/cars/useСars';

export default function CarsList() {
  const { data, isLoading } = useCars();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Spinner className="w-10 h-10" />
      </div>
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
