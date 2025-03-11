import { getSessionUser } from "@/lib/auth.server";
import React from "react";

export default async function Profile() {
  const user = await getSessionUser();
  return (
    <div>
      <div className="bg-black text-white p-12">
        <p>Hello {user?.name},</p>
      </div>
    </div>
  );
}
