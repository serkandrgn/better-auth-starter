import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// Set SSL to false to fix the connection issue
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: false,
  },
});
