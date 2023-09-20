import { Elysia, t } from "elysia";
import { jwt } from "$/plugins";
import { register, login } from "./controller";
import { User } from "./schema";

export default new Elysia().use(jwt).group(
  "/auth",
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  },
  (app) =>
    app
      .post("/register", ({ body }) => register(body as User))
      .post("/login", ({ body, jwt }) => login(body as User, jwt))
);
