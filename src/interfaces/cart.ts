import { ProductI } from "./products";

export interface CartI {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: CartDataI;
}

export interface CartDataI {
  _id: string;
  cartOwner: string;
  products: CartProductI[]; 
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartProductI {
  count: number;
  _id: string;
  product: ProductI;
  price: number;
}

export interface ShippingAddress {
    details: string;
    phone: string;
    city: string;
}


export interface CartResponse {
    status: string;
    message?: string;
    numOfCartItems?: number;
    data?: CartDataI;
    session?: {
        url: string;
    };
}