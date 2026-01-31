"use client";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clearUserCart, getLoggedUserCart } from "@/app/_actions/cart.actions";
import CartItem from "@/components/cart/cart-item";
import { CartI, CartProductI } from "@/interfaces/cart";
import { toast } from "sonner";
import { useCartContext } from "@/provider/cartprovider";
import { Checkout } from "@/components/cart/checkout";

export default function Cart() {
  const {
    handleCart,
    totalPrice,
    noOfCartItems,
    loading: contextLoading,
  } = useCartContext();

  const [products, setProducts] = useState<CartProductI[]>([]);
  const [cartId, setCartId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);

  const getUserCart = useCallback(async () => {
    try {
      setLoading(true);
      const data: CartI = await getLoggedUserCart();
      if (data.status === "success") {
        setProducts(data.data.products);
        setCartId(data.data._id);
        await handleCart();
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  }, [handleCart]);

  async function clearCart() {
    try {
      setIsClearing(true);
      const response = await clearUserCart();
      if (response.message === "success") {
        toast.success("Cart Cleared Successfully", { position: "top-center" });
        setProducts([]);
        setCartId("");
        await handleCart();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Occurred while clearing cart");
    } finally {
      setIsClearing(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans">
      <main className="max-w-7xl mx-auto px-4 py-12 text-left">
        <h1 className="text-3xl font-bold mb-2 text-black tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-gray-500 mb-10 text-left font-medium">
          {noOfCartItems} items in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="bg-white p-10 rounded-2xl border border-gray-100 text-center flex flex-col items-center gap-3">
                <Loader2 className="size-6 animate-spin text-gray-400" />
                <p className="italic text-gray-400">Loading your items...</p>
              </div>
            ) : products.length > 0 ? (
              products.map((prod) => (
                <CartItem
                  key={prod._id}
                  product={prod}
                  setProducts={async (newProds) => {
                    setProducts(newProds);
                    await handleCart();
                  }}
                />
              ))
            ) : (
              <div className="bg-white p-16 rounded-[32px] border border-dashed border-gray-200 text-center flex flex-col items-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                  <ShoppingBag className="size-8 text-gray-300" />
                </div>
                <p className="text-gray-500 text-lg font-medium">
                  Your cart is Empty.
                </p>
                <Link
                  href="/products"
                  className="text-black font-bold underline mt-4 block"
                >
                  Explore Products
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-6 sticky top-8">
            <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] text-left">
              <h2 className="text-xl font-bold mb-6 text-black border-b border-gray-50 pb-4 tracking-tight">
                Order Summary
              </h2>

              <div className="space-y-4 font-medium">
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>
                    Subtotal ({contextLoading ? "..." : noOfCartItems} items)
                  </span>
                  <span className="font-bold text-black text-base">
                    {contextLoading ? (
                      <span className="h-4 w-16 bg-gray-100 animate-pulse rounded block"></span>
                    ) : (
                      `EGP ${totalPrice.toLocaleString()}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-500 text-sm">
                  <span>Shipping</span>
                  <span className="text-[#10B981] font-bold uppercase tracking-widest text-[10px]">
                    Free
                  </span>
                </div>
                <hr className="my-6 border-gray-50" />
                <div className="flex justify-between items-center text-2xl font-black text-black">
                  <span>Total</span>
                  <span>
                    {contextLoading ? (
                      <span className="h-8 w-24 bg-gray-100 animate-pulse rounded block"></span>
                    ) : (
                      `EGP ${totalPrice.toLocaleString()}`
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  variant="outline"
                  className="w-full py-7 rounded-2xl border-gray-200 font-bold text-gray-700"
                  asChild
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>

                <div className="w-full">
                  <Checkout cartId={cartId} setProducts={setProducts} />
                </div>
              </div>
            </div>

            {products.length > 0 && (
              <div className="flex justify-end pr-2">
                <button
                  disabled={isClearing || contextLoading}
                  onClick={clearCart}
                  className="flex cursor-pointer items-center gap-2 text-[#ff1616] text-xs font-bold uppercase tracking-widest border border-red-50 px-5 py-2.5 rounded-xl hover:bg-red-50 disabled:opacity-50"
                >
                  {isClearing ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  {isClearing ? "Clearing..." : "clear cart"}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
