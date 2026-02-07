import React from "react";
import { Link } from "react-router-dom";

function Productcard({ product }) {
  return (
    <div className="min-w-[140px] md:min-w-[240px] flex-shrink-0">
      <div className=" mx-2 flex flex-col items-center group">
        
        {/* Image wrapper */}
        <div className="bg-gradient-to-b from-[#79866E] to-[#b2b0ad] 
                        p-3 md:p-6 shadow-sm mb-4 w-full flex justify-center 
                        overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-38 md:h-64 object-contain transition-transform duration-300 ease-out 
                         group-hover:scale-120"
            />
          </Link>
        </div>

        {/* Content */}
        <div className="text-center px-4 font-lora">
          <h2 className="text-[12px] md:text-lg font-semibold tracking-normal md:tracking-wider text-gray-700 mb-2">
            {product.name}
          </h2>

          <div className="flex items-center justify-center gap-4">
            <span className="text-gray-500 line-through text-[10px] md:text-sm">
              ₹{product.variants?.[0]?.mrp}
            </span>
            <span className="text-[12px] md:text-xl font-semibold text-red-900">
              ₹{product.variants?.[0]?.price}
            </span>
          </div>

          <div className="flex items-center text-[10px] md:text-xl justify-center gap-1 text-yellow-400 mt-1">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productcard;
