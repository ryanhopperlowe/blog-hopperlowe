import { PgColumnBuilderBase, timestamp, uuid } from "drizzle-orm/pg-core";

export function baseColumns<T extends Record<string, PgColumnBuilderBase>>(
  columns: T
) {
  return {
    id: uuid("id").defaultRandom().primaryKey(),
    ...columns,
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deletedAt: timestamp("deleted_at"),
  };
}
