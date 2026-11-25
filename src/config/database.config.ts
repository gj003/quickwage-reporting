import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

const bool = (v: string | undefined, fallback: boolean) =>
  v === undefined ? fallback : v === 'true' || v === '1';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'report_and_analysis',
  ssl:
    process.env.DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined,
  autoLoadEntities: true,
  synchronize: bool(process.env.DB_SYNCHRONIZE, process.env.NODE_ENV !== 'production'),
  logging: bool(process.env.DB_LOGGING, false),
});
