"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export function SignOutBtn() {
  const router = useRouter();
  const handleLogout = async () => {
    authClient.signOut();
    await authClient.signOut();
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    router.refresh();
  };
  return (
    <button onClick={handleLogout} className="text-error">
      Logout
    </button>
  );
}
