'use client';

import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const cards = [
    { id: 1, name: "Constitution Of India", image: "/001.jpeg", price: 199.99, stars: 3 },
    { id: 2, name: "3 Best water air cooler", image: "/coolr.avif", price: 4999.99, stars: 4 },
    { id: 3, name: "5 Smart phone ", image: "/phone.jpeg", price: 10999.99, stars: 5 },
    { id: 4, name: "Laptops with 1080p Full HD displays that offer decent value", image: "/Leptop.webp", price: 30999.99, stars: 4 },
    { id: 5, name: "Pant 8-9y red", image: "/pant.webp", price: 139.99, stars: 4 },
    { id: 6, name: "School Bags", image: "/bages.avif", price: 189.99, stars: 4 },
  ];

  const handleAddToCart = (product: { id: number; name: string; price: number }) => {
    if (typeof window !== 'undefined') {
      const existingCart = localStorage.getItem('cart');
      const cart = existingCart ? JSON.parse(existingCart) : [];

      const existingIndex = cart.findIndex((item: { id: number }) => item.id === product.id);
      if (existingIndex !== -1) {
        cart[existingIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      router.push('/Addtocart');
    }
  };

  // 🔍 Filter logic
  const filteredCards = cards.filter(card =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 mt-2 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">All Items</h1>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-72 outline-none border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
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
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No items found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
