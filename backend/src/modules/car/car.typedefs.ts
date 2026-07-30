export const carTypeDefs = `#graphql
  """
  Автомобиль в каталоге
  """
  type Car {
    id: ID!
    brand: String!
    model: String!
    year: Int!
    price: Int!
    mileage: Int!
    color: String!
    vin: String!
    createdAt: String!
  }

  type Query {
    """Получить все автомобили"""
    getCars: [Car!]!
    
    """Получить автомобиль по ID"""
    getCarById(id: ID!): Car
  }

  type Mutation {
    """Создать автомобиль"""
    createCar(
      brand: String! 
      model: String!
      year: Int!
      price: Int!
      mileage: Int!
      color: String!
      vin: String!
    ): Car!

    """Обновить автомобиль"""
    updateCar(
      id: ID!
      brand: String 
      model: String
      year: Int
      price: Int
      mileage: Int
      color: String
      vin: String
    ): Car!

    """Удалить автомобиль"""
    deleteCar(id: ID!): Car!
  }
`;
