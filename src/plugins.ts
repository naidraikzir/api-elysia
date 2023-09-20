import { jwt as jwtPlugin } from "@elysiajs/jwt";
import { swagger as swaggerPlugin } from "@elysiajs/swagger";

const app = await Bun.file("package.json").json();

export const swagger = swaggerPlugin({
  documentation: {
    info: {
      title: "API",
      version: app.version,
    },
  },
});

export const jwt = jwtPlugin({
  name: "jwt",
  secret: Bun.env.SECRET!,
});
