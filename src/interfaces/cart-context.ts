import { CartProductI } from "./cart";

export interface CartContextI {
  noOfCartItems: number;
  products: CartProductI[];
  totalPrice: number;
  loading: boolean;
  handleCart: () => Promise<void>;
}