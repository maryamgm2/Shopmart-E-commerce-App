"use client"; 
import React, { useEffect, useState } from "react";
import { Heart, Trash2, Loader2 } from "lucide-react";
import { getWishlist } from "@/app/_actions/wishlist.actions"; 
import { useWishlist } from "@/provider/wishlistprovider";
import AddCartButton from "@/components/products/addToCartBtn";
import Link from "next/link";
import Image from "next/image";
import { WishlistProduct } from "@/interfaces/wishlist";

export default function WishlistPage() {
    const [products, setProducts] = useState<WishlistProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    
    const { toggleWishlist } = useWishlist() as { 
        toggleWishlist: (id: string) => Promise<void> 
    }; 

    async function fetchWishlistData() {
        try {
            setLoading(true);
            const res = await getWishlist();
            if (res.status === "success") {
                setProducts(res.data || []);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchWishlistData();
    }, []);

    async function handleRemove(productId: string) {
        try {
            setDeletingId(productId); 
            await toggleWishlist(productId);
            setProducts((prev) => prev.filter((item) => item._id !== productId));
        } catch (error) {
            console.error("Error removing item:", error);
        } finally {
            setDeletingId(null);
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="size-10 animate-spin text-gray-200" />
                <p className="text-gray-400 mt-4 italic">Loading your favorites...</p>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] font-sans">
                <div className="bg-gray-50 p-6 rounded-full mb-4">
                    <Heart className="size-12 text-gray-200" />
                </div>
                <h2 className="text-2xl font-bold text-gray-400 text-left">Your wishlist is empty</h2>
                <Link href="/products" className="text-black font-bold underline mt-4">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F9FAFB] min-h-screen py-12 px-4 font-sans text-left">
            <main className="max-w-5xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-black tracking-tight text-left">My Wishlist</h1>
                    <p className="text-gray-500 mt-1 font-medium text-left">{products.length} items saved</p>
                </div>
                
                <div className="space-y-4">
                    {products.map((product: WishlistProduct) => (
                        <div 
                            key={product._id} 
                            className="bg-white border border-gray-100 rounded-[32px] p-6 flex flex-col md:flex-row items-center gap-6 shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-50 flex items-center justify-center">
                                <Image 
                                    src={product.imageCover} 
                                    alt={product.title}
                                    fill
                                    className="object-contain p-2"
                                    sizes="96px"
                                />
                            </div>
                            
                            <div className="flex-1 text-center md:text-left min-w-0">
                                <h3 className="font-bold text-lg text-black truncate">{product.title}</h3>
                                <p className="text-[#10B981] font-black text-xl mt-2">{product.price.toLocaleString()} EGP</p>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <div className="flex-1 md:w-52">
                                    <AddCartButton prodId={product._id} />
                                </div>
                                
                                <button 
                                    onClick={() => handleRemove(product._id)}
                                    disabled={deletingId === product._id}
                                    className="p-3 text-red-500 hover:bg-red-50 rounded-2xl border border-red-50 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                                >
                                    {deletingId === product._id ? (
                                        <Loader2 className="size-5 animate-spin" />
                                    ) : (
                                        <Trash2 className="size-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}