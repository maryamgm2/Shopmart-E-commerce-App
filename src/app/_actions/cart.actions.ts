"use server"

import { getUserToken } from "@/lib/auth"
import { CheckoutValues } from "@/schema/checkout.schema" 
import { revalidatePath } from "next/cache"

const baseUrl = process.env.NEXTAUTH_URL ;

export async function addToCart(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
            token: token,
            "Content-type": "application/json"
        }
    })

    revalidatePath('/cart')
    return await response.json()
}

export async function getLoggedUserCart() {
    const token = await getUserToken()
    
    if (!token) {
        return null; 
    }

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
            token: token,
            "Content-type": "application/json"
        },
        next: { revalidate: 0 } 
    })

    return await response.json()
}

export async function deleteCartProduct(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-type": "application/json"
        }
    })

    revalidatePath('/cart')
    return await response.json()
}

export async function updateCartProductCount(productId: string, newCount: number) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ count: newCount }),
        headers: {
            token: token,
            "Content-type": "application/json"
        }
    })

    revalidatePath('/cart')
    return await response.json()
}

export async function clearUserCart() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you must be logged in to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-type": "application/json"
        }
    })

    revalidatePath('/cart')
    return await response.json()
}

export async function checkoutUser(formData: CheckoutValues, cartId: string) {
    const token = await getUserToken();
    if (!token) {
        throw new Error("you are not authorized to do this action");
    }


    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`, {
        method: "POST",
        headers: {
            "token": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shippingAddress: formData 
        })
    });

    return await response.json();
}

export async function createCashOrder(formData: CheckoutValues, cartId: string) {
    const token = await getUserToken(); 
    if (!token) throw new Error("Unauthorized");

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
        method: "POST",
        headers: {
            "token": token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            shippingAddress: formData 
        })
    });

    revalidatePath('/orders')
    return await response.json();
}