import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  // 🔥 Place Order
  const placeOrder = (cartItems, userData) => {
    const newOrder = {
      id: Date.now().toString(),
      items: cartItems,
      user: userData,
      date: new Date().toLocaleString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}