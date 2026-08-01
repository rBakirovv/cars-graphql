import prisma from '../../prisma/client';
import { UpdateCarArgs, CreateCarArgs, CarByIdArgs, SearchCarsArgs } from './car.types';

export const carService = {
  getCars: () => prisma.car.findMany(),

  getCarById: ({ id }: CarByIdArgs) =>
    prisma.car.findUnique({ where: { id: Number(id) } }),

  createCar: (args: CreateCarArgs) => prisma.car.create({ data: args }),

  updateCar: ({ id, ...data }: UpdateCarArgs) =>
    prisma.car.update({
      where: { id: Number(id) },
      data,
    }),

  deleteCar: ({ id }: CarByIdArgs) =>
    prisma.car.delete({ where: { id: Number(id) } }),
};
