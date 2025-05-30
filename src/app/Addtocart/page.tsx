'use client';

import React, { useEffect, useState } from 'react';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import PageBreadcrumbs from '@/Components/PageBreadcrumbs/PageBreadcrumbs';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function CartPage() {

  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeItem = (id: number) => {
    const newCart = cart.filter(item => item.id !== id);
    updateCart(newCart);
  };

  const changeQuantity = (id: number, delta: number) => {
    const newCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(item.quantity + delta, 1) };
      }
      return item;
    });
    updateCart(newCart);
  };
  
  const handleOrderClick = () => {
    alert('Order placed successfully!');
    updateCart([]); // Clear the cart after redirecting
  };

  

  const grandTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PageBreadcrumbs label="Cart" />

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-6 mb-2 text-center">
        🛒 Your Cart{' '}
        <span className="text-lg font-medium text-gray-600">
          ({totalItems} item{totalItems !== 1 ? 's' : ''})
        </span>
      </h1>
      <hr className="my-6" />

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-full gap-4"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 relative rounded-md bg-gray-100 shrink-0">
                    <Image
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price} × {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-gray-800">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => changeQuantity(item.id, -1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="px-3 font-medium text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => changeQuantity(item.id, 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                   <button
              onClick={handleOrderClick}
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Order Now
            </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600 transition"
                    title="Remove from cart"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-right">
            <p className="text-2xl font-semibold text-gray-800">
              Grand Total: ${grandTotal.toFixed(2)}
            </p>
           
          </div>
        </>
      )}
    </div>
  );
}
