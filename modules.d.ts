declare namespace NodeJS {
  interface ProcessEnv {
    JWT_SECRET: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;
    DB_PORT: string;
  }
}
