import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import Books from "./modules/Books";

if (!Bun.env.SECRET) {
  console.error("Missing SECRET!");
  process.exit();
}

const app = new Elysia()
  .use(jwt({
    name: "apiElysia",
    secret: Bun.env.SECRET,
  }))
  .use(swagger({
    documentation: {
      info: {
        title: "API",
        version: "0.1.0",
      }
    }
  }))
  .use(Books)
  .listen(Bun.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
