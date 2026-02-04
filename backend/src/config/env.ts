import dotenv from "dotenv";
import path from "path";

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface Config {
  NODE_ENV: string;
  PORT: number;
  DATABASE_URL: string;
  REDIS_URL: string;
  GEMINI_API_KEY: string; // Or OPENAI_API_KEY
  JWT_SECRET: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  CLIENT_URL: string;
}

// Validation function - explicit over clever
const getEnv = (key: string, required = true): string => {
  const value = process.env[key];
  if (required && !value) {
    throw new Error(`[FATAL] Missing required environment variable: ${key}`);
  }
  return value || "";
};

export const config: Config = {
  NODE_ENV: getEnv("NODE_ENV", false) || "development",
  PORT: parseInt(getEnv("PORT", false) || "3000", 10),
  DATABASE_URL: getEnv("DATABASE_URL"),
  REDIS_URL: getEnv("REDIS_URL"),
  GEMINI_API_KEY: getEnv("GEMINI_API_KEY"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  CLIENT_URL: getEnv("CLIENT_URL", false) || "http://localhost:5173",
};
