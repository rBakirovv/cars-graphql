import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gqlClient } from '@/lib/graphql-client';
import {
  CarsQuery,
  CreateCarMutation,
  DeleteCarMutation,
  SearchCarsQuery,
} from '@/api/cars/cars';
import type { CreateCarInput } from '@/lib/schemas/car';

export const useCars = (enabled = true) => {
  return useQuery({
    queryKey: ['cars'],
    queryFn: () => gqlClient.request(CarsQuery),
    enabled,
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

export const useDeleteCar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gqlClient.request(DeleteCarMutation, { id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cars'] }),
  });
};

export const useSearchCars = (query: string) =>
  useQuery({
    queryKey: ['cars', 'search', query],
    queryFn: () => gqlClient.request(SearchCarsQuery, { query }),
    enabled: query.trim().length >= 3,
  });
