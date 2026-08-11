import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { gqlClient } from '@/lib/graphql-client';
import { CarsQuery } from '@/api/cars/cars';

export default function CarsList() {
  const { isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: () => gqlClient.request(CarsQuery),
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <Spinner className="w-10 h-10" />
      </div>
    );
  }
 
  return <div className="grid "></div>;
}
