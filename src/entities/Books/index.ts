import { Elysia } from "elysia";
import { BooksController, Book } from "./controller";

export default new Elysia().group("/books", (app) =>
  app
    .get("/", () => BooksController.list())
    .get("/:id", ({ params }) => BooksController.get(params.id))
    .post("/", ({ body }) => BooksController.add(body as Book))
    .put("/:id", ({ params, body }) =>
      BooksController.update(params.id, body as Book)
    )
    .delete("/:id", ({ params }) => BooksController.delete(params.id))
);
