import { config as dotenvConfig } from "dotenv";

dotenvConfig();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 8080,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI || "",
};

export default config;
