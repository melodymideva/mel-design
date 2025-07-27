'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white/80 rounded-2xl shadow-xl p-10 max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-pink-600 mb-4 drop-shadow-md">
          👗 Welcome to Mel Designs
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover elegant dresses, trendy tops, and unique styles for every occasion.
        </p>
        
        <Link href="/products">
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-all shadow-md">
            Shop Now
          </button>
        </Link>
        
      </div>
    </main>
  );
}