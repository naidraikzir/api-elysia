import { Elysia, t } from "elysia";
import { BooksController, Book } from "./controller";

const schema = {
  body: t.Object({
    name: t.String(),
    author: t.String(),
  }),
};

export default new Elysia().group("/books", (app) =>
  app
    .get("/", () => BooksController.list())
    .get("/:id", ({ params }) => BooksController.get(params.id))
    .post("/", ({ body }) => BooksController.add(body as Book), schema)
    .put(
      "/:id",
      ({ params, body }) => BooksController.update(params.id, body as Book),
      schema
    )
    .delete("/:id", ({ params }) => BooksController.delete(params.id))
);
