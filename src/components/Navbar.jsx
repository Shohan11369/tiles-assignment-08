"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  const linkClass = (path) =>
    `px-3 py-1 rounded-md transition ${
      pathname === path
        ? "bg-blue-500 text-white"
        : "hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="border-b px-2">
      <nav className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 py-3 max-w-7xl mx-auto w-full">

        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image
            src={"/logo.jpg"}
            alt="logo"
            width={30}
            height={30}
            className="object-cover h-auto w-auto"
          />
          <h3 className="font-black text-lg">Tiles</h3>
        </div>

        {/* Links */}
        <ul className="flex flex-wrap justify-center items-center gap-3 md:gap-5 text-sm md:text-lg font-semibold">
          <li>
            <Link href="/" className={linkClass("/")}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/all-tiles" className={linkClass("/all-tiles")}>
              All Tiles
            </Link>
          </li>

          <li>
            <Link href="/profile" className={linkClass("/profile")}>
              My Profile
            </Link>
          </li>
        </ul>

        {/* Auth */}
        <div className="flex items-center gap-3">

          {!user ? (
            <div className="flex gap-3">
              <Link href="/signup" className={linkClass("/signup")}>
                SignUp
              </Link>

              <Link href="/signin" className={linkClass("/signin")}>
                SignIn
              </Link>
            </div>
          ) : (
            <>
              <Avatar size="sm">
                <Avatar.Image
                  src={user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>
                  {user?.name?.charAt(0)}
                </Avatar.Fallback>
              </Avatar>

              <Button onClick={handleSignOut} size="sm" variant="danger">
                SignOut
              </Button>
            </>
          )}

        </div>
      </nav>
    </div>
  );
};

export default Navbar;
