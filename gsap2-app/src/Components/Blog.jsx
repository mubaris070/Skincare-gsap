import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useEffect, useRef } from "react";
import { Element } from "react-scroll";

gsap.registerPlugin(ScrollTrigger);

function Blog() {
      const isMobile = window.innerWidth < 768;
  const blogRef = useRef(null);
  const hero2Ref = useRef(null);
  const hero3Ref = useRef(null);
    const imgRef = useRef(null);
  const detRef = useRef(null);
    const headRef = useRef(null);




  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: blogRef.current,
        start: "top top",
        end: "+=80%",
        scrub: 1,
      },
    });



 tl.fromTo(
  headRef.current,
  { opacity: 0, x: -300, skewX: 10 },
  { opacity: 1, x: 0, skewX: 0, ease: "power4.out", duration: 1.2 },
);


     
    tl.add("swap")
    .fromTo(
      hero3Ref.current,
      { opacity: 0, scale:isMobile?0.7: 1, y: -190 },
      { opacity: 1, scale:isMobile?0.6: 1, y: isMobile?-25: -30, x:isMobile? -55:-90, duration: 1 },
      "swap"
    )

      .fromTo(
        hero2Ref.current,
        { opacity: 0, scale:isMobile?0.7: 1, y: -230 },
        { opacity: 1, scale:isMobile?0.6: 1, y: isMobile?-55: -78,x:isMobile? -55:-90, duration: 1 },
        "swap"
      );



    
     tl.fromTo(
    detRef.current.children,
    {
      opacity: 0,
      x: -120,   
    },
    {
      opacity: 1,
      x: 0,
      stagger: 0.2,
      duration: 1,
      ease: "expo.out",
    },"swap"
  )

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <>
    <section
      ref={blogRef}
      className=" min-h-[100vh] w-full relative pb-8 md:pb-8"
    >

 <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center md:text-left">
        <h1 className="font-lora text-[23px] tracking-[0.35em] text-gray-500 uppercase">
          PRODUCT DETAILS
        </h1>

        <div ref={headRef}>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight font-lora">
            Crafted for Skin <br />
            <span className="text-[#c2a25d]">That Deserves More</span>
          </h2>

          <p className="mt-6 max-w-2xl mx-auto md:mx-0 text-gray-500 font-georgia">
               Crafted with carefully selected ingredients, this formula goes beyond
          basic care to deeply nourish, restore, and protect your skin.
          Every element is designed to deliver visible results while remaining
          gentle, effective, and perfectly balanced for everyday use.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col-reverse md:flex-row  gap-16 md:gap-24">

    <div ref={detRef} className="flex-1 flex flex-col gap-10 md:gap-16">

  <div className="flex items-center gap-4 md:gap-6 text-center md:text-left">
    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border shadow-sm overflow-hidden flex-shrink-0">
      <img
        src="https://i.pinimg.com/1200x/44/ef/46/44ef463b4b5ccf8ac49b9026683723cf.jpg"
        className="w-full h-full object-contain"
      />
    </div>
    <div>
      <h3 className="text-base md:text-xl font-semibold text-gray-800 font-lora">
        Deep Hydration
      </h3>
      <p className="text-xs md:text-sm text-gray-500 font-georgia">
        Provides long-lasting moisture, keeping skin soft and smooth.
      </p>
    </div>
  </div>

  <div className="flex flex-row-reverse items-center gap-4 md:gap-6 text-right">
    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border shadow-sm overflow-hidden flex-shrink-0">
      <img
        src="https://i.pinimg.com/736x/ee/90/9a/ee909afdc8231d860aa489e3c9409f85.jpg"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h3 className="text-base md:text-xl font-semibold text-gray-800 font-lora">
        Soothes Irritated Skin
      </h3>
      <p className="text-xs md:text-sm text-gray-500 font-georgia">
        Calms redness and irritation, perfect for sensitive skin.
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 md:gap-6">
    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border shadow-sm overflow-hidden flex-shrink-0">
      <img
        src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c"
        className="w-full h-full object-cover"
      />
    </div>
    <div>
      <h3 className="text-base md:text-xl font-semibold text-gray-800 font-lora">
        Promotes Skin Healing
      </h3>
      <p className="text-xs md:text-sm text-gray-500 font-georgia">
        Enhances healing of minor cuts, burns, and blemishes.
      </p>
    </div>
  </div>

  <div className="flex flex-row-reverse items-center gap-4 md:gap-6 text-right">
    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border shadow-sm flex items-center justify-center">
      <span className="text-4xl md:text-6xl text-green-500">🌿</span>
    </div>
    <div>
      <h3 className="text-base md:text-xl font-semibold text-gray-800 font-lora">
        Rich in Antioxidants
      </h3>
      <p className="text-xs md:text-sm text-gray-500 font-georgia">
        Fights aging and repairs skin with essential vitamins.
      </p>
    </div>
  </div>

</div>


        <div
          ref={imgRef}
          className="flex-1 flex items-center justify-center"
        >
          <div className="w-[400px] md:w-[500px] h-[350px] md:h-[500px] rounded-full shadow-sm overflow-hidden bg-gray-100 relative">
            <img
              src="/images/hand.png"
              className="relative w-full top-[110px] md:top-42 object-cover"
            />

            <div
              ref={hero2Ref}
              className="absolute inset-0 flex items-center justify-center z-20 opacity-0"
            >
              <img src="/images/top.png" className="w-[160px]" />
            </div>

            <div
              ref={hero3Ref}
              className="absolute inset-0 flex items-center justify-center z-10 opacity-0"
            >
              <img src="/images/bottom.png" className="w-[160px]" />
            </div>
          </div>
        </div>

      </div>
    </section>
    </>
  )
}

export default Blog;
