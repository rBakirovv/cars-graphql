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

export const CreateCarMutation = graphql(`
  mutation CreateCar(
    $brand: String!
    $model: String!
    $year: Int!
    $price: Int!
    $mileage: Int!
    $color: String!
    $vin: String!
  ) {
    createCar(
      brand: $brand
      model: $model
      year: $year
      price: $price
      mileage: $mileage
      color: $color
      vin: $vin
    ) {
      id
      brand
      model
      mileage
      color
    }
  }
`);

export const DeleteCarMutation = graphql(`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id) {
      id
    }
  }
`);
