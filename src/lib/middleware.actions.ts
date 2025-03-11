import axiosReq from "./axiosReq";
import { NextResponse } from "next/server";
import { isRoleFulfilled } from "./roles";

const redirect = NextResponse.redirect;
const host = process.env.DOMAIN;

export const redirectDashboard = () => redirect(host + "/dashboard");
export const redirectLogin = () => redirect(host + "/login");
export const redirectHome = () => redirect(host + "/");

export async function getUpdatedUser(cookie?: string) {
  try {
    const {
      data: { user },
    } = await axiosReq.get<{ user: USER }>(
      process.env.DOMAIN + "/api/public/auth-user",
      {
        headers: {
          cookie,
        },
      }
    );
    return user;
  } catch (error: any) {
    console.log("GET USER ERROR:: ", error);
  }
}

export function isAdmin(user?: USER) {
  if (isRoleFulfilled(user?.role, "admin")) {
    NextResponse.next();
  } else if (isRoleFulfilled(user?.role, "secretary")) {
    return redirectDashboard();
  } else {
    return redirectHome();
  }
}

export function isManager(user?: USER) {
  if (isRoleFulfilled(user?.role, "manager")) {
    NextResponse.next();
  } else if (isRoleFulfilled(user?.role, "secretary")) {
    return redirectDashboard();
  } else {
    return redirectHome();
  }
}
export function isSecretary(user?: USER) {
  if (isRoleFulfilled(user?.role, "secretary")) {
    NextResponse.next();
  } else {
    return redirectHome();
  }
}
export function isRegiesteredUser(user?: USER) {
  if (isRoleFulfilled(user?.role, "user")) {
    NextResponse.next();
  } else {
    return redirectLogin();
  }
}
