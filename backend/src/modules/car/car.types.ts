export interface UpdateCarArgs extends Partial<CreateCarArgs> {
  id: string;
}

export interface CreateCarArgs {
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  vin: string;
}

export interface CarByIdArgs {
  id: string;
}
