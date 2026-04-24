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
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons"; // ✅ added icon

export default function Cart() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  // 🔥 Total Price Calculation
  const totalPrice = cartItems.reduce((total, item) => {
    const priceValue = parseInt(item.price.replace(/[^0-9]/g, ""));
    return total + priceValue * (item.quantity || 1);
  }, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>
          🛒 Start shopping to fill your cart 🎉
        </Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />

                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price}</Text>

                  {/* 🔥 QUANTITY CONTROLS */}
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantity(item.id, (item.quantity || 1) - 1)
                      }
                    >
                      <Text style={styles.qtyText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.qtyValue}>
                      {item.quantity || 1}
                    </Text>

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                    >
                      <Text style={styles.qtyText}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* ✅ ACTION ROW (CHECKOUT + DELETE) */}
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.checkoutBtn}
                      onPress={() => router.push("/checkout")}
                    >
                      <Text style={styles.checkoutText}>
                        Proceed to Checkout
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                    >
                      <MaterialIcons name="delete" size={26} color="red" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          {/* 🔥 TOTAL PRICE */}
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Total: Rs {totalPrice}</Text>
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
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  price: {
    color: "#ccc",
    marginBottom: 5,
  },

  /* 🔥 QUANTITY */
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  qtyBtn: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qtyText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  qtyValue: {
    color: "#FFD700",
    marginHorizontal: 10,
    fontWeight: "bold",
  },

  /* ✅ ACTION ROW */
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  checkoutBtn: {
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  checkoutText: {
    fontWeight: "bold",
    textAlign: "center",
  },

  /* 🔥 TOTAL */
  totalBox: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  totalText: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
  },
});