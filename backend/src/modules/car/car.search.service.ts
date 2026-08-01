import { Prisma } from '../../generated/prisma';
import prisma from '../../prisma/client';
import { SearchCarsArgs } from './car.types';

const SCORE_THRESHOLD = 0.5;
const MAX_TOKENS = 6;
const MIN_TOKEN_LENGTH = 3;

interface SearchRow {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  vin: string;
  createdAt: Date;
  score: number;
}

export const carSearchService = {
  searchCars: async ({ query, limit = 20 }: SearchCarsArgs) => {
    const tokens = query
      .toLowerCase()
      .split(/\s+/)
      .filter((token) => token.length >= MIN_TOKEN_LENGTH)
      .slice(0, MAX_TOKENS);

    if (!tokens.length) return [];

    const perToken = tokens.map(
      (token) => Prisma.sql`GREATEST(
        similarity(brand, ${token}),
        similarity(model, ${token}),
        similarity(color, ${token})
      )`,
    );

    const score = Prisma.sql`(${Prisma.join(perToken, ' + ')}) / ${tokens.length}::float`;

    const rows = await prisma.$queryRaw<SearchRow[]>`
      SELECT
        id, brand, model, year, price, mileage, color, vin,
        created_at AS "createdAt",
        ${score} AS score
      FROM cars
      WHERE ${score} > ${SCORE_THRESHOLD}
      ORDER BY score DESC
      LIMIT ${limit}
    `;

    return rows.map(({ score, ...car }) => car);
  },
};
