import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaRegUserCircle, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const nav = useNavigate();

  const isLoggedin = localStorage.getItem("isLogged") === "true";

  function Logout() {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    setIsopen(false);
    alert("Successfully logged out");
    nav("/login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md border-b border-black/10 text-gray-900 text-[14px] tracking-[0.2em] font-medium uppercase">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        
        <div className="hidden md:flex gap-6 md:gap-10">
          <Link to="/home" className="hover:text-teal-600">Home</Link>
          <Link to="/shop" className="hover:text-teal-600">Shop</Link>
          <Link to="/about" className="hover:text-teal-600">About Us</Link>
          <Link to="/contact" className="hover:text-teal-600">Contact</Link>
        </div>

        <div className="text-2xl font-serif font-bold tracking-tighter">VERA</div>

        <div className="flex items-center gap-4">
          {isLoggedin ? (
             <Link to="/cart">
            <FaShoppingCart className="text-2xl hover:text-teal-600" />
          </Link>
          ):(
            <Link to="/login">
            <FaShoppingCart className="text-2xl hover:text-teal-600" />
          </Link>
          )
        }

         
{isLoggedin ? (
  <div 
    className="relative font-lora py-2" 
    onMouseEnter={() => setIsopen(true)}
    onMouseLeave={() => setIsopen(false)}
  >
    <button
      className="text-2xl hover:text-teal-600 block"
    >
      <FaRegUserCircle />
    </button>

    <div
      className={`absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50
                  transform transition-all duration-300 origin-top-right
                  ${isopen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
    >
      <div className="absolute -top-2 right-5 w-3 h-3 bg-white rotate-45 border-t border-l border-gray-200"></div>

      <div className="flex flex-col py-1">
        <button
          to="/profile"
          onClick={() => setIsopen(false)}
          className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gray-100 transition-colors "
        >
          <FaUser className="text-gray-400" />
          <span>Account</span>
        </button>

        <div className="border-t border-gray-100 mx-2"></div> {/* Optional Divider */}

        <button
          onClick={Logout}
          className="flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
) : (
  <Link to="/login" className="text-2xl hover:text-teal-600">
    <FaRegUserCircle />
  </Link>
)}


          {/* Mobile Menu */}
          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-black/10">
          <div className="flex flex-col px-5 gap-6 py-8 text-sm tracking-widest">
            <Link to="/home" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/shop" onClick={() => setOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About Us</Link>
            <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
