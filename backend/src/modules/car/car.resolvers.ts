import { carService } from './car.service';
import { UpdateCarArgs, CreateCarArgs, CarByIdArgs } from './car.types';

export const carResolvers = {
  Query: {
    getCars: () => carService.getCars(),
    getCarById: (_: unknown, args: CarByIdArgs) => carService.getCarById(args),
  },
  Mutation: {
    createCar: (_: unknown, args: CreateCarArgs) => carService.createCar(args),
    updateCar: (_: unknown, { id, ...data }: UpdateCarArgs) =>
      carService.updateCar({ id, ...data }),
    deleteCar: (_: unknown, args: CarByIdArgs) => carService.deleteCar(args),
  },
};
