import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Cont } from "../Context/Context";
import Addtocart from "../Carting/Addtocart";
import Buynow from "../Carting/Buynow";
import axios from "axios";

function ProductDetailView({ detail }) {
  const [mainImg, setMainImg] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);

  const { cart, setCart, setBuyNowItem } = useContext(Cont);
  const nav = useNavigate();

  const isInCart = (productId, variantSize) => {
    return cart.some(
      (item) => item.productId === productId && item.variant === variantSize
    );
  };



useEffect(() => {
  const fetchCart = async () => {
    const email = localStorage.getItem("email");
    if (!email) return;

    try {
      const res = await axios.get(`http://localhost:5000/users?email=${email}`);
      const user = res.data[0];
      if (user?.cart) setCart(user.cart); // sync context
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  fetchCart();
}, [setCart]);




  useEffect(() => {
    if (detail) {
      setMainImg(detail.image || detail.images?.[0] || null);
      setSelectedVariant(detail?.variants?.[0] || null);
    }
  }, [detail]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (!detail) return <div className="py-10 text-center">Product not found</div>;

  return (
    <section className="px-4 bg-[#f9f9f9] py-20">
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 font-lora">

        {/* LEFT: Product Image */}
        <div>
          <div className="bg-white flex items-center justify-center h-[420px]">
            {mainImg && (
              <img src={mainImg} alt={detail.name} className="object-contain h-full" />
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {detail.images?.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImg(img)}
                className={`w-20 h-20 bg-white flex items-center justify-center border cursor-pointer rounded-lg
                  ${mainImg === img ? "border-gray-800" : "border-gray-300"}`}
              >
                <img src={img} alt={detail.name} className="object-contain h-14" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Product Details */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{detail.name}</h1>

          {selectedVariant && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-500 line-through text-sm">
                ₹{selectedVariant.mrp}
              </span>
              <span className="text-xl font-semibold text-gray-800">
                ₹{selectedVariant.price}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 text-sm">
            <span className="text-yellow-500">★★★★★</span>
            <span className="text-gray-500">(5 customer reviews)</span>
          </div>

          <p className="text-sm text-gray-600 mt-4">{detail.description}</p>
          <p className="text-sm text-gray-600 mt-2">{detail.shortNote}</p>

          {/* Variants */}
          {detail?.variants?.length > 0 && (
            <div className="max-w-md p-6 border border-gray-400 rounded-xl my-6 relative">
              <h3 className="absolute -top-3 left-4 text-sm font-semibold bg-[#f9f9f9] px-2">
                Choose Variants
              </h3>
              <p className="text-sm font-bold mb-3">Select Size</p>
              <div className="flex gap-3">
                {detail.variants.map((v) => (
                  <button
                    key={v.size}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-6 py-3 border text-sm transition
                      ${
                        selectedVariant?.size === v.size
                          ? "border-black border-2 font-medium"
                          : "border-gray-300 text-gray-600"
                      }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <div className="flex border rounded">
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <input
                value={quantity}
                readOnly
                className="w-12 text-center outline-none"
              />
              <button
                className="px-3 py-2"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            {/* Add to Cart / Go To Cart */}
            {isInCart(detail.id, selectedVariant?.size) ? (
              <button
                onClick={() => nav("/cart")}
                className="bg-gray-800 text-white px-8 py-2"
              >
                GO TO CART
              </button>
            ) : (
              <button
                onClick={() =>
                  Addtocart(detail, setCart, quantity, selectedVariant,nav)
                }
                className="bg-gray-800 text-white px-8 py-2"
              >
                ADD TO CART
              </button>
            )}

            {/* Buy Now */}
            <button
              onClick={() => {
                Buynow(detail, setCart, quantity, selectedVariant, setBuyNowItem,nav);
              }}
              className="bg-gray-800 text-white px-8 py-2"
            >
              BUY NOW
            </button>
          </div>

          {/* Accordions */}
          <div className="mt-8">
            <button
              onClick={() => toggleSection("about")}
              className="w-full flex justify-between py-4 border-b"
            >
              <span>About Product</span>
              <span>{activeSection === "about" ? "−" : "+"}</span>
            </button>
            {activeSection === "about" && (
              <p className="mt-4 text-sm text-gray-600">{detail.longNote}</p>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={() => toggleSection("ingredients")}
              className="w-full flex justify-between py-4 border-b"
            >
              <span>Ingredients</span>
              <span>{activeSection === "ingredients" ? "−" : "+"}</span>
            </button>
            {activeSection === "ingredients" && (
              <ul className="mt-4 list-disc pl-5 text-sm text-gray-600">
                {detail.ingredients?.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailView;
