import { authOptions } from '@/lib/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BrandI } from "@/interfaces/brand"; 

export default async function Brands() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect("/login")
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const data = await response.json();
  const { data: brands } = data as { data: BrandI[] };

  return (
    <main className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 px-2">
          {/* الحفاظ على الـ UI الأصلي */}
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Brands</h1>
          <p className="text-sm text-gray-500 mt-1">Explore our partner brands</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {brands.map((brand, index) => (
            <Link href={`/brands/${brand._id}`} key={brand._id} className="block">
              <Card
                className="group overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100 bg-white aspect-square flex flex-col items-center justify-center p-6 cursor-pointer rounded-2xl"
              >
                <div className="relative w-full h-full">
                  <Image
                    fill
                    src={brand.image}
                    alt={brand.name}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                    priority={index < 6}
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="mt-3">
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide text-center">
                    {brand.name}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}