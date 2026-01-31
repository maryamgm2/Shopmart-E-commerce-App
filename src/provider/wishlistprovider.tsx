"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/app/_actions/wishlist.actions";
import { toast } from "sonner";
import { WishlistProduct } from "@/interfaces/wishlist";

interface WishlistContextType {
  wishlistIds: string[]; 
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (id: string) => Promise<void>;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      setLoading(true); 
      const res = await getWishlist();
      if (res.status === "success") {
        // استبدال any بـ WishlistProduct
        const ids = res.data.map((item: WishlistProduct) => item._id);
        setWishlistIds(ids);
      }
    } catch (error) {
      console.error("Wishlist fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isInWishlist = (id: string) => wishlistIds.includes(id);

  const toggleWishlist = async (productId: string) => {
    const isExist = isInWishlist(productId);
    
    try {
      if (isExist) {
        const res = await removeFromWishlist(productId);
        if (res.status === "success") {
          setWishlistIds(prev => prev.filter(id => id !== productId));
          toast.success("Removed from wishlist");
        }
      } else {
        const res = await addToWishlist(productId);
        if (res.status === "success") {
          setWishlistIds(prev => [...prev, productId]);
          toast.success("Added to wishlist");
        }
      }
    } catch (error: unknown) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistIds, isInWishlist, toggleWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};