import { Button } from "@heroui/react";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="relative h-[70vh] w-full rounded-lg shadow-2xl overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6')] bg-cover bg-center scale-100"></div>

      {/* White Overlay (soft clean look) */}
      <div className="absolute inset-0 bg-white/10"></div>

      {/* Extra subtle gradient for depth */}
      <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/10 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 max-w-2xl leading-tight text-[#14c7ca]">
            Explore Modern Tiles for Every Space
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-xl text-[#0b0b0a] font-semibold">
            Find premium tile designs, view detailed previews, and discover
            styles that perfectly match your interior and architectural ideas.
          </p>

          <div className="flex gap-4">
            <Link href="/all-tiles">
              <Button className="bg-linear-to-r from-pink-400 via-purple-500 to-red-400 text-white px-6 py-3 rounded-lg shadow-lg hover:scale-105 transition">
                Browse Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
