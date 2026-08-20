import { GraphQLError } from 'graphql';
import prisma from '../../prisma/client';
import { Prisma } from '../../generated/prisma';
import { UpdateCarArgs, CreateCarArgs, CarByIdArgs } from './car.types';

export const carService = {
  getCars: () =>
    prisma.car.findMany({ orderBy: [{ createdAt: 'desc' }, { id: 'desc' }] }),

  getCarById: ({ id }: CarByIdArgs) =>
    prisma.car.findUnique({ where: { id: Number(id) } }),

  createCar: async (args: CreateCarArgs) => {
    try {
      return await prisma.car.create({ data: args });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new GraphQLError('Автомобиль с таким VIN уже существует', {
          extensions: { code: 'CONFLICT', field: 'vin' },
        });
      }

      throw error;
    }
  },

  updateCar: ({ id, ...data }: UpdateCarArgs) =>
    prisma.car.update({
      where: { id: Number(id) },
      data,
    }),

  deleteCar: ({ id }: CarByIdArgs) =>
    prisma.car.delete({ where: { id: Number(id) } }),
};
