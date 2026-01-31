"use client";
import { Heart, Loader2 } from "lucide-react";
import { useWishlist } from "@/provider/wishlistprovider"; 
import { useState } from "react";

export default function WishlistBtn({ productId }: { productId: string }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isPending, setIsPending] = useState(false);

  const active = isInWishlist(productId);

  const handleToggle = async () => {
    setIsPending(true);
    await toggleWishlist(productId); 
    setIsPending(false);
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className={`flex-1 p-2 border rounded-xl transition-all duration-300 flex items-center justify-center h-11 cursor-pointer active:scale-90 ${
        active 
          ? "bg-red-50 border-red-200" 
          : "bg-gray-50 border-gray-300 hover:bg-red-50 hover:border-red-100"
      }`}
    >
      {isPending ? (
        <Loader2 className="size-5 animate-spin text-gray-400" />
      ) : (
        <Heart 
          className={`size-5 transition-all duration-300 ${
            active ? "fill-red-500 text-red-500" : "text-gray-400"
          }`} 
        />
      )}
    </button>
  );
}