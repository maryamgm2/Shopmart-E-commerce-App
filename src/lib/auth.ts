import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const cookieStore = await cookies();
    
    const tokenName = process.env.NODE_ENV === "production" 
        ? "__Secure-next-auth.session-token" 
        : "next-auth.session-token";

    const decodedToken = cookieStore.get(tokenName)?.value;

    if (!decodedToken) return null;

    const token = await decode({
        token: decodedToken,
        secret: String(process.env.NEXTAUTH_SECRET)
    });

    return (token?.token as string) || (token?.userToken as string) || null;
}