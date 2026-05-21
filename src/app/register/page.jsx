"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import Link from "next/link";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const router = useRouter();

  function validatePassword(pw) {
    if (pw.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter";
    if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter";
    return null;
  }
  async function handleRegister(e) {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) return toast.error(error);
    const { data, error: authError } = await authClient.signUp.email({
      email,
      password,
      name,
      image: profilePhotoUrl,
      autoSignIn: false,
    });
    if (authError) return toast.error(authError.message);
    console.log(data);
    router.push("/login");
  }

  async function handleGoogle() {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card bg-base-200 shadow-xl w-full max-w-md p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome!</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-ghost btn-md absolute right-1 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <input
            type="text"
            placeholder="Profile Photo URL"
            className="input input-bordered w-full"
            value={profilePhotoUrl}
            onChange={(e) => setProfilePhotoUrl(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-full rounded-full">
            Register
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
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
