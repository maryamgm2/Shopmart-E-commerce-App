import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#F9FAFB] px-6 font-sans">
      <div className="mb-6 relative">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <ShoppingBag className="size-10 text-gray-200" />
        </div>
        <div className="absolute -top-1 -right-1 bg-black text-white size-6 rounded-full flex items-center justify-center font-bold text-xs">
          ?
        </div>
      </div>

      <div className="text-center max-w-sm">
        <h2 className="text-2xl font-black text-black tracking-tight mb-2 uppercase">
          Lost in ShopMart?
        </h2>

        <p className="text-gray-400 text-sm font-medium mb-8">
          The page you&apos;re looking for isn&apos;t here.
        </p>

        <Button
          asChild
          variant="outline"
          className="h-12 px-8 rounded-xl border-gray-200 text-gray-600 font-bold text-sm hover:bg-black hover:text-white transition-all"
        >
          <Link href="/">
            <ArrowLeft className="size-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <p className="mt-16 text-[9px] text-gray-600 font-bold uppercase tracking-[0.4em]">
        ShopMart Experience
      </p>
    </div>
  );
}
