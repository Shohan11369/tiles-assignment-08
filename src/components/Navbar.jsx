"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  // demo state (later auth লাগবে)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="border-b px-2">
      <nav className="flex justify-between items-center py-3 max-w-7xl mx-auto w-full">

        {/* LEFT - LOGO */}
        <div className="flex gap-2 items-center">
          <Link href="/">
            <Image
              src={"/logo.jpg"}
              alt="logo"
              loading="eager"
              width={30}
              height={30}
              className="object-cover h-auto w-auto cursor-pointer"
            />
          </Link>

          <h3 className="font-black text-lg">pixgen.</h3>
        </div>

        {/* CENTER - NAV LINKS */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/all-tiles">All Tiles</Link>
          </li>
          <li>
            <Link href="/profile">My Profile</Link>
          </li>
        </ul>

        {/* RIGHT - AUTH */}
        <div className="flex items-center gap-3 text-sm">

          {!isLoggedIn ? (
            <Link href="/signin">
              <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Login
              </button>
            </Link>
          ) : (
            <>
              <Link href="/profile">
                <button className="px-3 py-1 border rounded-md">
                  Profile
                </button>
              </Link>

              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
