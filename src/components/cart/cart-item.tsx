"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartProductI } from "@/interfaces/cart";
import {
  deleteCartProduct,
  updateCartProductCount,
} from "@/app/_actions/cart.actions";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useCartContext } from "@/provider/cartprovider"; 

export default function CartItem({
  product,
  setProducts,
}: {
  product: CartProductI;
  setProducts: (products: CartProductI[]) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  
  const { handleCart } = useCartContext(); 

  async function deleteProduct(id: string) {
    try {
      setIsLoading(true);
      const data = await deleteCartProduct(id);
      if (data.status === "success") {
        toast.success("Product Removed Successfully", { position: "top-center" });
        setProducts(data.data.products); 
        await handleCart(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred while deleting", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  async function updateProductCount(id: string, newCount: number) {
    if (newCount < 1) return; 

    try {
      setIsLoading(true);
      const response = await updateCartProductCount(id, newCount);
      if (response.status === "success") {
        toast.success("Quantity Updated", { position: "top-center" });
        setProducts(response.data.products); 
        await handleCart(); 
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred while updating", { position: "top-center" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-white border border-gray-100 rounded-2xl relative shadow-sm transition-all hover:shadow-md">
      <div className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 relative border border-gray-50">
        <Image
          src={product.product.imageCover}
          alt={product.product.title}
          fill
          sizes="96px"
          loading="lazy"
          className="object-contain p-2"
        />
      </div>

      <div className="flex-1 min-w-0 w-full text-left font-sans">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold text-gray-900 text-sm sm:text-base line-clamp-1">
              {product.product.title}
            </h3>
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-bold">
              {product.product.brand?.name} • {product.product.category?.name}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-sm sm:text-base text-black">
              EGP {(product.price * product.count).toLocaleString()} 
            </p>
            <p className="text-[10px] text-gray-400 font-medium tracking-tight">
              EGP {product.price.toLocaleString()} each
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center border border-gray-100 rounded-xl bg-white shadow-sm overflow-hidden">
            <button
              disabled={isLoading || product.count <= 1}
              onClick={() => updateProductCount(product.product._id, product.count - 1)}
              className="p-2 hover:bg-gray-50 cursor-pointer transition-colors active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus className="size-3 text-gray-500" />
            </button>
            
            <div className="px-4 text-sm font-bold min-w-[35px] flex items-center justify-center">
              {isLoading ? <Spinner className="size-3" /> : product.count}
            </div>

            <button
              disabled={isLoading}
              onClick={() => updateProductCount(product.product._id, product.count + 1)}
              className="p-2 cursor-pointer hover:bg-gray-50 transition-colors active:scale-90 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Plus className="size-3 text-gray-500" />
            </button>
          </div>

          <button
            disabled={isLoading}
            onClick={() => deleteProduct(product.product._id)}
            className="text-red-500 cursor-pointer text-[10px] font-black tracking-widest hover:text-red-700 transition-colors flex items-center gap-1.5 uppercase"
          >
            {isLoading ? <Spinner className="size-3 text-red-500" /> : (
              <>
                <Trash2 className="size-3.5" />
                <span>Remove</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}