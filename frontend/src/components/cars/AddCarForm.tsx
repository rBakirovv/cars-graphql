import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from '@/components/ui/field';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { z } from 'zod';
import { createCarSchema, type CreateCarInput } from '@/lib/schemas/car';
import { useCreateCar } from '@/hooks/cars/useСars';
import { ClientError } from 'graphql-request';

export default function AddCarForm({ onSuccess }: { onSuccess?: () => void }) {
  const createCar = useCreateCar();

  const form = useForm<
    z.input<typeof createCarSchema>,
    unknown,
    z.output<typeof createCarSchema>
  >({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      brand: '',
      model: '',
      color: '',
      vin: '',
      year: '',
      price: '',
      mileage: '',
    },
  });

  const onSubmit = async (values: CreateCarInput) => {
    try {
      await createCar.mutateAsync(values);
      form.reset();
      onSuccess?.();
    } catch (error) {
      if (error instanceof ClientError) {
        const code = error.response.errors?.[0]?.extensions?.code;
        if (code === 'CONFLICT') {
          form.setError('vin', {
            message: 'Автомобиль с таким VIN уже существует',
          });
          return;
        }
      }
      form.setError('root', { message: 'Не удалось сохранить автомобиль' });
    }
  };

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup className="gap-4">
        <FieldGroup className="grid grid-cols-2">
          <Controller
            name="brand"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="car-brand">Бренд</FieldLabel>
                <Input
                  {...field}
                  id="car-brand"
                  placeholder="Toyota"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="model"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="car-model">Модель</FieldLabel>
                <Input
                  {...field}
                  id="car-model"
                  placeholder="Camry"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="grid grid-cols-2">
          <Controller
            name="year"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="car-year">Год выпуска</FieldLabel>
                <Input
                  {...field}
                  id="car-year"
                  type="number"
                  placeholder="2019"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="color"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="car-color">Цвет</FieldLabel>
                <Input
                  {...field}
                  id="car-color"
                  placeholder="Чёрный"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup className="grid grid-cols-2">
          <Controller
            name="price"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="car-price">Цена, ₽</FieldLabel>
                <Input
                  {...field}
                  id="car-price"
                  type="number"
                  placeholder="1850000"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="mileage"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="car-mileage">Пробег, км</FieldLabel>
                <Input
                  {...field}
                  id="car-mileage"
                  type="number"
                  placeholder="87400"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Controller
          name="vin"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="car-vin">VIN</FieldLabel>
              <Input
                {...field}
                id="car-vin"
                placeholder="JTDBE32K600123456"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <DialogFooter>
        <DialogClose render={<Button variant="outline">Отмена</Button>} />
        <Button type="submit">Сохранить</Button>
      </DialogFooter>
    </form>
  );
}
