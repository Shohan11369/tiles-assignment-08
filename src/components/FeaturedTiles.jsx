import Link from "next/link";

const FeaturedTiles = ({ tiles }) => {
  
  const featured = tiles.slice(0, 4);

  return (
    <section className="container mx-auto py-20 px-4 md:px-16">
      <div className="flex flex-col items-center mb-12 text-center">
        <h2 className="text-4xl font-bold text-black mb-2">Featured Collections</h2>
        <p className="text-gray-500 mb-4">Handpicked premium designs for your space</p>
        <div className="w-24 h-1 bg-primary rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((tile) => (
          <div key={tile.id} className="card bg-white shadow-xl hover:shadow-2xl transition-all border border-gray-100 group">
            <figure className="h-56 relative overflow-hidden">
              {/* <img 
                src={tile.image} 
                alt={tile.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              /> */}
            </figure>
            <div className="card-body p-6">
              <h3 className="card-title text-black text-lg">{tile.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-1">{tile.description}</p>
              <div className="card-actions justify-between items-center mt-4">
                <span className="text-xl font-bold text-primary">${tile.price}</span>
                <Link href={`/tile/${tile.id}`} className="btn btn-primary btn-sm normal-case">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedTiles;