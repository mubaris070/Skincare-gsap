import { Link } from "react-router-dom";

function FeaturedCard({ product }) {
  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out will-change-transform">
        {/* Smaller Image */}
        <div className="w-full h-24 md:h-28 lg:h-[250px] overflow-hidden rounded-t-lg bg-gradient-to-b from-[#79866E] to-[#b2b0ad]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain "
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-2 md:p-3 font-lora text-xs md:text-sm">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-700 mb-1">₹{product.variants[0].price}</p>

          <Link to={`/product/${product.id}`}>
            <button
              className="w-full bg-gradient-to-r from-gray-300 to-gray-400
                         text-white py-1 rounded-md
                         hover:from-gray-400 hover:to-gray-300
                         hover:shadow-sm transition duration-300 cursor-pointer text-xs md:text-sm"
            >
              View Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FeaturedCard;
