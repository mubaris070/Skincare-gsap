import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-black/10 text-gray-900 text-[14px] tracking-[0.2em] font-medium uppercase">
      <div className="flex items-center justify-between px-6 sm:px-8 md:px-12 lg:px-10 py-4 md:py-5">
        {/* Left Links (Desktop) */}
        <div className="hidden md:flex gap-6 md:gap-10">
          <Link to="home" smooth duration={600} offset={-60} className="cursor-pointer">
            Home
          </Link>
          <Link to="details" smooth duration={600} offset={-60} className="cursor-pointer">
            Details
          </Link>
          <Link to="about" smooth duration={600} offset={-60} className="cursor-pointer">
            About Us
          </Link>
          <Link to="contact" smooth duration={600} offset={-60} className="cursor-pointer">
            Contact
          </Link>
        </div>

        {/* Logo */}
        <div className="text-2xl font-serif font-bold tracking-tighter">VERA</div>

        {/* CTA + Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden md:inline-flex relative items-center justify-center px-4 py-2 text-[12px] font-lora tracking-wide text-white rounded-full bg-gray-900 transition-all duration-300 hover:bg-gray-800 hover:scale-105"
          >
            Get Started
          </a>

          {/* Mobile Toggle */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-900">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-black/10">
          <div className="flex flex-col items-start px-5 gap-6 py-8 text-sm tracking-widest">
            <Link to="home" smooth duration={600} offset={-80} onClick={() => setOpen(false)} className="cursor-pointer">
              Home
            </Link>
            <Link to="details" smooth duration={600} offset={-80} onClick={() => setOpen(false)} className="cursor-pointer">
              Details
            </Link>
            <Link to="about" smooth duration={600} offset={-80} onClick={() => setOpen(false)} className="cursor-pointer">
              About Us
            </Link>
            <Link to="contact" smooth duration={600} offset={-80} onClick={() => setOpen(false)} className="cursor-pointer">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
