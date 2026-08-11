import { graphql } from '../generated';

export const CarsQuery = graphql(`
  query Cars {
    getCars {
      id
      brand
      model
      year
      price
      mileage
      color
    }
  }
`);
