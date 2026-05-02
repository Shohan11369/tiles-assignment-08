"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input, Button } from "@heroui/react";

const AllTilesPage = () => {
  const [tiles, setTiles] = useState([]);
  const [search, setSearch] = useState(""); // ✅ FIXED (was array)
  const [favorites, setFavorites] = useState([]);

  // LOAD DATA
  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTiles(Array.isArray(data) ? data : []))
      .catch(() => setTiles([]));
  }, []);

  // LOAD FAVORITES FROM LOCALSTORAGE
  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(fav);
  }, []);

  // SAFE FILTER
  const filteredTiles = (Array.isArray(tiles) ? tiles : []).filter((tile) =>
    (tile?.title || "").toLowerCase().includes(search.toLowerCase())
  );

  // FAVORITE HANDLER
  const handleFavorite = (tile) => {
    const exists = favorites.find((t) => t.id === tile.id);

    let updated;

    if (exists) {
      updated = favorites.filter((t) => t.id !== tile.id);
    } else {
      updated = [...favorites, tile];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

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
                <Button
                  onClick={() => handleFavorite(tile)}
                  className="w-full mt-2"
                  variant="bordered"
                >
                  {isFav
                    ? "Remove Favorite ❤️"
                    : "Add to Favorite 🤍"}
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
