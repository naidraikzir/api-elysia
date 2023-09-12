import { eq } from "drizzle-orm";
import { db } from "../../db";
import { books } from "../../schema";

export interface Book {
  id: string;
  name: string;
  author: string;
}

export const BooksController = {
  list: async () => await db.select().from(books),
  get: async (id: string) =>
    await db.select().from(books).where(eq(books.id, id)),
  add: async (book: Book) => {
    const id = crypto.randomUUID();
    return await db
      .insert(books)
      .values({ ...book, id })
      .returning();
  },
  update: async (id: string, book: Book) =>
    await db.update(books).set(book).where(eq(books.id, id)).returning(),
  delete: async (id: string) =>
    await db.delete(books).where(eq(books.id, id)).returning(),
};
