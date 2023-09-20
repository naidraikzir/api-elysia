import { eq } from "drizzle-orm";
import { NotFoundError } from "elysia";
import { db } from "$/db";
import { User, users } from "./schema";

export const register = async (user: User) => {
  user.id = crypto.randomUUID();
  user.password = await Bun.password.hash(user.password!);
  const inserted = (await db.insert(users).values(user).returning())[0];
  return inserted;
};

export const login = async (user: User, jwt: any) => {
  const found = (
    await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.username, user.username!))
      .where(eq(users.password, user.password!))
      .limit(1)
  )[0];
  if (!found) {
    throw new NotFoundError();
  }
  const token = jwt.sign({ id: found.id });
  return { token };
};
