import Marquee from "react-fast-marquee";

const MarqueeSection = ({ tiles }) => {
  return (
    <div className="bg-primary py-3 text-black font-medium shadow-inner">
      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        <span className="mx-8 uppercase">
          🔥 New Arrivals: {tiles[0]?.title || "Premium Ceramic"} | 
        </span>
        <span className="mx-8 uppercase">
          ✨ Weekly Feature: Modern Geometric Patterns | 
        </span>
        <span className="mx-8 uppercase">
          🚀 Join the Community for exclusive designs! | 
        </span>
        <span className="mx-8 uppercase">
          💎 Premium Quality Tiles available now...
        </span>
      </Marquee>
    </div>
  );
};

export default MarqueeSection;