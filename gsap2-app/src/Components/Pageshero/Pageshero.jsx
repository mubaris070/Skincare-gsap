import React from 'react'
import { useNavigate } from 'react-router-dom'

function Pageshero({Heading,subhead,link}) {
  const nav = useNavigate()
  return (
    <>
    <section className="w-full py-12 md:pt-20 bg-[#f7f7f7] font-lora overflow-hidden mb-12 relative">
            <div
              className="absolute inset-0 opacity-[0.15]"
              style={{
                backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            ></div>

            <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 ">
              <h1 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
                {Heading}
              </h1>

              <nav className="flex items-center gap-2 text-xs md:text-sm font-medium text-gray-500">
                <button
                  onClick={() => nav("/home")}
                  className="hover:text-black transition-colors"
                >
                  Home
                </button>
                <span className="text-gray-400">/</span>
                <button
                  onClick={() => nav(link)}
                  className="hover:text-black transition-colors"
                >
                 {subhead}
                </button>
              </nav>
            </div>
          </section>
    </>
  )
}

export default Pageshero