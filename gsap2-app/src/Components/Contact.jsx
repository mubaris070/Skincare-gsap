import React, { useEffect, useRef } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Element } from "react-scroll";
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
    <Element name="contact">
    <>
    <div ref={contactRef}>
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

          {/* INPUT */}
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

      {/* FOOTER */}
      <footer className="bg-white py-10">
        <div className=" mx-auto px-10 grid grid-cols-1 md:grid-cols-6 gap-16">
          {/* BRAND */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2 w-35 h-10">
              <img src="/images/vera.png" alt="" className="w-35 h-25"/>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed max-w-sm font-lora">
              VERA is a modern skincare brand inspired by nature’s purity. Infused with antioxidant-rich blueberries,
               our products hydrate, protect, and enhance your skin’s natural radiance- beautifully and effectively.
            </p>

            {/* SOCIAL ICONS */}
    <div className="flex gap-4 mt-4">
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebookF className="text-gray-800 hover:text-blue-800 transition-all duration-300" size={24} />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-black-800 hover:text-blue-600 transition-all duration-300" size={24} />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-gray-800 hover:text-pink-700 transition-all duration-300" size={24} />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
        <FaLinkedinIn className="text-gray-800 hover:text-blue-900 transition-all duration-300" size={24} />
      </a>
    </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="font-semibold mb-4 font-lora">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600 font-lora">
              <li>Home</li>
              <li>Details</li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h4 className="font-semibold mb-4 font-lora">Customer Services</h4>
            <ul className="space-y-3 text-sm text-gray-600 font-lora">
              <li>My Account</li>
              <li>Track Your Order</li>
              <li>Return</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* INFORMATION */}
          <div>
            <h4 className="font-semibold mb-4 font-lora">Our Information</h4>
            <ul className="space-y-3 text-sm text-gray-600 font-lora">
              <li>Privacy</li>
              <li>User Terms & Condition</li>
              <li>Return Policy</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4 font-lora">Contact Info</h4>
            <ul className="space-y-3 text-sm text-gray-600 font-lora">
              <li>+0123-456-789</li>
              <li>nera@gmail.com</li>
              <li>
                8502 Preston Rd. <br />Banglore, karnataka
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-16 border-t pt-6">
          <div className="max-w-6xl mx-auto px-6 flex flex-col  justify-between items-center gap-4 text-[16px] text-gray-500">
            <p className="font-lora">
              Copyright © 2025 <span className="text-[#c2a25d] font-serif">NERA</span>{" "}
               All Rights Reserved.
            </p>

            <div className="flex items-center gap-4 font-lora">
              <span>English</span>
              <span>|</span>
              <span>USD</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </>
    </Element>
  );
}

export default Contact;
