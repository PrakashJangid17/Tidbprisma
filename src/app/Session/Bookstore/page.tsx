"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
} from "@heroui/react";
import Image from "next/image";
import {
  StarIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const cards = [
    { name: "Joint Photographic Experts Group", image: "/1.jpeg", price: "199.99", stars: 3 },
    { name: "Sample Image 2", image: "/2.jpeg", price: "149.99", stars: 4 },
    { name: "Sample Image 3", image: "/3.jpeg", price: "179.99", stars: 5 },
    { name: "Sample Image 4", image: "/4.jpeg", price: "159.99", stars: 4 },
    { name: "Sample Image 5", image: "/5.jpeg", price: "139.99", stars: 4 },
    { name: "Sample Image 6", image: "/6.jpeg", price: "189.99", stars: 4 },
    { name: "Sample Image 7", image: "/7.jpeg", price: "209.99", stars: 5 },
    { name: "Sample Image 8", image: "/8.jpeg", price: "99.99", stars: 4 },
    { name: "Sample Image 9", image: "/9.jpeg", price: "299.99", stars: 5 },
  ];

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 mt-2 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Image Gallery</h1>
          <input
            type="text"
            placeholder="search..."
            className="w-full sm:w-72 outline-none border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="p-0 overflow-hidden rounded-t-xl">
                <div className="relative w-full h-48">
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>

              <CardBody className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{card.name}</h2>
                <Divider className="my-2" />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(card.stars)].map((_, i) => (
                      <StarIcon key={`filled-${i}`} className="w-5 h-5 text-yellow-500" />
                    ))}
                    {[...Array(5 - card.stars)].map((_, i) => (
                      <StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-sm font-semibold text-white bg-sky-500 hover:bg-sky-600 px-3 py-1 rounded-md h-10 hover:cursor-pointer">
                      ${card.price}
                      <ShoppingCartIcon className="w-5 h-5 ml-1" />
                    </div>
                    <Button
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/Details/${index}?name=${encodeURIComponent(card.name)}&image=${card.image}&price=${card.price}&stars=${card.stars}`
                        )
                      }
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md w-full h-10 hover:cursor-pointer"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
