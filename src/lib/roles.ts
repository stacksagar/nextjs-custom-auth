import { roles } from "@/middleware";
import { Roles } from "@/types";

export function isRoleFulfilled(role?: Roles, requiredRole?: Roles) {
  if (!role || !requiredRole) return false;
  const rolePower = roles[role].level;
  const neededPower = roles[requiredRole].level;
  return rolePower >= neededPower ? true : false;
}
