import { desc, eq } from "drizzle-orm";
import { NotFoundError } from "elysia";
import { db } from "$/db";
import { books } from "./schema";

export interface Book {
  id: string;
  name: string;
  author: string;
}

export const BooksController = {
  list: () => db.select().from(books).orderBy(desc(books.timestamp)),

  get: async (id: string) => {
    const book = (await db.select().from(books).where(eq(books.id, id)))[0];
    if (!book) {
      throw new NotFoundError();
    }
    return book;
  },

  add: async (book: Book) => {
    const id = crypto.randomUUID();
    const inserted = (
      await db
        .insert(books)
        .values({ ...book, id })
        .returning()
    )[0];
    return inserted;
  },

  update: async (id: string, book: Book) => {
    const updated = (
      await db.update(books).set(book).where(eq(books.id, id)).returning()
    )[0];
    if (!updated) {
      throw new NotFoundError();
    }
    return updated;
  },

  delete: async (id: string) => {
    const deleted = (
      await db.delete(books).where(eq(books.id, id)).returning()
    )[0];
    if (!deleted) {
      throw new NotFoundError();
    }
    return deleted;
  },
};
