"use client";
import { getLoggedUserCart } from '@/app/_actions/cart.actions';
import { CartI, CartProductI } from '@/interfaces/cart';
import { CartContextI } from '@/interfaces/cart-context'; 
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export const cartContext = createContext<CartContextI | undefined>(undefined);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [noOfCartItems, setNoOfCartItems] = useState(0);
  const [products, setProducts] = useState<CartProductI[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleCart = useCallback(async () => {
    try {
      setLoading(true);
      const data: CartI = await getLoggedUserCart();
      
      if (data && data.status === "success") {
        const total = data.data.products.reduce((accu, prod) => prod.count + accu, 0);
        
        setNoOfCartItems(total);
        setProducts(data.data.products);
        setTotalPrice(data.data.totalCartPrice);
      } else {
        setNoOfCartItems(0);
        setProducts([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []); 

  useEffect(() => {
    handleCart();
  }, [handleCart]);

  return (
    <cartContext.Provider value={{ noOfCartItems, products, totalPrice, loading, handleCart }}>
      {children}
    </cartContext.Provider>
  );
}

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};