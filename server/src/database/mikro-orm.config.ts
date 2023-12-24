import config from "@config";
import { PROD } from "@constants";
import { Options } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

export default {
  driver: PostgreSqlDriver,
  type: "postgresql",
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  dbName: config.DB_NAME,
  entities: ["dist/entities/*.entity.js"],
  entitiesTs: ["src/entities/*.entity.ts"],
  migrations: {
    tableName: "migrations",
    pathTs: "src/migrations",
    path: "dist/migrations",
  },
} as Options;
