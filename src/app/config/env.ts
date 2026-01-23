import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV!,
  jwtSecret: process.env.JWT_SECRET!,
  refreshSecret: process.env.REFRESH_SECRET!,
  dataBaseUrl: process.env.DATABASE_URL!,
};
