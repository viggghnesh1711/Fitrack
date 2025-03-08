import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-900 text-stone-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to FitTrack</h1>
      <p className="text-stone-400 text-lg mb-8 text-center">
        Your ultimate fitness tracking platform.
      </p>

      <Link
        href="/Sign-Up"
        className="bg-stone-700 hover:bg-stone-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
      >
        Get Started
      </Link>

      <p className="mt-6 text-stone-400">
        Already have an account?{" "}
        <Link href="/Sign-In" className="text-stone-300 hover:text-white font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}

