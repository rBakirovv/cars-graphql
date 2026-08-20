import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '@/lib/graphql-client';
import { CarsQuery, CreateCarMutation } from '@/api/cars/cars';
import type { CreateCarInput } from '@/lib/schemas/car';

export const useCars = () => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: () => gqlClient.request(CarsQuery),
  });
};

export const useCreateCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateCarInput) =>
      gqlClient.request(CreateCarMutation, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};
