import { Category } from "@/interfaces/category";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default async function Categories() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
  const data = await response.json();
  const { data: categories } = data as { data: Category[] };

  return (
    <main className="bg-gray-50 min-h-screen py-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h1 className="text-2xl font-bold text-gray-900 mb-8 px-2 tracking-tight">
          All Categories
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((cat, index) => (
            <Link href={`/categories/${cat._id}`} key={cat._id}>
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 border-none bg-white p-4 flex flex-col items-center cursor-pointer rounded-2xl">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-gray-100/50">
                  <Image
                    fill
                    src={cat.image}
                    alt={cat.name}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    priority={index < 5}
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-center text-sm uppercase tracking-wide">
                  {cat.name}
                </h3>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}