import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './schema';
import { resolvers } from './schema';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin ${origin} не разрешён`));
    },
    credentials: true,
  }),
);

async function main() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', expressMiddleware(server));

  app.get('/', (req, res) => {
    res.json({ message: 'OK' });
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`GraphQL ready at http://localhost:${PORT}/graphql`);
  });
}

main();
