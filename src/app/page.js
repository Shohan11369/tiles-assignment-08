import Banner from "@/components/Banner";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturedTiles from "@/components/FeaturedTiles";

export default async function Home() {
  //(JSON Server port 5000)
  let tiles = [];
  try {
    const res = await fetch("http://localhost:3000/tiles", {
      cache: "no-store",
    });
    if (res.ok) {
      tiles = await res.json();
    }
  } catch (error) {
    console.error("Data fetch error", error);
  }

  return (
    <div>
      <MarqueeSection tiles={tiles} />

      <Banner />

      <FeaturedTiles tiles={tiles} />
    </div>
  );
}
