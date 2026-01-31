import { Brand } from "@/interfaces/brand";
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
import { ShoppingCart } from "lucide-react"; 
import Image from "next/image";

export default async function BrandDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { brandsId } = await params;
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${brandsId}`,
  );
  const data = await response.json();
  const { data: brand } = data as { data: Brand };

  return (
    <main className="bg-[#F9FAFB] min-h-screen font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <Breadcrumb className="mb-12">
          <BreadcrumbList className="text-gray-400 text-sm ">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/brands" className="hover:text-black transition-colors">Brands</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-black">Brand Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="w-full flex items-center justify-center bg-gray-50/50 rounded-2xl p-8 aspect-[4/3]">
            <div className="relative w-full h-full max-w-[400px]">
              <Image
                fill
                src={brand.image}
                alt={brand.name}
                className="object-contain transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <div className="mb-6">
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-3 block bg-blue-50 w-fit px-3 py-1 rounded-md">
                Official Brand
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-black mb-2 tracking-tighter uppercase">
                {brand.name}
              </h1>
              <span className="text-xs text-gray-300 font-bold tracking-widest uppercase">
                {brand.slug}
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-lg border-l-2 border-gray-100 pl-4 italic font-medium">
              Explore the latest collections from {brand.name}. Shop high-quality products directly from the official brand store on ShopMart.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href={`/products?brand=${brand._id}`} className="w-full">
                <button className="w-full h-14 bg-black text-white rounded-2xl flex items-center justify-center gap-3 font-semibold cursor-pointer text-sm uppercase tracking-widest transition-all hover:bg-black/90 active:scale-95 shadow-xl shadow-black/10">
                  <ShoppingCart className="size-5" />
                  View All Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}