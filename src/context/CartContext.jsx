import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [validatedCart, setValidatedCart] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addItem = (productId) => {
    if (!productId) {
      console.error("Invalid productId:", productId);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId);

      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { productId, quantity: 1 }];
    });
  };

  const removeItem = (productId, removeAll = false) => {
    setCart((prev) => {
      if (removeAll) {
        return prev.filter((i) => i.productId !== productId);
      }

      return prev
        .map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  const validateCart = async (currentCart) => {
    try {
      const res = await api.post("/cart/validate", currentCart);
      setValidatedCart(res.data);
      console.log(res.data);
    } catch {
      setValidatedCart([]);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      validateCart(cart);
    }, 300);

    return () => clearTimeout(timeout);
  }, [cart]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const totalPrice = validatedCart.reduce((sum, item) => {
    if (item.available !== true) return sum;
    return sum + item.price * item.quantity;
  }, 0);

  const getCheckoutPayload = () =>
    cart.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
    }));

  return (
    <CartContext.Provider
      value={{
        cart,
        validatedCart,
        addItem,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        getCheckoutPayload,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
