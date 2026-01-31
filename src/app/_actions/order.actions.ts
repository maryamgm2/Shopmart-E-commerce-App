"use server"
import { getUserToken } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/interfaces/auth";

const ORDERS_URL = "https://ecommerce.routemisr.com/api/v1/orders/user";

export async function getUserOrders() {
    const token = await getUserToken();
    
    if (!token) return null;

    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.id; 

        const response = await fetch(`${ORDERS_URL}/${userId}`, {
            method: "GET",
            cache: 'no-store' 
        });

        if (!response.ok) return null;
        
        const data = await response.json();

        return Array.isArray(data) ? data.reverse() : data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Orders Fetch Error:", error.message);
        } else {
            console.error("Orders Fetch Error:", error);
        }
        return null;
    }
}