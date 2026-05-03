"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import {
  Avatar,
  Button,
  Card,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // Modal এর জন্য

  const userData = authClient.useSession();
  const user = userData.data?.user;

  const [favorites, setFavorites] = useState([]);

  // আপডেট করার জন্য স্টেট
  const [updateData, setUpdateData] = useState({
    name: "",
    image: "",
  });

  // ডাটা লোড করা
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);

    if (user) {
      setUpdateData({
        name: user.name || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/signin");
  };

  const handleUpdateSubmit = async () => {
    // এখানে আপনার API বা authClient এর আপডেট লজিক বসবে
    console.log("Updated Info:", updateData);
    alert("Profile info updated successfully! (Demo)");
    onOpenChange(false); // Modal বন্ধ করার জন্য
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
      <Card className="p-6 flex flex-col md:flex-row items-center gap-6 shadow-md">
        <Avatar className="w-24 h-24 text-large">
          <Avatar.Image src={user?.image} referrerPolicy="no-referrer" />
          <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
        </Avatar>

        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm text-green-600 mt-1 font-medium">Active User</p>
        </div>

        <div className="flex gap-3">
          <Button color="primary" variant="flat" onPress={onOpen}>
            Edit Profile
          </Button>
          <Button onClick={handleLogout} variant="flat" color="danger">
            Logout
          </Button>
        </div>
      </Card>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white border border-gray-200 p-6 rounded-xl text-center shadow-sm">
          <h3 className="text-2xl font-bold text-blue-600">
            {favorites.length}
          </h3>
          <p className="text-gray-500 font-medium">Favorites</p>
        </div>
      </div>

      {/* FAVORITE TILES */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 border-b pb-2">
          Favorite Tiles
        </h3>
        {favorites.length === 0 ? (
          <p className="text-gray-400 italic">No favorite tiles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((tile) => (
              <Card
                key={tile.id}
                className="p-4 flex flex-row items-center gap-4 hover:bg-gray-50 transition"
              >
                <Image
                  src={tile.image}
                  alt={tile.title}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-700">{tile.title}</h4>
                  <p className="text-xs text-gray-400 uppercase tracking-wider">
                    {tile.category}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* UPDATE MODAL (স্ক্রিনশটের মতো রিকোয়ারমেন্ট) */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Information
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    label="Name"
                    variant="bordered"
                    placeholder="Enter your name"
                    value={updateData.name}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, name: e.target.value })
                    }
                  />
                  <Input
                    label="Image URL"
                    variant="bordered"
                    placeholder="Enter image URL"
                    value={updateData.image}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, image: e.target.value })
                    }
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">User ID: {user.id}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleUpdateSubmit}>
                  Save Changes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* ACTION BUTTONS (Optional if you want them at bottom too) */}
      <div className="mt-10 pb-10">
        <Button
          color="primary"
          className="w-full md:w-auto"
          onClick={() => router.push(`/update/${user.id}`)}
        >
          Go to Full Update Page
        </Button>
      </div>
    </div>
  );
}
