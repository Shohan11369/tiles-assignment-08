import Image from "next/image";
import path from "path";
import { promises as fs } from "fs";
import { Button } from '@heroui/react';
import Link from "next/link";

const TileDetailPage = async ({ params }) => {
  const { id } = await params;
  const filePath = path.join(process.cwd(), "public/data.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(jsonData);

  const tile = data.find((item) => item.id.toString() === id);

  if (!tile) {
    return (
      <div className="p-10 text-center text-red-500 text-xl">
        Tile not found
      </div>
    );
  }

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-4">{tile.title}</h1>

      <Image
        src={tile.image}
        alt={tile.title}
        width={500}
        height={400}
        className="rounded-lg object-cover"
      />

      <p className="mt-4 text-gray-700">{tile.description}</p>

      <div className="flex justify-between">
        <p className="mt-2 text-blue-600 text-xl font-semibold">
          ${tile.price}
        </p>

        <p className="mt-2 text-xl font-semibold">Category: <span className="text-orange-600">{tile.category}</span></p>
      </div>
      <div className="flex  gap-10">
        <p>Dimensions: <span className="text-bold text-xl">{tile.dimensions}</span></p>

        <p>Material: <span className="text-bold text-xl">{tile.material}</span></p>

       
      </div>

       {/*BACK HOME BUTTON */}
      <div className="pt-6">
        <Link href="/">
          <Button color="primary">
            Back Home
          </Button>
        </Link>
      </div>

      
    </div>
  );
};

export default TileDetailPage;
