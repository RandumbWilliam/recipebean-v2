import { config } from "dotenv";
config({ path: ".env" });

interface ENV {
  NODE_ENV: string | undefined;
  PORT: number | undefined;
  CLIENT_BASE_URL: string | undefined;
  DB_HOST: string | undefined;
  DB_PORT: number | undefined;
  DB_USER: string | undefined;
  DB_PASSWORD: string | undefined;
  DB_NAME: string | undefined;
  REDIS_URL: string | undefined;
  SESSION_SECRET: string | undefined;
}

interface Config {
  NODE_ENV: string;
  PORT: number;
  CLIENT_BASE_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  REDIS_URL: string;
  SESSION_SECRET: string;
}

const getConfig = (): ENV => {
  return {
    NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : "development",
    PORT: process.env.PORT ? Number(process.env.PORT) : 4000,
    CLIENT_BASE_URL: process.env.CLIENT_BASE_URL,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    REDIS_URL: process.env.REDIS_URL,
    SESSION_SECRET: process.env.SESSION_SECRET,
  };
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const rawConfig = getConfig();

const sanitizedConfig = getSanitzedConfig(rawConfig);

export default sanitizedConfig;
