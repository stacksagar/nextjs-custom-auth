"use client";

import { logout } from "@/lib/auth.actions";
import { useState } from "react";

export default function useLogout() {
  const [loading, setLoading] = useState(false);

  async function makeLogout() {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  }

  return { logout: makeLogout, loading };
}
