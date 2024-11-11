import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isRoleFulfilled } from "./lib/roles";

const registrationRoutes = ["/login", "/signup"];
const levelOne = ["/profile"]; // > level 1 (general user)
const levelTwo = ["/dashboard", "/secretary"]; // > level 2 (secretary)
const levelThree = ["/manager"]; // > level 3 (manager)
const levelFour = ["/admin"]; // > level 4 (admin) [Note:: With this logic, we can use unlimited user roles and manage]
const protectedRoutes = [...levelOne, ...levelTwo, ...levelThree, ...levelFour];

import {
  getUpdatedUser,
  redirectDashboard,
  redirectHome,
  redirectLogin,
} from "./lib/middleware.actions";
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;

  const user = await getUpdatedUser(cookie);

  const isAuthenticatedRoutes = protectedRoutes.some((r) => path.includes(r));
  const isRegistrationRoutes = registrationRoutes.some((r) => path.includes(r));
  const needMinLevelOne = levelOne.some((r) => path.includes(r));
  const needMinLevelTwo = levelTwo.some((r) => path.includes(r));
  const needMinLevelThree = levelThree.some((r) => path.includes(r));
  const needMinLevelFour = levelFour.some((r) => path.includes(r));

  if (isRegistrationRoutes && user?.id) return redirectDashboard(); // visitor can't visit login/signup page after loggedin
  if (!user && isAuthenticatedRoutes) return redirectLogin(); // visitor can't visit authenticated routes before loggedin

  // if levelFour array route called, then only execute this condition and return something
  if (needMinLevelFour) {
    if (isRoleFulfilled(user?.role, "admin")) {
      NextResponse.next();
    } else if (isRoleFulfilled(user?.role, "secretary")) {
      return redirectDashboard();
    } else {
      return redirectHome();
    }
  }

  // if levelThree array route called, then only execute this condition and return something
  if (needMinLevelThree) {
    if (isRoleFulfilled(user?.role, "manager")) {
      NextResponse.next();
    } else if (isRoleFulfilled(user?.role, "secretary")) {
      return redirectDashboard();
    } else {
      return redirectHome();
    }
  }

  // if levelTwo array route called, then only execute this condition and return something
  if (needMinLevelTwo) {
    if (isRoleFulfilled(user?.role, "secretary")) {
      NextResponse.next();
    } else {
      return redirectHome();
    }
  }

  // if levelOne array route called, then only execute this condition and return something
  if (needMinLevelOne) {
    if (isRoleFulfilled(user?.role, "user")) {
      NextResponse.next();
    } else {
      return redirectLogin();
    }
  }

  // if the app path or url is not in 'coifig-matcher-array' then simply it avoid the middleware
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
