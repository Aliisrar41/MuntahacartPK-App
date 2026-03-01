import { Slot } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function RootLayout() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Slot />
      </CartProvider>
    </WishlistProvider>
  );
}