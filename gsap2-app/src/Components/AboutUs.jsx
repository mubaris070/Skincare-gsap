import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);

function AboutUs() {
  const aboutRef = useRef(null);
  const headRef = useRef(null);

  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 5%",
        end: "+=70%",
        scrub: true,
      },
    });

    tl.fromTo(
      headRef.current,
      { opacity: 0, x: -150 },
      { opacity: 1, x: 0, duration: 1, ease: "expo.out" }
    )
      .add("float", "-=1")
      .fromTo(
        img1Ref.current,
        { opacity: 0, y: -100, scale: 0.8 },
        { opacity: 1, y: -68, x: 35, scale: 1, duration: 1.2, ease: "expo.out" },
        "float"
      )
      .fromTo(
        img2Ref.current,
        { opacity: 0, y: -100, scale: 0.8 },
        { opacity: 1, y: 38, x: 20, scale: 1, duration: 1.2, ease: "expo.out" },
        "float"
      )
      .fromTo(
        img3Ref.current,
        { opacity: 0, y: -150, scale: 0.7 },
        { opacity: 1, y: -90, x: 40, scale: 1, duration: 1.2, ease: "expo.out" },
        "float"
      );
  }, []);

  return (
    <>
    <section ref={aboutRef} className="min-h-screen w-full overflow-x-hidden mt-10">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16 md:gap-24">

        {/* LEFT : TEXT */}
        <div className="flex-1 space-y-8 md:space-y-10 text-center md:text-left">
          <h1 className="font-lora text-[14px] md:text-[20px] tracking-[0.35em] text-gray-500 uppercase">
            About VERA
          </h1>

          <div ref={headRef} className="space-y-6 md:space-y-8">
            <h3 className="font-lora text-[28px] md:text-[42px] leading-tight font-medium text-gray-900">
              <span className="block text-[#c2a25d]">
                Nourish Your Skin
              </span>
              <span className="block">
                with the Power of{" "}
                <span className="italic text-gray-800">Blueberries</span>
              </span>
            </h3>

            <div className="w-12 md:w-16 h-[2px] bg-gray-300 mx-auto md:mx-0" />

         <p
  className="
    font-georgia
    text-[14px] md:text-[17px]
    leading-[1.8] md:leading-[1.9]
    text-gray-700
    max-w-xl
    mx-auto md:mx-0
    text-left
  "
>
  At <span className="font-semibold text-gray-900 font-serif">VERA</span>, we believe
  skincare should feel indulgent yet effective. Our blueberry-infused
  moisturizer is thoughtfully crafted to hydrate, calm, and protect your
  skin—delivering antioxidant-rich nourishment in every application.
  <br />
  The result is skin that feels soft, looks radiant, and glows with natural
  vitality.
</p>

          </div>
        </div>


<div className="
  flex-1 relative
  min-h-[300px] sm:min-h-[380px] md:min-h-[500px]
  flex justify-center
  -top-12 sm:-top-20 md:top-0
">

  <img
    src="/images/abt (1).png"
    alt="About VERA"
    className="
      w-[100%] sm:w-[105%] md:w-[120%]
      max-w-none
      relative
      sm:translate-x-4 md:translate-x-10
    "
  />

 
    <img ref={img1Ref}
      src="/images/paste (1).png"
      className="      absolute w-[122px] sm:w-[180px] md:w-[250px] top-31 md:top-26 left-8 md:left-12"
      alt=""
    />

 
    <img ref={img2Ref}
      src="/images/paste1.png"
      className="      absolute w-[110px] sm:w-[150px] md:w-[220px] top-23 md:top-33 right-36 md:right-26"
      alt=""
    />
 
    <img ref={img3Ref}
      src="/images/paste2 (1).png"
      className="       absolute
        w-[145px] sm:w-[220px] md:w-[270px] top-38 md:top-40 left-38 md:left-66
        h-auto md:h-[400px]
      "
      alt=""
    />
</div>


      </div>
    </section>
    </>
  );
}

export default AboutUs;
