import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Element } from "react-scroll";

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
        start: "top 50%",
        end: "+=70%",
        scrub: true,
        markers: true,
      },
    });

    tl.fromTo(
      headRef.current,
      { opacity: 0, x: -150 },
      { opacity: 1, x: 0, duration: 1, ease: "expo.out" }
    )
      .add("float", "-=0.5")
      .fromTo(
        img1Ref.current,
        { opacity: 0, y: -200, scale: 0.8 },
        { opacity: 1, y: -68, x: 35, scale: 1, duration: 1.2, ease: "expo.out" },
        "float"
      )
      .fromTo(
        img2Ref.current,
        { opacity: 0, y: -200, scale: 0.8 },
        { opacity: 1, y: 38, x: 20, scale: 1, duration: 1.2, ease: "expo.out" },
        "float"
      )
      .fromTo(
        img3Ref.current,
        { opacity: 0, y: -250, scale: 0.7 },
        { opacity: 1, y: -90, x: 40, scale: 1, duration: 1.2, ease: "expo.out" },
        "float"
      );
  }, []);

  return (
    <Element name="about">
    <>
    <section ref={aboutRef} className="min-h-screen w-full overflow-x-hidden">
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

        {/* RIGHT : IMAGES */}
        <div className="flex-1 relative min-h-[380px] md:min-h-[500px] flex justify-center md:top-0 -top-20">

          {/* MAIN IMAGE */}
          <img
            src="/images/abt (1).png"
            alt="About VERA"
            className="w-[110%] md:w-[120%] max-w-none relative md:translate-x-10"
          />

          {/* FLOATING IMAGE 1 */}
          <div ref={img1Ref} className="absolute top-5 md:top-10 -left-[3%] md:left-[8%] z-20">
            <img src="/images/paste (1).png" className="w-[210px] md:w-[300px]" />
          </div>

          {/* FLOATING IMAGE 2 */}
          <div ref={img2Ref} className="absolute top-10 md:top-24 left-[25%] md:left-[32%] z-20">
            <img src="/images/paste1.png" className="w-[160px] md:w-[250px]" />
          </div>

          {/* FLOATING IMAGE 3 */}
          <div ref={img3Ref} className="absolute top-18 md:top-40 left-[32%] md:left-[55%] z-20">
            <img
              src="/images/paste2 (1).png"
              className="w-[220px] md:w-[450px] h-auto md:h-[400px]"
            />
          </div>
        </div>

      </div>
    </section>
    </>
    </Element>
  );
}

export default AboutUs;
