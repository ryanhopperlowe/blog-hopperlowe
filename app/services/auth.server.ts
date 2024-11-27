import { Authenticator } from "remix-auth";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { User, Users } from "~/db/schema/users";
import { sessionStorage } from "./session.server";
import { FormStrategy } from "remix-auth-form";
import bcrypt from "bcryptjs";
import { DB } from "./db.server";
import { eq } from "drizzle-orm";
import { NotFoundError } from "~/lib/errors";

const schema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string().min(4)),
});

export const AuthService = new Authenticator<User>(sessionStorage);

AuthService.use(
  new FormStrategy(async ({ form }) => {
    const { email, password } = schema.parse(form);

    const [user] = await DB.select().from(Users).where(eq(Users.email, email));

    if (!user) {
      throw new NotFoundError("Invalid email or password");
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordsMatch) {
      throw new Error("Invalid email or password");
    }

    return user;
  }),
  "user-pass"
);
