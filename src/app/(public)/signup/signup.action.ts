"use server";
import User from "@/database/models/User";
import { createSession } from "@/lib/auth.actions";
import bcrypt from "bcrypt";

// ::register & create user > then happend user authenticated
export default async function signup(_prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "all fields are required!" };
  }

  const isExist = await User.findOne({ where: { email } });
  if (isExist) return { error: "email already exist!" };

  const hashedPassword = await bcrypt.hash(password, 9);
  const user = await User.create({ name, email, password: hashedPassword });

  await createSession(user.dataValues.id, user.dataValues.role);
}
