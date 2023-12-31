import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  username: text("username").unique(),
  password: text("password"),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
});

export type User = typeof users.$inferSelect
