import { Pool } from "pg";
import { config } from "./env";

// SSL Config: needed for production/cloud databases like Supabase
const sslConfig =
  config.NODE_ENV === "production" || config.DATABASE_URL.includes("supabase")
    ? { rejectUnauthorized: false }
    : false;

const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000, // INCREASED: 2s -> 10s
  ssl: sslConfig, // ADDED: Force SSL
});

pool.on("error", (err) => {
  console.error("[DB] Unexpected error on idle client", err);
  process.exit(-1);
});

pool.on("connect", () => {
  // console.log('[DB] New client connected');
});

export const db = {
  query: (text: string, params?: any[]) => pool.query(text, params),
  getClient: () => pool.connect(),
  close: () => pool.end(),
};
