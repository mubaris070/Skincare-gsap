import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import FeaturedCard from "./FeaturedCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Featuredproduct() {
  const [featured, setFeature] = useState([]);
  const featureRef = useRef(null);
  const productRef = useRef(null);

  // Fetch featured products
  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        const featur = res.data.filter((item) => item.isFeatured);
        setFeature(featur);
      })
      .catch((err) => console.error(err));
  }, []);

  // Animate after products loaded
  useEffect(() => {
    if (featured.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: featureRef.current,
        start: "top 50%",
        end: "bottom 90%",
        scrub: 0.2,
      },
    });

    const children = Array.from(productRef.current.children);
    tl.fromTo(
      children,
      { opacity: 0, y: -100, ease: "power4.out" },
      { opacity: 1, y: 0, ease: "expo.out", stagger: 0.1 }
    );
  }, [featured]);

  return (
    <div ref={featureRef} className="mx-6 md:mx-12 px-6 pt-24 pb-32 text-center">
      <h1 className="font-lora text-[22px] tracking-[0.35em] text-gray-500 uppercase">
        Featured Products
      </h1>
      <p className="mt-2 text-gray-500 font-lora max-w-3xl mx-auto">
        “Handpicked skincare essentials to nourish, protect, and glow.”
      </p>

      {/* Grid layout for responsive display */}
      <div
        ref={productRef}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 md:mt-16"
      >
        {featured.map((product) => (
          <FeaturedCard
            key={product.id}
            product={product}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
}

export default Featuredproduct;
