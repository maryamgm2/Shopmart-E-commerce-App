"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="bg-gray-50 flex flex-col items-center justify-center min-h-[75vh] px-6 text-center">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight">
            Welcome to ShopMart
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed font-medium">
            Discover the latest technology, fashion, and lifestyle products.
            Quality guaranteed with fast shipping and excellent customer
            service.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button
            asChild
            size="lg"
            className="w-full sm:w-64 h-14 bg-black text-white border-2 border-black rounded-md text-lg font-bold transition-all duration-300 hover:bg-white hover:text-black active:scale-95"
          >
            <Link href="/products">Shop Now</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-64 h-14 border-2 border-black bg-white text-black rounded-md text-lg font-bold transition-all duration-300 hover:bg-black hover:text-white active:scale-95"
          >
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
