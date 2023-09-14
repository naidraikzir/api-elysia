import type { Config } from "drizzle-kit";
import { globSync } from "glob";

export default {
  schema: globSync("./src/**/schema.ts"),
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "./the.db",
  },
} satisfies Config;
