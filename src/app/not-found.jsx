"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">

      {/* ERROR CODE */}
      <h1 className="text-7xl font-extrabold text-blue-600">404</h1>

      {/* TITLE */}
      <h2 className="text-2xl md:text-3xl font-bold mt-4">
        Oops! Page Not Found
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-600 mt-2 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
        Let’s get you back to exploring beautiful tiles.
      </p>

      {/* BUTTON */}
      <Link href="/">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go Back Home
        </button>
      </Link>

    </div>
  );
}
