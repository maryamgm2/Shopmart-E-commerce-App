import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

  export interface UserDataI {
    name: string;
    email: string;
    role: string;
  }

  interface User {
    id: string;
    user: UserDataI;
    token: string;
  }
}

declare module "next-auth/jwt" {
  import { UserDataI } from "next-auth";

  interface JWT {
    user: UserDataI;    
    idToken?: string;
  }
}