"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

export default function DetailsPage() {
  const params = useSearchParams();
  const name = params.get("name");
  const image = params.get("image");
  const price = params.get("price");
  const stars = parseInt(params.get("stars") || "0");

  return (
    <div className="min-h-screen bg-white p-8 mt-6 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Image Details
      </h1>

      <div className="flex flex-col sm:flex-row gap-10">
        <div className="relative w-full sm:w-80 h-80 border rounded-xl overflow-hidden shadow-md">
          {image && (
            <Image
              src={image}
              alt={name || "Image"}
              fill
              className="object-cover"
            />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{name}</h2>
          <p className="text-lg text-gray-600 mb-2">Price: ${price}</p>
          <div className="flex items-center mb-4">
            {[...Array(stars)].map((_, i) => (
              <StarIcon key={i} className="w-6 h-6 text-yellow-500" />
            ))}
            {[...Array(5 - stars)].map((_, i) => (
              <StarIcon key={`empty-${i}`} className="w-6 h-6 text-gray-300" />
            ))}
          </div>
          <p className="text-gray-500">
            This is a static details page. You can enhance this to fetch product
            data from a database or API.
          </p>
        </div>
      </div>
    </div>
  );
}
