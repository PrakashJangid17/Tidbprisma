'use client';

import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
} from '@heroui/react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const cards = [
    { id: 1, name: "Joint Photographic Experts Group", image: "/1.jpeg", price: 199.99, stars: 3 },
    { id: 2, name: "Sample Image 2", image: "/2.jpeg", price: 149.99, stars: 4 },
    { id: 3, name: "Sample Image 3", image: "/3.jpeg", price: 179.99, stars: 5 },
    { id: 4, name: "Sample Image 4", image: "/4.jpeg", price: 159.99, stars: 4 },
    { id: 5, name: "Sample Image 5", image: "/5.jpeg", price: 139.99, stars: 4 },
    { id: 6, name: "Sample Image 6", image: "/6.jpeg", price: 189.99, stars: 4 },
    { id: 7, name: "Sample Image 7", image: "/7.jpeg", price: 209.99, stars: 5 },
    { id: 8, name: "Sample Image 8", image: "/8.jpeg", price: 99.99, stars: 4 },
    { id: 9, name: "Sample Image 9", image: "/9.jpeg", price: 299.99, stars: 5 },
  ];
const handleAddToCart = (product: { id: number; name: string; price: number }) => {
  if (typeof window !== 'undefined') {
    const existingCart = localStorage.getItem('cart');
    const cart = existingCart ? JSON.parse(existingCart) : [];

    const existingIndex = cart.findIndex((item: any) => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/Addtocart'); // ✅ fixed path
  }
};

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 mt-2 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Image Gallery</h1>
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-72 outline-none border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
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
                <div className="text-xl font-bold text-gray-700 mb-2">${card.price}</div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-1">
                    {[...Array(card.stars)].map((_, i) => (
                      <StarIcon key={`filled-${i}`} className="w-5 h-5 text-yellow-500" />
                    ))}
                    {[...Array(5 - card.stars)].map((_, i) => (
                      <StarIcon key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
                    ))}
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      onClick={() => handleAddToCart(card)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      Add to Cart
                    </button>
                    <Button
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/Details/${card.id}?name=${encodeURIComponent(card.name)}&image=${card.image}&price=${card.price}&stars=${card.stars}`
                        )
                      }
                      className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md h-10"
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
