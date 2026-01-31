import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"
import { DecodedToken } from "@/interfaces/decodedToken"

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login"
    },
    providers: [
        Credentials({

            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {

                const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const data = await response.json()
                console.log(data);

                if (data.message == "success") {
                    const decodedToken = jwtDecode<DecodedToken>(data.token)
                    console.log(decodedToken);

                    return {
                        id: decodedToken.id,
                        user: data.user,
                        token: data.token,
                    }
                } else {
                    throw new Error(data.message || "Wrong Credentials")

                }


            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user.user;
                token.token = user.token
            }
            return token
        },
        async session({ session, token }) {
            if (token) {
                session.user=token.user
            }
            return session
        }
    }


}