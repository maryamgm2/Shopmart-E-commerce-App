import { ProductI } from "@/interfaces/products";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import Link from "next/link";
import AddCartButton from "@/components/products/addToCartBtn";
import WishlistBtn from "@/components/products/wishlistBtn";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{
    brand?: string;
    category?: string;
    subcategory?: string;
  }>;
}) {
  const { brand, category, subcategory } = await searchParams;

  const apiUrl = `https://ecommerce.routemisr.com/api/v1/products`;
  const params = new URLSearchParams();

  if (brand) params.append("brand", brand);
  if (category) params.append("category", category);
  if (subcategory) params.append("subcategory[in]", subcategory);

  const finalUrl = params.toString()
    ? `${apiUrl}?${params.toString()}`
    : apiUrl;

  const response = await fetch(finalUrl);
  const data = await response.json();
  const { data: products } = data as { data: ProductI[] };

  return (
    <main className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 px-2">
          {brand && products.length > 0 && (
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
              Products for {products[0].brand.name}
            </h2>
          )}
          {category && products.length > 0 && (
            <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
              Explore {products[0].category.name} Collection
            </h2>
          )}
          {!brand && !category && !subcategory && (
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight text-left">
              All Products
            </h1>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <Card
              key={product._id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white rounded-2xl"
            >
              <Link href={`/products/${product._id}`}>
                <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
                  <Image
                    fill
                    src={product.imageCover}
                    alt={product.title}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={index < 4} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <CardHeader className="p-4 pb-0">
                  <div className="flex justify-between items-start text-left">
                    <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                      {product.brand.name}
                    </p>
                  </div>
                  <CardTitle className="text-sm font-bold line-clamp-1 mt-1 text-gray-800 group-hover:text-blue-600 transition-colors text-left">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </CardTitle>
                  <p className="text-[10px] text-gray-400 font-medium text-left">
                    {product.category.name}
                  </p>
                </CardHeader>

                <CardContent className="p-4 pt-2">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${i < Math.floor(product.ratingsAverage) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">
                      ({product.ratingsAverage})
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-xs font-bold text-gray-400 uppercase">
                      EGP
                    </span>
                    <span className="text-lg font-black text-gray-900">
                      {product.price.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Link>

              <CardFooter className="p-4 pt-0 flex items-center gap-2">
                <div className="flex-[4]">
                  <AddCartButton prodId={product._id} />
                </div>
                <WishlistBtn productId={product._id} />
              </CardFooter>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[32px] border border-dashed border-gray-200">
            <div className="bg-gray-50 size-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="text-gray-200 size-10" />
            </div>
            <p className="text-gray-400 font-medium italic">
              No products match your current selection.
            </p>
            <Link
              href="/products"
              className="text-blue-600 font-bold mt-4 inline-block hover:underline text-sm"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}