import 'dotenv/config';

export const env = {
  jwtSecret: process.env.JWT_SECRET!,
  nodeEnv: process.env.NODE_ENV!,
  dataBaseUrl: process.env.DATABASE_URL!,
};
