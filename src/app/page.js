import Banner from "@/components/Banner";
import MarqueeSection from "@/components/MarqueeSection";
import FeaturedTiles from "@/components/FeaturedTiles";

export default async function Home() {
  //(JSON Server port 5000)
  let tiles = [];
  try {
    const res = await fetch("http://localhost:5000/tiles", { cache: "no-store" });
    if (res.ok) {
      tiles = await res.json();
    }
  } catch (error) {
    console.error("Data fetch error", error);
  }

  return (
    <div>
      
      <Banner />

      
      <MarqueeSection tiles={tiles} />

      
      <FeaturedTiles tiles={tiles} />
    </div>
  );
}