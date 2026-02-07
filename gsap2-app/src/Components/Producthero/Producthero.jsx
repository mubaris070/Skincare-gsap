import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {Link as ScrollLink } from "react-scroll";

export default function Producthero() {
  const imgRef = useRef(null);
  const textRef = useRef(null);

  const images = [
    "/images/phero7.png",
    "/images/phero6 (1).png",
    "/images/her9.png",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // GSAP Animation
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      imgRef.current,
      { opacity: 0, y: -100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
      }
    ).fromTo(
      textRef.current,
      { opacity: 0, scale: 0, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, []);

  // Auto Image Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section>
      <div
        className="
          bg-[#79866E]
          min-h-screen
          flex
          flex-col
          md:flex-row-reverse
          items-center
          justify-center
          gap-6
          md:gap-16
          px-0
          md:px-20
          overflow-hidden
          pt-[20px]
          md:pt-[35px]
        "
      >
        <div
  ref={imgRef}
  className={`
    w-[300px]
    md:mb-0
    md:w-[380px]
    lg:w-[460px]
    flex-shrink-0
    relative

    ${
      currentImage === 1
        ? "flex items-center  justify-center left-0 md:left-48"
        : "left-[39px] md:left-[270px]"
    }
  `}
>

          <img
            src={images[currentImage]}
            alt="product hero"
            className="w-full object-contain"
          />
        </div>

        {/* Text */}
        <div
          ref={textRef}
          className="
            text-white
            max-w-md
            text-center
            mx-5
            
            
          "
        >
          <h1 className="text-3xl md:text-6xl font-modern-negra leading-tight">
            Love the Skin
            <span className="block italic">You’re In</span>
          </h1>

          <p className="mt-6 max-w-md text-[17px] font-lora font-semibold text-gray-900">
            Powered by nature, perfected by science —
            skincare that listens to your skin.
          </p>


          <ScrollLink
            to="products"
            smooth={true}
            duration={800}
            offset={-70}
            className="cursor-pointer"
          >            <button className="mt-8 mb-6 px-8 py-3 bg-gray-800 text-white rounded-full hover:scale-105 transition font-lora cursor-pointer">
              Shop Now
            </button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
