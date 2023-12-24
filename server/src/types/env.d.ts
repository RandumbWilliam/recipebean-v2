namespace NodeJS {
  interface ProcessEnv {
    CLIENT_BASE_URL: string;

    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;

    REDIS_URL: string;

    SESSION_SECRET: string;
  }
}
