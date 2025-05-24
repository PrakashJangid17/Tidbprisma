

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:px-8 mt-2 rounded-lg">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">Shopping Cart</span>
        </h1>

        <div className="flex justify-center">
          <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-3 rounded-md w-full sm:max-w-md shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
            <span className="text-sm sm:text-base">Your shopping cart is empty.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
