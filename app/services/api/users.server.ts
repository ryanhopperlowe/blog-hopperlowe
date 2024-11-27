import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createUserSchema, Users, userSchema } from "~/db/schema/users";
import { ConflictError, NotFoundError } from "~/lib/errors";
import { DB } from "~/services/db.server";
import { createAction } from "./helpers.server";

const findUserByEmail = createAction()
  .input(z.object({ email: z.string().email() }))
  .output(userSchema)
  .action(async ({ input }) => {
    const result = await DB.select()
      .from(Users)
      .where(eq(Users.email, input.email));

    const user = result.at(0);

    if (!user) throw new NotFoundError("User not found");

    return user;
  })
  .getAction();

const createUser = createAction()
  .intent("createUser")
  .input(createUserSchema)
  .output(userSchema)
  .errors([ConflictError])
  .action(async ({ input }) => {
    const found = await DB.select()
      .from(Users)
      .where(eq(Users.email, input.email));

    if (found.at(0)) throw new ConflictError("User already exists");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(input.password, salt);

    const [newUser] = await DB.insert(Users)
      .values({ ...input, passwordHash })
      .returning();

    return newUser;
  })
  .getAction();

export const userService = {
  findUserByEmail,
  createUser,
};
