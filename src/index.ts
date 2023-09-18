import { Elysia } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { routes } from "./routes";

if (!Bun.env.SECRET) {
  console.error("Missing SECRET!");
  process.exit();
}

export const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.SECRET,
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "API",
          version: "0.1.0",
        },
      },
    })
  );

routes(app);
app.listen(Bun.env.PORT || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
