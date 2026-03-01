import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    return sum + priceNum;
  }, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>🛒 Start shopping to fill your cart 🎉🛍️</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
                    {item.name}
                  </Text>
                  <Text style={styles.price}>{item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeFromCart(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Total & Checkout */}
          <View style={styles.checkoutContainer}>
            <Text style={styles.totalText}>Total: Rs {totalPrice}</Text>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  empty: {
    color: "#FFD700",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
  price: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 4,
  },
  removeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#333",
    borderRadius: 6,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
    fontSize: 12,
  },
  checkoutContainer: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  totalText: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});