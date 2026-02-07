import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

function Footer({
  color = "bg-black text-white",
}) {
  return (
    <footer className={`${color} pt-8 pb-4 font-lora`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">

        {/* Logo + About */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/logoo.png"
              alt="VERA Logo"
              className="w-36 object-contain"
            />
          </div>

          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            VERA is a modern skincare brand inspired by nature’s purity.
            Infused with antioxidant-rich blueberries, our products hydrate,
            protect, and enhance your skin’s natural radiance.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 pt-2">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                size={20}
                className="text-gray-300 hover:text-blue-500 transition"
              />
            </a>

            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                size={20}
                className="text-gray-300 hover:text-sky-400 transition"
              />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                size={20}
                className="text-gray-300 hover:text-pink-500 transition"
              />
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn
                size={20}
                className="text-gray-300 hover:text-blue-600 transition"
              />
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Company</h4>

          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Details</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Customer Services</h4>

          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">My Account</li>
            <li className="hover:text-white cursor-pointer">
              Track Your Order
            </li>
            <li className="hover:text-white cursor-pointer">Return</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Our Information</h4>

          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer">Return Policy</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Contact Info</h4>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>+0123-456-789</li>
            <li>nera@gmail.com</li>
            <li>
              8502 Preston Rd.
              <br />
              Bangalore, Karnataka
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-8 border-t border-gray-700 pt-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">

          <p>
            © 2025{" "}
            <span className="text-[#c2a25d] font-semibold">NERA</span>. All Rights
            Reserved.
          </p>

          <div className="flex items-center gap-3">
            <span className="hover:text-white cursor-pointer">English</span>
            <span>|</span>
            <span className="hover:text-white cursor-pointer">USD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
