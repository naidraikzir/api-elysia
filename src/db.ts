import { Database } from "bun:sqlite";
import { drizzle, BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("the.db");
export const db: BunSQLiteDatabase = drizzle(sqlite);
