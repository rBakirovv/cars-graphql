import { carSearchService } from './car.search.service';
import { carService } from './car.service';
import { UpdateCarArgs, CreateCarArgs, CarByIdArgs, SearchCarsArgs } from './car.types';

export const carResolvers = {
  Query: {
    getCars: () => carService.getCars(),
    getCarById: (_: unknown, args: CarByIdArgs) => carService.getCarById(args),
    searchCars: (_: unknown, args: SearchCarsArgs) => carSearchService.searchCars(args),
  },
  Mutation: {
    createCar: (_: unknown, args: CreateCarArgs) => carService.createCar(args),
    updateCar: (_: unknown, { id, ...data }: UpdateCarArgs) =>
      carService.updateCar({ id, ...data }),
    deleteCar: (_: unknown, args: CarByIdArgs) => carService.deleteCar(args),
  },
};
