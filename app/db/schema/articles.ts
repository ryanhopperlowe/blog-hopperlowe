import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { baseColumns } from "../db-helpers";
import { Users } from "./users";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const Articles = pgTable(
  "articles",
  baseColumns({
    title: text("title").notNull(),
    summary: text("summary"),
    location: text("location").notNull().unique(),
    authorId: uuid("author_id")
      .references(() => Users.id)
      .notNull(),
  })
);

export const createArticleSchema = createInsertSchema(Articles, {
  title: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
});
export const articleSchema = createSelectSchema(Articles);

export type Article = z.infer<typeof articleSchema>;
export type CreateArticle = z.infer<typeof createArticleSchema>;

export const articlesRelations = relations(Articles, ({ one }) => ({
  author: one(Users, {
    fields: [Articles.authorId],
    references: [Users.id],
  }),
}));
