import User from "@/database/models/User";
import { verifySession } from "@/lib/auth.actions";
import { SESSION } from "@/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie");
  const session = (await verifySession(cookie as string)) as SESSION;
  let user;
  session?.id && (user = await User.findOne({ where: { id: session?.id } }));

  return new Response(JSON.stringify({ user }));
}
