import { useQuery } from '@tanstack/react-query';
import { gqlClient } from '@/lib/graphql-client';
import { CarsQuery } from '@/api/cars/cars';

export const useCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: () => gqlClient.request(CarsQuery),
  });
};
