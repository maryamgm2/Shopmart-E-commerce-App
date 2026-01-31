import { ProductI } from "@/interfaces/products";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import AddCartButton from "@/components/products/addToCartBtn";
import WishlistBtn from "@/components/products/wishlistBtn";

export default async function ProductDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { productId } = await params;

  const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
  const { data: product } = await response.json() as { data: ProductI };

  const relatedRes = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}&limit=5`);
  const { data: relatedData } = await relatedRes.json() as { data: ProductI[] };
  const relatedProducts = relatedData.filter(p => p._id !== productId).slice(0, 4);

  return (
    <main className="bg-[#F9FAFB] min-h-screen pb-20 font-sans text-left">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <Breadcrumb className="mb-10">
          <BreadcrumbList className="text-gray-400 text-sm ">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products" className="hover:text-black transition-colors">Products</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-black">Product Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white border border-gray-100 rounded-[32px] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-24">
          
          <div className="w-full lg:max-w-md mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {product.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-square flex items-center justify-center bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-50">
                      <Image 
                        width={500} 
                        height={500} 
                        src={img} 
                        alt={product.title} 
                        className="object-contain w-full h-full p-6 transition-transform hover:scale-105" 
                        priority={index === 0} 
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex flex-col text-left pt-2">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded-md">
                  {product.brand.name}
                </span>
                <span className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
                  {product.category.name}
                </span>
              </div>
              
              <h1 className="text-xl md:text-2xl font-black text-black mb-2 tracking-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} size={12} className={i < Math.floor(product.ratingsAverage) ? "text-yellow-400 fill-yellow-400" : "text-gray-100 fill-gray-100"} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                  {product.ratingsAverage} Rating
                </span>
              </div>
            </div>

            <p className="text-gray-500 text-xs leading-relaxed mb-6 border-l-2 border-gray-100 pl-4 py-1 italic">
              {product.description.split(" ").slice(0, 30).join(" ")}...
            </p>

            <div className="mb-8 p-4 bg-gray-50/50 rounded-2xl border border-gray-50 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-[9px] font-black uppercase mb-1">Price</p>
                <h2 className="text-2xl font-black text-black tracking-tighter">
                  EGP {product.price.toLocaleString()}
                </h2>
              </div>
              <div className="text-right">
                 <span className="text-[10px] text-[#10B981] font-bold bg-green-50 px-2 py-1 rounded-lg uppercase">
                   In Stock
                 </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <AddCartButton prodId={product._id} />
              </div>
              <div className="w-12">
                <WishlistBtn productId={product._id} />
              </div>
            </div>
          </div>
        </div>

        <section className="px-2 text-left">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl font-black text-black tracking-tight mb-2 uppercase">Related Products</h2>
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest">From the same collection</p>
            </div>
            <Link href={`/products?category=${product.category._id}`} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:gap-3 transition-all border-b-2 border-black pb-1">
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {relatedProducts.map((item) => (
              <div key={item._id} className="group bg-white border border-gray-100 rounded-[32px] p-6 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] relative">
                <Link href={`/products/${item._id}`}>
                  <div className="aspect-[4/5] rounded-[24px] bg-gray-50/50 mb-6 overflow-hidden relative flex items-center justify-center">
                    <Image 
                      src={item.imageCover} 
                      alt={item.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain p-8 transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>
                  
                  <div className="px-1 space-y-1">
                    <h3 className="font-black text-base text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {item.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <p className="text-[11px] text-blue-600 font-bold uppercase tracking-[0.1em]">
                      {item.brand.name}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <p className="font-black text-black text-lg tracking-tight">EGP {item.price}</p>
                      <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                        <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-black text-gray-400">{item.ratingsAverage}</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                   <WishlistBtn productId={item._id} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}