import { Elysia } from "elysia";
import Books from "./modules/Books";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(Books)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
