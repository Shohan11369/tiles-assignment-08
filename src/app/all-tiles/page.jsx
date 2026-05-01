"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@heroui/react";

const AllTilesPage = () => {
  const [tiles, setTiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTiles(data));
  }, []);

  // search filter
  const filteredTiles = tiles.filter((tile) =>
    tile.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* SEARCH BAR */}
      <div>
        <Input
          placeholder="Search tiles by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      {/*GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {filteredTiles.map((tile) => (
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

              {/* DETAILS BUTTON */}
              <Link href={`/tile/${tile.id}`}>
                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AllTilesPage;
