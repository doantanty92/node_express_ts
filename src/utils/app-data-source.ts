import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import config from 'config';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

interface PostgresConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

const postgresConfig = config.get<PostgresConfig>('postgresConfig');
const AppDataSource = new DataSource({
  ...postgresConfig,
  type: 'postgres',
  synchronize: false,
  logging: false,
  entities: ['src/entities/**/*{.ts,.js}'],
  migrations: ['./src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});

export default AppDataSource;
