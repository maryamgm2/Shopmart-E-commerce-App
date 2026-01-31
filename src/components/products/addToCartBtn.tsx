"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCart } from "@/app/_actions/cart.actions";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useCartContext } from "@/provider/cartprovider"; 
import { redirect } from "next/navigation";

export default function AddCartButton({ prodId }: { prodId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleCart } = useCartContext(); 

  async function addProductToCart(productId: string) {
    try {
      setIsLoading(true);
      const response = await addToCart(productId);
      
      if (response.status === "success") {
        toast.success(response.message, { position: "top-center" });
        await handleCart(); 
      }
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        toast.error(error.message, { position: "top-center" });
      } else {
        toast.error("An unexpected error occurred", { position: "top-center" });
      }
      redirect("/login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      onClick={() => addProductToCart(prodId)}
      className="w-full flex items-center justify-center gap-2 bg-black text-white transition-all duration-300 rounded-lg py-6 border border-black hover:bg-white hover:text-black hover:shadow-md cursor-pointer active:scale-95"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ShoppingCart className="size-4" />
          <span className="font-bold">Add to cart</span>
        </>
      )}
    </Button>
  );
}