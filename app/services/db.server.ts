import { drizzle } from "drizzle-orm/node-postgres";

export const DB = drizzle(process.env.DATABASE_URL);
