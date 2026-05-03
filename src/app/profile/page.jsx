"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  const handleUpdate = () => {
    if (user?.id) {
      router.push(`/update/${user.id}`);
    }
  };

  if (isPending) return <div className="text-center mt-20">Loading...</div>;

  if (!user) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 pb-20">
      {/* PROFILE CARD */}
      <Card className="p-6 flex flex-col md:flex-row items-center gap-6 shadow-md border border-gray-100">
        
        <div className="relative w-24 h-24 overflow-hidden rounded-full border-2 border-blue-100">
          <Image
            key={user?.image}
            src={user?.image || "https://avatar.iran.liara.run/public"}
            alt="Profile"
            fill 
            className="object-cover"
            unoptimized 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mt-2">
            Active User
          </span>
        </div>
        <div className="flex gap-3">
          <Button
            color="primary"
            onClick={handleUpdate}
            className="font-semibold"
          >
            Update Profile
          </Button>
          <Button onClick={handleLogout} variant="flat" color="danger">
            Logout
          </Button>
        </div>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm text-center">
          <h3 className="text-2xl font-bold text-blue-600">
            {favorites.length}
          </h3>
          <p className="text-gray-500 font-medium">Favorites</p>
        </div>
      </div>

      {/* FAVORITE TILES SECTION */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-6 text-gray-800">Favorite Tiles</h3>
        {favorites.length === 0 ? (
          <p className="text-gray-500 italic">No favorite tiles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((tile) => (
              <Card
                key={tile.id}
                className="p-4 flex flex-row items-center gap-4 border border-gray-50 shadow-sm"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover w-14 h-14"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{tile.title}</h4>
                  <p className="text-xs text-gray-400">{tile.category}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
