import { Elysia } from "elysia";
import { routes } from "./routes";

if (!Bun.env.SECRET) {
  console.error("Missing SECRET!");
  process.exit();
}

const app = new Elysia().use(routes).listen(Bun.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
