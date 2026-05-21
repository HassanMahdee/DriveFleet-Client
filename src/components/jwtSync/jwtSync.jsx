"use client";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

export function JWTSync() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session && !document.cookie.includes("drivefleet_token")) {
      fetch("/api/auth/jwt", { method: "POST", credentials: "include" });
    }
  }, [session]);
  return null;
}
