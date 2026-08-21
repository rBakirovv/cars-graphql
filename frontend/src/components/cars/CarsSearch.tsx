import { Search } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldError } from '@/components/ui/field';
import { searchCarSchema, type SearchCarsInput } from '@/lib/schemas/car';

type CarsSearchProps = {
  onSearch: (query: string) => void;
};

export function CarsSearch({ onSearch }: CarsSearchProps) {
  const form = useForm<SearchCarsInput>({
    resolver: zodResolver(searchCarSchema),
    defaultValues: { query: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (values: SearchCarsInput) => {
    onSearch(values.query);
  };

  return (
    <form className="mb-6" onSubmit={form.handleSubmit(onSubmit)}>
      <Controller
        name="query"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <div className="flex items-start gap-2">
              <Input
                {...field}
                type="search"
                placeholder="Поиск..."
                aria-invalid={fieldState.invalid}
                aria-label="Поиск автомобилей"
                className="[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
                onChange={(event) => {
                  field.onChange(event);
                  if (fieldState.error) form.clearErrors('query');
                  if (event.target.value === '') onSearch('');
                }}
              />
              <Button type="submit">
                <Search data-icon="inline-start" />
                Поиск
              </Button>
            </div>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
}
