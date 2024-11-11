import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

/* NOTE: The "level" represents access power. Higher levels can access routes available to lower levels.
For example, level 3 has access to routes for levels 2 and 1, and level 4 can access routes for levels 3, 2, and 1 */
export const roles = {
  user: { level: 1, routes: ["/profile"] },
  secretary: { level: 2, routes: ["/dashboard", "/secretary"] },
  manager: { level: 3, routes: ["/manager"] },
  admin: { level: 4, routes: ["/admin"] },
};

const registrationRoutes = ["/login", "/signup"];
const protectedRoutes = Object.values(roles).reduce((acc, role) => {
  acc.push(...role.routes);
  return acc;
}, [] as string[]);

import {
  getUpdatedUser,
  isAdmin,
  isManager,
  isRegiesteredUser,
  isSecretary,
  redirectDashboard,
  redirectLogin,
} from "./lib/middleware.actions";
import { createSession } from "./lib/auth.actions";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  const user = await getUpdatedUser(cookie);
  await createSession(user?.id, user?.role, true);

  // create conditions according to
  const isAuthenticatedRoutes = protectedRoutes.some((r) => path.includes(r));
  const isRegistrationRoutes = registrationRoutes.some((r) => path.includes(r));

  const needAdmin = roles["admin"].routes.some((r) => path.includes(r));
  const needManager = roles["manager"].routes.some((r) => path.includes(r));
  const needSecretary = roles["secretary"].routes.some((r) => path.includes(r));
  const needUser = roles["user"].routes.some((r) => path.includes(r));

  if (isRegistrationRoutes && user?.id) return redirectDashboard(); //::visitor can't visit login/signup page after loggedin
  if (!user && isAuthenticatedRoutes) return redirectLogin(); //::visitor can't visit authenticated routes before loggedin

  if (needAdmin) return isAdmin(user); //::if it is 'admin' then will return something from here!!!
  if (needManager) return isManager(user); //::if it is 'manager' then will return something from here!!!
  if (needSecretary) return isSecretary(user); //::if it is 'secretary' then will return something from here!!!
  if (needUser) return isRegiesteredUser(user); //::if it is 'registered user' then will return something from here!!!

  // if above any conditions doesn't matche
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/dashboard/:path*", "/login", "/signup"],
};
/*
:: DO YOU HAVE ANY CONFUSION WITH "config & matcher"?
** Why use Config & Matcher? Let's break it down with an example:

- For example, when visiting "localhost:3000/profile", we want the middleware to run first, 
  so we add it to the `matcher` array. However, for "localhost:3000/news", no middleware is needed 
  because it's a public page. But if you want to restrict access to "/news" (e.g., for moderators only),
  you can add it to the `matcher` array for role-based middleware processing.
*/
