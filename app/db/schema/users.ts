import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { baseColumns } from "../db-helpers";

export const Users = pgTable(
  "users",
  baseColumns({
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
  })
);

export type User = typeof Users.$inferSelect;
export type CreateUser = typeof Users.$inferInsert;

export const createUserSchema = createInsertSchema(Users);
export const userSchema = createSelectSchema(Users);
