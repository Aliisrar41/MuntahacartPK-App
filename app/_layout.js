import { Slot } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { OrderProvider } from "../context/OrderContext";

export default function RootLayout() {
  return (
    <OrderProvider> 
      <WishlistProvider> 
        <CartProvider> 
          <Slot /> 
        </CartProvider>
      </WishlistProvider>
    </OrderProvider>
  );
}