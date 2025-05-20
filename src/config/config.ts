import { config as dotenvConfig } from "dotenv";

dotenvConfig();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  jwtKey: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "",
  jwtKey: process.env.JWT_KEY || "",
};

export default config;
