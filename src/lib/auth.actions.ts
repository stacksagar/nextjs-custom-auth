"use server";

import { Roles, SESSION } from "@/types";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.SECRET_KEY as string;
const encodedKey = new TextEncoder().encode(secretKey);

// ::session maker with 'jose'
export async function encrypt(payload?: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(encodedKey);
}

// ::session verifier with 'jose'
export async function decrypt(session?: string) {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (_error) {
    return null;
  }
}

// ::create session & set into browser cookies
export async function createSession(
  id?: number,
  role?: Roles,
  avoidRedirect?: boolean
) {
  const cookieStore = await cookies();
  const session = await encrypt({ id, role });

  cookieStore.set("session", session, {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });

  if (!avoidRedirect) {
    if (role === "user") redirect("/");
    else redirect("/dashboard");
  }
}

// ::verify session, needed when reload the page
export async function verifySession(session?: string) {
  const data = await decrypt(session);
  if (!data?.id) return null;
  return data;
}

// ::get session from cookies
export async function getSession() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = (await verifySession(cookie)) as SESSION;
  return session;
}

// ::delete the session from cookies when logout
export async function deleteSession() {
  (await cookies()).delete("session");
}

// logout
export async function logout() {
  await deleteSession();
  redirect("/login");
}
