"use server";

import User from "@/database/models/User";
import { getSession } from "./auth.actions";

export async function getSessionUser(): Promise<USER | undefined> {
  const session = await getSession();
  if (!session || !session?.id) return undefined;

  const user = await User.findOne({ where: { id: session?.id } });
  return user?.dataValues;
}

export async function updateUser(id?: number, data?: object) {
  if (!id || !data) return;
  try {
    await User.update(data, { where: { id } });
    const user = await User.findOne({ where: { id } });
    return user?.dataValues;
  } catch (error) {
    console.log("error:: ", error);
  }
}
