import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const createCarSchema = z.object({
  brand: z
    .string()
    .trim()
    .nonempty('Укажите бренд')
    .max(100, 'Не более 100 символов'),
  model: z
    .string()
    .trim()
    .nonempty('Укажите модель')
    .max(100, 'Не более 100 символов'),
  year: z
    .string()
    .nonempty('Укажите год')
    .transform(Number)
    .pipe(
      z
        .number({ message: 'Год должен быть числом' })
        .int('Год должен быть целым')
        .min(1900, 'Не раньше 1900')
        .max(currentYear + 1, `Не позже ${currentYear + 1}`),
    ),
  color: z
    .string()
    .trim()
    .nonempty('Укажите цвет')
    .max(50, 'Не более 50 символов'),
  price: z
    .string()
    .nonempty('Укажите цену')
    .transform(Number)
    .pipe(
      z
        .number({ message: 'Цена должна быть числом' })
        .int('Цена должна быть целой')
        .positive('Цена должна быть больше нуля'),
    ),
  mileage: z
    .string()
    .nonempty('Укажите пробег')
    .transform(Number)
    .pipe(
      z
        .number({ message: 'Пробег должен быть числом' })
        .int('Пробег должен быть целым')
        .min(0, 'Пробег не может быть отрицательным'),
    ),
  vin: z
    .string()
    .length(17, 'VIN состоит из 17 символов')
    .regex(/^[A-HJ-NPR-Z0-9]+$/i, 'VIN не может содержать I, O и Q')
    .transform((v) => v.toUpperCase()),
});

export const searchCarSchema = z.object({
  query: z
    .string()
    .trim()
    .nonempty('Введите запрос')
    .max(100, 'Не более 100 символов')
    .refine(
      (q) => q.split(/\s+/).some((token) => token.length >= 3),
      'Слово для поиска должно быть не короче 3 символов',
    ),
});

export type CreateCarInput = z.infer<typeof createCarSchema>;
export type SearchCarsInput = z.infer<typeof searchCarSchema>;
