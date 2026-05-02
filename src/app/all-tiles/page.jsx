"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input, Button, Spinner } from "@heroui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const AllTilesPage = () => {
  const [tiles, setTiles] = useState([]);
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // LOAD DATA
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setTiles(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setTiles([]);
        setLoading(false);
      });
  }, []);

  // LOAD FAVORITES
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fav = localStorage.getItem("favorites");

      if (fav) {
        try {
          setFavorites(JSON.parse(fav));
        } catch {
          setFavorites([]);
        }
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const filteredTiles = Array.isArray(tiles)
    ? tiles.filter((tile) =>
        (tile?.title || "").toLowerCase().includes(search.toLowerCase()),
      )
    : [];

  const handleFavorite = (tile) => {
    setFavorites((prev) => {
      const exists = prev.find((t) => t.id === tile.id);

      if (exists) {
        return prev.filter((t) => t.id !== tile.id);
      } else {
        return [...prev, tile];
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* SEARCH BAR */}
      <Input
        placeholder="Search tiles by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full"
      />

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTiles.map((tile) => {
          const isFav = favorites.some((t) => t.id === tile.id);

          return (
            <div
              key={tile.id}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                <h2 className="font-bold">{tile.title}</h2>

                {/* DETAILS */}
                <Link href={`/tile/${tile.id}`}>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Details
                  </button>
                </Link>

                {/* FAVORITE */}
                <Button className="w-full" onClick={() => handleFavorite(tile)}>
                  {isFav ? (
                    <>
                      Remove Favorite
                      <FaHeart className="ml-2" />
                    </>
                  ) : (
                    <>
                      Add to Favorite
                      <FaRegHeart className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTilesPage;
