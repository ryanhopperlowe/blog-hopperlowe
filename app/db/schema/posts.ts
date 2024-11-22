import { pgTable, text, boolean, uuid } from "drizzle-orm/pg-core";
import { baseColumns } from "../db-helpers";
import { Users } from "./users";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const posts = pgTable(
  "posts",
  baseColumns({
    title: text("title").notNull(),
    content: text("content"),
    published: boolean("published").notNull().default(false),
    authorId: uuid("author_id").references(() => Users.id),
  })
);

export type Post = typeof posts.$inferSelect;
export type CreatePost = typeof posts.$inferInsert;

export const createPostSchema = createInsertSchema(posts);
export const postSchema = createSelectSchema(posts);
