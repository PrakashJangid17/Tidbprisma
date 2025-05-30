"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookmarkIcon, ShoppingCartIcon, HomeIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/Components/CartContext/page"; // adjust path if needed

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart(); // cartItems from CartContext

  return (
    <nav className="bg-white shadow-md rounded-md px-4 py-2 sm:py-4 flex flex-wrap items-center justify-between gap-4 sm:gap-0 relative">
      {/* Left: Dropdown Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="rounded-full p-2 hover:bg-gray-100"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Dropdown Menu Content */}
        {isOpen && (
          <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 transition-all duration-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Book Type</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {[
                  { name: "All Item", href: "/Menu/Allitem" },
                  { name: "Books", href: "/Menu/Books" },
                  { name: "Smart Phones", href: "/Menu/Phone" },
                  { name: "Coolers", href: "/Menu/Coolers" },
                  { name: "Bags & Pants", href: "/Menu/pant" },
                  { name: "Laptops", href: "/Menu/laptop" },
                ].map(({ name, href }) => (
                  <li key={name} className="px-2 py-1 rounded hover:bg-gray-100">
                    <Link href={href} className="block w-full text-gray-600 hover:text-gray-800">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-3" />

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Order by</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {[{ name: "Published At", href: "/Menu/Allitem" }].map(({ name, href }) => (
                  <li key={name} className="px-2 py-1 rounded hover:bg-gray-100">
                    <Link href={href} className="block w-full text-gray-600 hover:text-gray-800">
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Center: All Items Link */}
      <div className="flex-grow text-center sm:flex sm:justify-center sm:items-center">
        <Link href="/Session/Bookstore">
          <div className="inline-flex items-center space-x-2 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded">
            <BookmarkIcon className="w-6 h-6 text-black" />
            <span className="text-black font-bold">All Items</span>
          </div>
        </Link>
      </div>

      {/* Right: Home Icon + Cart Icon */}
      <div className="flex items-center space-x-4">
        {/* Home Icon */}
        <Link href="/">
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <HomeIcon className="h-6 w-6 text-gray-700" />
          </div>
        </Link>

        {/* Cart Icon */}
        <Link href="/Addtocart">
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full relative">
            <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}
