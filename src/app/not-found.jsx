import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4">
      <h1 className="text-8xl font-bold text-primary">404</h1>
      <p className="text-xl font-semibold text-base-content">
        Oops! This road doesn&apos;t exist.
      </p>
      <p className="text-base-content/60">
        The page you&apos;re looking for has taken a wrong turn.
      </p>
      <Link href="/" className="btn btn-primary rounded-full px-8">
        Back to Home
      </Link>
    </div>
  );
}
