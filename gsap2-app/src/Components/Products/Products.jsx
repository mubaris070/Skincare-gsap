import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Productcard from "./Productcard";

gsap.registerPlugin(ScrollTrigger);

function Products() {
  const [products, setProducts] = useState([]);

  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (products.length === 0) return;

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});

tl.fromTo(
  sectionRef.current,
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out",
  }
);

tl.fromTo(
  cardsRef.current,
  {
    opacity: 0,
    scale: 0,
    y: 50,
  },
  {
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.15,
    ease: "power3.out",
  },
  0.7
);

  },[products]);

  return (
  
    <div id="products" ref={sectionRef} className="py-32 text-center">
      <h1 className="font-lora font-semibold text-[18px] md:text-[26px] tracking-widest md:tracking-[0.35em] text-gray-500 uppercase">
        Latest Products
      </h1>

      <p className="mt-4 text-gray-500 font-lora font-semibold mx-8">
        “Explore our newest skincare innovations made for healthy, radiant skin.”
      </p>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-16 mx-10">
        {products.map((product, index) => (
          <div
            key={product.id}
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <Productcard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
