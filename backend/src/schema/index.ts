import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { carTypeDefs } from '../modules/car/car.typedefs';
import { carResolvers } from '../modules/car/car.resolvers';

export const typeDefs = mergeTypeDefs([carTypeDefs]);
export const resolvers = mergeResolvers([carResolvers]);
