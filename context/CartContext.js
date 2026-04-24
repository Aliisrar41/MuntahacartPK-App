import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);

      if (existingItem) {
        
        return prev.map((p) =>
          p.id === item.id
            ? { ...p, quantity: (p.quantity || 1) + 1 }
            : p
        );
      }

      // 🔥 New item → quantity = 1 set
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // ✅ REMOVE ITEM
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ✅ UPDATE QUANTITY
  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: quantity < 1 ? 1 : quantity,
            }
          : item
      )
    );
  };

  // 🔥 NEW FIX (IMPORTANT)
  // Checkout needs this
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, 
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart, 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}