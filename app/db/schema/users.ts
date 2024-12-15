import { z } from "zod";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { baseColumns } from "../db-helpers";
import { Articles } from "./articles";
import { relations } from "drizzle-orm";

export const Users = pgTable(
  "users",
  baseColumns({
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
  })
);

export const createUserSchema = createInsertSchema(Users)
  .omit({ passwordHash: true })
  .extend({
    email: z.string().email().regex(new RegExp(process.env.MY_EMAIL_REGEX)),
    password: z.string().min(4),
    confirmPassword: z.string(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    path: ["confirmPassword"],
    message: "Confirm password must match password",
  });

export const userSchema = createSelectSchema(Users).omit({
  passwordHash: true,
});

export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;

export const usersRelations = relations(Users, ({ many }) => ({
  articles: many(Articles),
}));
