"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export function SignOutBtn() {
  const router = useRouter();
  const handleLogout = () => {
    authClient.signOut();
    router.refresh();
  };
  return (
    <button onClick={handleLogout} className="text-error">
      Logout
    </button>
  );
}
