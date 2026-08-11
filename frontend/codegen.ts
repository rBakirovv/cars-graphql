import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: process.env.VITE_API_URL ?? 'http://localhost:3000/graphql',
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/api/generated/': {
      preset: 'client',
      config: { useTypeImports: true },
    },
  },
};

export default config;
