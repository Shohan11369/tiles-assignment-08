"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div className="border-b px-2">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 py-3 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image
            src={"/logo.jpg"}
            alt="logo"
            loading="eager"
            width={30}
            height={30}
            className="object-cover h-auto w-auto"
          />
          <h3 className="font-black text-lg">Tiles</h3>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-sm md:text-lg font-semibold">
          <li>
            <Link
              href="/"
              className={`px-3 py-1 rounded-md transition ${
                pathname === "/"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/all-tiles"
              className={`px-3 py-1 rounded-md transition ${
                pathname === "/all-tiles"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              All Tiles
            </Link>
          </li>

          <li>
            <Link
              href="/profile"
              className={`px-3 py-1 rounded-md transition ${
                pathname === "/profile"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              My Profile
            </Link>
          </li>
        </ul>

        {/* Auth section */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-sm md:text-lg font-semibold">
          {!user ? (
            <ul className="flex items-center gap-4 text-sm">
              <li>
                <Link
                  href="/signup"
                  className={`px-3 py-1 rounded-md transition ${
                    pathname === "/signup"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  SignUp
                </Link>
              </li>

              <li>
                <Link
                  href="/signin"
                  className={`px-3 py-1 rounded-md transition ${
                    pathname === "/signin"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-800"
                  }`}
                >
                  SignIn
                </Link>
              </li>
            </ul>
          ) : (
            <div className="flex items-center gap-3">
              <Avatar size="sm">
                <Avatar.Image
                  alt="user"
                  src={user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <Button onClick={handleSignOut} size="sm" variant="danger">
                SignOut
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
