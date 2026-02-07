import React from 'react'
import { FaApple, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

function Authform({
    title,
    subtitle,
    fields,
    onSubmit,
    buttonName,
    footerText,
    footerLink,
    footerLinkto,
    margin,
    error
}) {
  return (
    <>
        <div className="flex w-full lg:w-1/2 flex-col  px-6 sm:px-10 lg:px-24">

       

        <div className="mx-auto w-full max-w-md">

          <div className={`${margin} flex justify-center`}>
            <div className="h-10 w-10 rounded-full bg-blue-100 p-2 text-blue-600">
              <div className="h-full w-full rounded-full bg-blue-600 opacity-20 animate-pulse" />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
                {subtitle}
            </p>
          </div>

          <form
            className="mt-8 space-y-4"
            onSubmit={onSubmit}
          >


           {fields.map((field,index)=>(
            <div key={index}>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                className="w-full rounded-lg border border-slate-200 p-3 text-sm outline-none transition-all focus:border-transparent focus:ring-1 focus:ring-slate-900"
              />
               <p className="text-red-500 text-sm mt-1">{error[field.name]}</p>
            </div>

           ))}
              
            <button className="w-full rounded-lg bg-black p-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-slate-800">
              {buttonName}
            </button>

          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>

            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400">
                or
              </span>
            </div>
          </div>

          <div className="flex gap-4">

            <button className="flex flex-1 justify-center rounded-lg border border-slate-200 p-3 transition-all hover:bg-slate-50">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="h-5 w-5"
                alt="Google"
              />
            </button>

            <button className="flex flex-1 items-center justify-center rounded-lg border border-slate-200 p-3 transition-all hover:bg-slate-50">
              <FaApple className="h-5 w-5" />
            </button>

            <button className="flex flex-1 items-center justify-center rounded-lg border border-slate-200 p-3 transition-all hover:bg-slate-50">
              <FaTwitter className="h-5 w-5" />
            </button>

          </div>

          <p className="mt-8 text-center text-sm text-slate-500 mb-4">
            {footerText}{" "}
            <Link
              to={footerLinkto}
              className="font-semibold text-black underline underline-offset-4"
            >
              {footerLink}
            </Link>
          </p>

        </div>
      </div>
    </>
  )
}

export default Authform