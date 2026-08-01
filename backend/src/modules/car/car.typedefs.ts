export const carTypeDefs = `#graphql
  """Автомобиль в каталоге"""
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

  input CarFilterInput {
    """Поиск по подстроке"""
    brand: String
    model: String
    color: String
  }

  type Query {
    """Получить все автомобили"""
    getCars: [Car!]!
    
    """Получить автомобиль по ID"""
    getCarById(id: ID!): Car

    """Нечёткий поиск автомобиля по бренду, модели и цвету"""
    searchCars(query: String! limit: Int = 20): [Car!]!
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
