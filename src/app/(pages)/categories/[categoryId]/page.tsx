import { Category } from "@/interfaces/category";
import { Subcategory } from "@/interfaces/subCatgory";
import Image from "next/image";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function getCategoryData(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  const data = await res.json();
  return data.data as Category;
}

async function getSubCategories(id: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
  const data = await res.json();
  return data.data as Subcategory[];
}

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ categoryId: string }>; 
}) {
  const resolvedParams = await params;
  const categoryId = resolvedParams.categoryId; 

  const [category, subcategories] = await Promise.all([
    getCategoryData(categoryId),
    getSubCategories(categoryId),
  ]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-4">
        <p className="text-xl font-bold font-mono text-black uppercase tracking-tighter text-center px-4">Category not found</p>
        <Link href="/categories" className="text-sm font-bold text-blue-600 hover:underline">
          &larr; Back to all categories
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <Breadcrumb className="mb-12">
          <BreadcrumbList className="text-gray-400 text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-black transition-colors">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/categories" className="hover:text-black transition-colors">Categories</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-black">Category Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white border border-gray-100 rounded-[32px] p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="relative aspect-square w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-sm border border-gray-50 bg-gray-50">
            <Image 
              fill 
              src={category.image} 
              alt={category.name} 
              className="object-cover" 
              sizes="(max-width: 768px) 100vw, 400px"
              priority 
            />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-gray-300 uppercase tracking-[0.2em] mb-3 block">Exclusive Collection</span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 uppercase tracking-tighter">{category.name}</h1>
            <div className="h-1.5 w-20 bg-black rounded-full mb-6"></div>
            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mb-8">Discover quality and style in the {category.name} section.</p>
            
            <Link href={`/products?category=${category._id}`} className="inline-flex items-center justify-center bg-black text-white transition-all duration-300 rounded-lg py-6 border border-black hover:bg-white hover:text-black hover:shadow-md active h-12 px-8 font-medium w-fit">
                View All {category.name} Products
            </Link>
          </div>
        </div>

        <div className="mb-8 flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-black tracking-tight uppercase">Subcategories</h2>
            <span className="text-sm font-bold text-gray-300 italic">({subcategories?.length || 0} ITEMS FOUND)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subcategories?.map((sub) => (
            <Link href={`/products?subcategory=${sub._id}`} key={sub._id} className="group">
              <div className="bg-white border border-gray-100 rounded-[24px] p-8 text-center hover:border-black hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer h-full flex flex-col items-center justify-center">
                <span className="font-bold text-gray-800 group-hover:text-black text-lg transition-colors">{sub.name}</span>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">View Products &rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}