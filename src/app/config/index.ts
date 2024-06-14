import { config as dotEnvConfig } from "dotenv";
import { join } from "path";

dotEnvConfig({ path: join(process.cwd(), ".env") });

const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV as "development" | "production",
  DB_URI: process.env.DB_URI,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
};

export default config;
