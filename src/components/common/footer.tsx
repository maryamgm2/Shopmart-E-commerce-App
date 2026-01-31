"use client"
import Link from 'next/link'
import React from 'react'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'


export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-lg">
                                S
                            </div>
                            <span className="text-xl font-bold tracking-tight">ShopMart</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Your one-stop destination for the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                <MapPin className="size-4" />
                                <span>123 Shop Street, Octoper City, DC 12345</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                <Phone className="size-4" />
                                <span>(+20) 01093333333</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 text-sm">
                                <Mail className="size-4" />
                                <span>support@shopmart.com</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-black transition-colors">Electronics</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Fashion</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Home & Garden</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Sports</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Deals</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Customer Service</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-black transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Track Your Order</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Size Guide</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6">About</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-black transition-colors">About ShopMart</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Press</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Investor Relations</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Sustainability</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider mb-6">Policies</h4>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Cookie Policy</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Shipping Policy</Link></li>
                            <li><Link href="#" className="hover:text-black transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} ShopMart Inc. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="size-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="size-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="size-5" /></Link>
                        <Link href="#" className="text-gray-400 hover:text-black transition-colors"><Linkedin className="size-5" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}