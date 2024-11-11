"use server";
import bcrypt from "bcrypt";

import User from "@/database/models/User";
import { createSession } from "@/lib/auth.actions";

// ::login
export default async function login(_prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "all field are required!" };

  const user = await User.findOne({ where: { email } });
  if (!user) return { error: "invalid email or password!" };

  const isMatch = await bcrypt.compare(
    password,
    user?.dataValues.password as string
  );

  if (!isMatch) return { error: "incorrect password!" };

  await createSession(user?.dataValues.id, user?.dataValues.role);
}
