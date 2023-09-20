import { desc, eq } from "drizzle-orm";
import { NotFoundError } from "elysia";
import { db } from "$/db";
import { Book, books } from "./schema";

export const list = () =>
  db.select().from(books).orderBy(desc(books.timestamp));

export const get = async (id: string) => {
  const book = (await db.select().from(books).where(eq(books.id, id)))[0];
  if (!book) {
    throw new NotFoundError();
  }
  return book;
};

export const add = async (book: Book) => {
  const id = crypto.randomUUID();
  const inserted = (
    await db
      .insert(books)
      .values({ ...book, id })
      .returning()
  )[0];
  return inserted;
};

export const update = async (id: string, book: Book) => {
  const updated = (
    await db.update(books).set(book).where(eq(books.id, id)).returning()
  )[0];
  if (!updated) {
    throw new NotFoundError();
  }
  return updated;
};

export const del = async (id: string) => {
  const deleted = (
    await db.delete(books).where(eq(books.id, id)).returning()
  )[0];
  if (!deleted) {
    throw new NotFoundError();
  }
  return deleted;
};
