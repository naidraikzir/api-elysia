import { Elysia, t } from "elysia";
import { add, del, get, list, update } from "./controller";
import { Book } from "./schema";

const schema = {
  body: t.Object({
    name: t.String(),
    author: t.String(),
  }),
};

export default new Elysia().group("/books", (app) =>
  app
    .get("/", list)
    .get("/:id", ({ params }) => get(params.id))
    .post("/", ({ body }) => add(body as Book), schema)
    .put("/:id", ({ params, body }) => update(params.id, body as Book), schema)
    .delete("/:id", ({ params }) => del(params.id))
);
