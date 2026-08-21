import { useState } from 'react';
import { CarsSearch } from './CarsSearch';
import CarsList from './CarsList';

export function CarsCatalog() {
  const [query, setQuery] = useState('');

  return (
    <>
      <CarsSearch onSearch={setQuery} />
      <CarsList query={query} />
    </>
  );
}
