import React, { useEffect, useRef } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)


function Contact() {

  const settlerRef = useRef(null)
    const contactRef = useRef(null)


  useEffect(()=>{
        const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 50%",
        end: "+=70%",
        scrub: 1,
      },
    });

    tl.fromTo(settlerRef.current, {
          opacity: 0,
          x: -450,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "expo.out",
        },)


      
  },[])

  return (
    <>
    <div ref={contactRef} className="mt-10">
      <section className="bg-[#f9f9f7] py-16 relative overflow-hidden">
        <div ref={settlerRef} className="max-w-4xl mx-auto text-center px-6">
          <p className="text-sm tracking-widest text-gray-500 uppercase mb-4">
            Contact Us
          </p>

          <h2 className="font-lora text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
            Subscribe to Our Newsletter to <br />
            Get <span className="text-[#c2a25d]">Updates</span> on Our Latest
            Offers
          </h2>

          <p className="text-gray-600 mt-4 text-sm">
            Get 25% off on your first order just by subscribing to our
            newsletter
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-[280px] md:w-[320px] px-6 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <button className="px-8 py-3 rounded-full bg-green-800 text-white font-medium hover:bg-green-900 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>

     
      </div>
    </>
  );
}

export default Contact;
