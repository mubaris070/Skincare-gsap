import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin, ScrollTrigger } from "gsap/all";
import Blog from "./Blog";
import Featuredproduct from "./Featured/Featuredproduct";


gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export default function Hero1() {
  const sectionRef = useRef(null);
  const hero1Ref = useRef(null);
  const hero2Ref = useRef(null);
  const hero3Ref = useRef(null);
  const headRef = useRef(null);
  // const ingrRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const scrollEnd = isMobile ? "+=100%" : "+=60%";
    const scrub = isMobile ? 1 : 2;
    const swapOffset = isMobile ? 0.7 : 1.0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: scrollEnd,
        scrub: scrub,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(hero1Ref.current, {
      scale: 3,
      opacity: 0,
      filter: "blur(2px)",
      duration: 0.9,
      ease: "expo.out",
    });

    tl.add("swap", 0.2);

    tl.fromTo(
      hero3Ref.current,
      { scale: 0.9, opacity: 0, y: 300 },
      { scale: 1, opacity: 1, y: 120, duration: 0.8, ease: "expo.out" },
      "swap"
    );

    tl.fromTo(
      hero2Ref.current,
      { scale: 0.9, opacity: 0, y: -300 },
      { scale: 1, opacity: 1, y: -101, duration: 0.8, ease: "expo.out" },
      "swap"
    );

    tl.to(
      hero2Ref.current,
      {
        scaleX: isMobile ? 0.6 : 1,
        scaleY: isMobile ? 0.6 : 1,
        x: isMobile ? 90 : -1020,
        y: isMobile ? 88 : -220,
        duration: 1,
        ease: "expo.out",
      },
      `swap+=${swapOffset}`
    );

    tl.to(
      hero3Ref.current,
      {
        scaleX: isMobile ? 0.6 : 1,
        scaleY: isMobile ? 0.6 : 1,
        x: isMobile ? 90 : -1020,
        y: isMobile ? 275 : 0,
        duration: 1,
        ease: "expo.out",
      },
      `swap+=${swapOffset}`
    );

    tl.to(headRef.current, { color: "#739aae" }, "swap+=0.3");
    tl.to(headRef.current, { color: "#a7aaaf" }, "swap+=1.2");

  //   const ingredients = ingrRef.current.children;
  //   const ingredientOffset = isMobile ? 0.8 : 1.8;

  //   tl.fromTo(
  //     ingredients,
  //     { opacity: 0, x: 900, y: -800, delay: 4 },
  //     {
  //       opacity: 1,
  //       duration: 0.9,
  //       ease: "expo.out",
  //       motionPath: {
  //         path: [
  //           { x: 550, y: -500 },
  //           { x: 100, y: 50 },
  //           { x: 0, y: 0 },
  //         ],
  //         curviness: 2,
  //       },
  //       stagger: { each: 0.1 },
  //     },
  // `swap+=${ingredientOffset}` // <-- correct usage
  //   );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
 
const isDesktop = window.innerWidth >= 768;

  return (
    <>
<section
  ref={sectionRef}
  className="relative flex justify-center items-center min-h-screen pt-[100px] overflow-hidden bg-cover bg-center bg-no-repeat pb-16 md:pb-0"
  style={{
    backgroundImage: `url('${isDesktop ? '/images/8.jpg' : '/images/8.1.jpg'}')`,
    
  }}
>
          <h1
            ref={headRef}
            className="absolute z-10 text-[20vw] sm:text-[18vw] lg:text-[18vw] top-[450px] md:top-[250px] leading-none tracking-tighter text-black opacity-90 select-none whitespace-nowrap font-modern-negra"
          >
            NOURISH
          </h1>

          <div ref={hero1Ref} className="absolute z-20 w-full flex justify-center pointer-events-none top-[430px] sm:top-[260px] lg:top-50 left-1/2 -translate-x-1/2">
            <img src="/images/iceblue.png" alt="Hero Image 1" className="w-[190px] sm:w-[360px] lg:w-[500px] h-auto drop-shadow-2xl" />
          </div>

          <div id="product" ref={hero2Ref} className="absolute z-20 w-full flex justify-center pointer-events-none scale-100 sm:scale-110 opacity-0 top-[410px] sm:top-[420px] lg:top-[340px] left-1/2 -translate-x-1/2 lg:left-[1010px] rotate-360">
            <img src="/images/top.png" alt="Hero Image 2" className="w-[260px] sm:w-[360px] lg:w-[370px] h-[220px] lg:h-[310px] drop-shadow-2xl" />
          </div>

          <div ref={hero3Ref} className="absolute z-10 w-full flex justify-center pointer-events-none scale-100 sm:scale-110 opacity-0 top-[265px] sm:top-[440px] lg:top-[250px] left-1/2 -translate-x-1/2 lg:left-[1010px] rotate-360">
            <img src="/images/bottom.png" alt="Hero Image 3" className="w-[260px] sm:w-[360px] lg:w-[370px] h-[250px] lg:h-[310px] drop-shadow-2xl" />
          </div>
{/* 
       <section
    id="blog"
    className="min-h-screen flex items-center justify-center relative z-20"
  >
    <div
      ref={ingrRef}
      className="
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5
        gap-12
        px-6 sm:px-10
        mt-65 sm:mt-40
      "
    >
      <div className="flex flex-col items-center text-center group relative top-0 left-0 lg:-top-[300px] lg:left-[130px]">
        <div className="w-36 h-36 rounded-full border-2 border-gray-800 shadow-sm flex items-center justify-center bg-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <img src="/images/blue1.png" className="w-24 h-24 object-contain" />
        </div>
        <h3 className="mt-6 text-lg font-semibold font-lora">Blueberry Extract</h3>
        <p className="mt-2 text-sm text-gray-900">
          Rich in antioxidants to revitalize and brighten dull skin.
        </p>
      </div>

      <div className="flex flex-col items-center text-center group relative top-0 lg:-top-[60px]">
        <div className="w-36 h-36 rounded-full border-2 border-gray-800 shadow-sm flex items-center justify-center bg-white/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <img src="/images/vitamin-e.png" className="w-24 h-24 object-contain" />
        </div>
        <h3 className="mt-6 text-lg font-semibold font-lora">Vitamin E</h3>
        <p className="mt-2 text-sm text-gray-900">
          Protects from free radical damage and promotes skin healing.
        </p>
      </div>

      <div className="flex flex-col items-center text-center group relative top-0 lg:top-[70px]">
        <div className="w-36 h-36 rounded-full border-2 border-gray-800 shadow-sm flex items-center justify-center bg-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <img src="/images/acid1.png" className="w-24 h-24 object-contain" />
        </div>
        <h3 className="mt-6 text-lg font-semibold font-lora">Hyaluronic Acid</h3>
        <p className="mt-2 text-sm text-gray-900">
          Delivers intense hydration and strengthens the moisture barrier.
        </p>
      </div>

      <div className="flex flex-col items-center text-center group relative top-0 lg:-top-[60px]">
        <div className="w-36 h-36 rounded-full border-2 border-gray-800 shadow-sm flex items-center justify-center bg-white/80 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <img src="/images/allanation.png" className="w-24 h-24 object-contain" />
        </div>
        <h3 className="mt-6 text-lg font-semibold font-lora">Allantoin</h3>
        <p className="mt-2 text-sm text-gray-900">
          Soothes irritation and promotes skin renewal.
        </p>
      </div>

      <div className="flex flex-col items-center text-center group relative top-0 right-0 lg:-top-[300px] lg:right-[140px]">
        <div className="w-36 h-36 rounded-full border-2 border-gray-800 shadow-sm flex items-center justify-center bg-white/40 backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
          <img src="/images/niancimide.png" className="w-24 h-24 object-contain" />
        </div>
        <h3 className="mt-6 text-lg font-semibold font-lora">Niacinamide</h3>
        <p className="mt-2 text-sm text-gray-900">
          Improves skin texture and minimizes pores.
        </p>
      </div>
    </div>
  </section> */}
        </section>
    <Blog />
    <Featuredproduct />
    </>
  );
}
