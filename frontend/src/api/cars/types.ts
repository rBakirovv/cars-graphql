import type { CarsQuery } from '@/api/generated/graphql';

export type Car = CarsQuery['getCars'][number];
