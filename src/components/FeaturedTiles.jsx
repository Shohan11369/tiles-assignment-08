"use client";

import Link from "next/link";
import Image from "next/image";

function FeaturedTiles({ tiles }) {
  const topTiles = tiles?.slice(0, 4);

  if (!topTiles || topTiles.length === 0) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        No Tiles Found
      </div>
    );
  }

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Featured Tiles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topTiles.map((tile) => (
            <div
              key={tile.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">
                  {tile.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  {tile.description}
                </p>

                <p className="text-lg font-semibold text-blue-600 mb-4">
                  ${tile.price}
                </p>

                <Link href={`/tile/${tile.id}`}>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedTiles;
