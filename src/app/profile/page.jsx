"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const [favorites, setFavorites] = useState([]);

  // LOAD FAVORITES FROM LOCALSTORAGE
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  const handleUpdate = () => {
    router.push("/profile/update");
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-lg font-semibold">
        Please login to view your profile
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* PROFILE CARD */}
      <Card className="p-6 flex flex-col md:flex-row items-center gap-6">
        <Avatar size="lg">
          <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
          <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
        </Avatar>

        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm text-green-600 mt-1">Active User</p>
        </div>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="border p-6 rounded-lg text-center">
          <h3 className="text-2xl font-bold">{favorites.length}</h3>
          <p className="text-gray-500">Favorites</p>
        </div>
      </div>

      {/* FAVORITE TILES SECTION */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Favorite Tiles</h3>

        {favorites.length === 0 ? (
          <p className="text-gray-500">No favorite tiles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.map((tile) => (
              <div
                key={tile.id}
                className="border p-4 rounded-lg flex items-center gap-4"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  className="w-16 h-16 rounded object-cover"
                />

                <div>
                  <h4 className="font-semibold">{tile.title}</h4>
                  <p className="text-sm text-gray-500">{tile.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">Ceramic Blue Tile</div>

          <div className="border p-4 rounded-lg">Modern Geometric Tile</div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-10 flex flex-wrap gap-4">
        <Button onClick={handleLogout} variant="danger">
          Logout
        </Button>
      </div>

      <Button color="primary" onClick={() => router.push("/my-profile/update")}>
        Update Information
      </Button>
    </div>
  );
}
