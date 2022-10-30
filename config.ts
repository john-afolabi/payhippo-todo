import dotenv from 'dotenv';
dotenv.config();

interface IConfig {
  url?: string;
  port: number;
  isProduction: boolean;
  isDevelopment: boolean;
  isTestEnvironment: boolean;
}

export const initConfig = (): IConfig => {
  const { NODE_ENV, PORT, BACKEND_URL } = process.env;
  switch (NODE_ENV) {
    case 'development':
      return {
        isProduction: false,
        isDevelopment: true,
        isTestEnvironment: false,
        port: Number(PORT) || 3001,
        url: `localhost:${Number(PORT)}`,
      };
    case 'production':
      return {
        isProduction: true,
        isDevelopment: false,
        isTestEnvironment: false,
        port: Number(PORT) || 3001,
        url: BACKEND_URL,
      };
    case 'test':
      return {
        isProduction: false,
        isDevelopment: false,
        isTestEnvironment: true,
        port: Number(PORT) || 4000,
        url: BACKEND_URL,
      };
    default:
      return {
        isProduction: false,
        isDevelopment: true,
        isTestEnvironment: false,
        port: Number(PORT) || 3001,
        url: BACKEND_URL,
      };
  }
};

export const config = initConfig();
