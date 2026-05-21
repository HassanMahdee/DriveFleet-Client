"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault();
    const result = await authClient.signIn.email({ email, password });
    if (result.error) return toast.error(result.error.message);
    router.push("/");
    router.refresh();
  }

  async function handleGoogle() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card bg-base-200 shadow-xl w-full max-w-md p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full rounded-full">
            Login
          </button>
        </form>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full rounded-full gap-2"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>
        <p className="text-center text-sm mt-4 text-base-content/60">
          No account?{" "}
          <Link href="/register" className="text-primary font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
