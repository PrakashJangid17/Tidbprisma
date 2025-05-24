"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BookmarkIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md rounded-md px-4 py-2 sm:py-4 flex flex-wrap items-center justify-between gap-4 sm:gap-0 ml-6 mr-6">
      {/* Left: Menu Dropdown */}
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

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 transition-all duration-200">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Book Type</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {[
                  "Magazine", "Novel", "Life", "Arts", "Comics",
                  "Education & Reference", "Humanities & Social Sciences",
                  "Science & Technology", "Kids", "Sports"
                ].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <hr className="my-3" />

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Order by</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                {["Published At", "Price"].map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer px-2 py-1 rounded hover:bg-gray-100"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Center: Bookstore Link */}
      <div className="flex-grow text-center sm:flex sm:justify-center sm:items-center">
        <Link href="/Session/Bookstore">
          <div className="inline-flex items-center space-x-2 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded">
            <BookmarkIcon className="w-6 h-6 text-black" />
            <span className="text-black font-bold">Bookstore</span>
          </div>
        </Link>
      </div>

      {/* Right: Cart Icon */}
      <div className="flex items-center sm:justify-end">
        <Link href="/Session/Cart">
          <div className="p-2 hover:bg-gray-100 cursor-pointer rounded-full">
            <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
          </div>
        </Link>
      </div>
    </nav>
  );
}
