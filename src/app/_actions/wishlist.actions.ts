"use server"
import { getUserToken } from "@/lib/auth";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

export async function addToWishlist(productId: string) {
    const token = await getUserToken();
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "token": token || "" 
        },
        body: JSON.stringify({ productId })
    });
    return await response.json();
}

export async function removeFromWishlist(productId: string) {
    const token = await getUserToken();
    const response = await fetch(`${BASE_URL}/${productId}`, {
        method: "DELETE",
        headers: { "token": token || "" }
    });
    return await response.json();
}

export async function getWishlist() {
    const token = await getUserToken();
    const response = await fetch(BASE_URL, {
        method: "GET",
        headers: { "token": token || "" },
        cache: 'no-store'
    });
    return await response.json();
}