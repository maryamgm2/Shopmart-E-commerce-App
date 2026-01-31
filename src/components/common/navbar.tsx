"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { ShoppingCart, UserRound, Menu, Loader2, Heart } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { signOut, useSession } from 'next-auth/react'
import { useCartContext } from "@/provider/cartprovider" 
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    
    const { noOfCartItems, loading } = useCartContext()

    const linkStyle = (path: string) => 
        `px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
            pathname === path 
            ? 'bg-black text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`

    const NavLinks = () => (
        <>
            <Link href="/products" className={linkStyle('/products')}>Products</Link>
            <Link href="/brands" className={linkStyle('/brands')}>Brands</Link>
            <Link href="/categories" className={linkStyle('/categories')}>Categories</Link>
        </>
    )

    return (
        <nav className='bg-white border-b border-gray-100 px-5 py-3 sticky top-0 z-50'>
            <div className="max-w-7xl mx-auto flex items-center justify-between relative h-10">
                
                <div className="flex items-center gap-2 z-10">
                    <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-lg">
                        S
                    </div>
                    <Link href="/">
                        <span className="text-lg font-bold tracking-tight text-black">ShopMart</span>
                    </Link>
                </div>

                <div className="hidden md:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
                    <NavLinks />
                </div>

                <div className="flex items-center gap-2 z-10">
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger className='outline-none flex items-center gap-1 p-1 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer text-left'>
                            {session && (
                                <span className='hidden lg:block text-sm font-bold text-gray-900 leading-none mr-1'>
                                    Welcome, {session.user?.name}
                                </span>
                            )}
                            <UserRound className='size-5 text-gray-700' />
                        </DropdownMenuTrigger>
                        
                        <DropdownMenuContent align="end" className="w-48 font-sans">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {session ? (
                                <>
                                    <Link href="/allorders">
                                        <DropdownMenuItem className='cursor-pointer font-medium flex items-center gap-2'>
                                            Your Orders
                                        </DropdownMenuItem>
                                    </Link>
                    
                                    <Link href="/wishlist">
                                        <DropdownMenuItem className='cursor-pointer font-medium flex items-center justify-between'>
                                            Wishlist <Heart className="size-3.5 text-black fill-red-500/10\\" />
                                        </DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className='text-red-600 cursor-pointer font-bold' onClick={() => signOut({ callbackUrl: "/login" })}>
                                        Logout
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <Link href="/login"><DropdownMenuItem className='cursor-pointer font-medium text-black'>Login</DropdownMenuItem></Link>
                                    <Link href="/register"><DropdownMenuItem className='cursor-pointer font-medium text-black'>Register</DropdownMenuItem></Link>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Link href="/cart" className='relative p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center cursor-pointer'>
                        {loading ? (
                            <div className="absolute top-1 right-1 bg-black rounded-full p-[2px] border border-white">
                                <Loader2 className="h-2 w-2 text-white animate-spin" />
                            </div>
                        ) : (
                            noOfCartItems > 0 && (
                                <Badge className="h-4 w-4 rounded-full absolute top-1 right-1 flex items-center justify-center bg-black text-white p-0 text-[10px] font-bold border-2 border-white leading-none shadow-sm transition-all animate-in zoom-in">
                                    {noOfCartItems}
                                </Badge>
                            )
                        )}
                        <ShoppingCart className='size-5 text-gray-700' />
                    </Link>

                    <div className="md:hidden flex items-center ml-1">
                        <Sheet>
                            <SheetTrigger className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Menu className="size-6 text-gray-700" />
                            </SheetTrigger>
                            <SheetContent side="right">
                                <div className="flex flex-col gap-6 mt-12 text-left px-4">
                                    <NavLinks />
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}