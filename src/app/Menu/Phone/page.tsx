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
import { useCart } from '@/Components/CartContext/page';
import PageBreadcrumbs from '@/Components/PageBreadcrumbs/PageBreadcrumbs';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  stars: number;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [successMessage, setSuccessMessage] = useState('');
  const { addToCart } = useCart();
 const cards = [
     { id: 1, name: "Motorola G05", image: "/Phone/2.webp", price: 15999, stars: 3 },
     { id: 2, name: "iPhone 16 Pro", image: "/phone/3.webp", price: 14999.99, stars: 4 },
     { id: 3, name: "Xiaomi 15", image: "/Phone/12.webp", price: 11999.99, stars: 5 },
     { id: 4, name: "Samsung phones in 2023 — Galaxy S23, Galaxy Z Fold 5 and more", image: "/phone/s.jpg", price: 9999.99, stars: 4 },
     { id: 5, name: "Oppo F25 Pro launched in India, will go on sale from March 5", image: "/phone/o.avif", price: 13999.99, stars: 4 },
     { id: 6, name: "These two new smartphones in China look a lot like the iPhone X", image: "/phone/5.webp", price: 18999.99, stars: 4 },
   ];

  const handleAddToCart = (product: Product) => {
    try {
      const existingCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
      const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

      const index = cart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        cart[index].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      addToCart?.({ ...product, quantity: 1 });

      setSuccessMessage(`${product.name} added to cart!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice =
      priceFilter === 'all' ||
      (priceFilter === 'below100' && card.price < 100) ||
      (priceFilter === '100to200' && card.price >= 100 && card.price <= 200) ||
      (priceFilter === '200to500' && card.price > 200 && card.price <= 500) ||
      (priceFilter === 'above500' && card.price > 500);

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-6 lg:px-8 mt-2 rounded-lg">
      <PageBreadcrumbs label="All Phones" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold text-gray-800">All Phones</h1>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-ful sm:w-72 outline-none border border-gray-300 rounded-md p-2"
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="w-full sm:w-60 border border-gray-300 rounded-md p-2"
          >
            <option value="all">All Prices</option>
            <option value="below100">Below ₹100</option>
            <option value="100to200">₹100 – ₹200</option>
            <option value="200to500">₹200 – ₹500</option>
            <option value="above500">More than ₹500</option>
          </select>
        </div>

        {/* ✅ Show Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 rounded text-green-800 bg-green-100 border border-green-300">
            {successMessage}
          </div>
        )}

        <hr className="my-4" />

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
                  <div className="text-xl font-bold text-gray-700 mb-2">₹{card.price.toFixed(2)}</div>

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

