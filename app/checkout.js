import { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { useRouter } from "expo-router";

export default function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { placeOrder } = useContext(OrderContext);
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = () => {
    if (!name || !phone || !address || !city) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    const orderData = {
      name,
      phone,
      address,
      city,
      paymentMethod,
    };

    placeOrder(cartItems, orderData);
    setCartItems([]);

    // 🔥 SUCCESS FLOW
    router.replace("/order-success");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#999"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
      />

      <TextInput
        placeholder="Enter Address"
        placeholderTextColor="#999"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="City"
        placeholderTextColor="#999"
        style={styles.input}
        value={city}
        onChangeText={setCity}
      />

      {/* PAYMENT */}
      <Text style={styles.sectionTitle}>Payment Method</Text>

      <TouchableOpacity
        style={styles.paymentCard}
        onPress={() => setPaymentMethod("COD")}
      >
        <FontAwesome5 name="money-bill-wave" size={18} color="#FFD700" />
        <Text style={styles.paymentText}>Cash on Delivery</Text>
        {paymentMethod === "COD" && (
          <MaterialIcons name="check-circle" size={22} color="#FFD700" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentCard}
        onPress={() => setPaymentMethod("ONLINE")}
      >
        <FontAwesome5 name="credit-card" size={18} color="#FFD700" />
        <Text style={styles.paymentText}>Online Payment</Text>
        {paymentMethod === "ONLINE" && (
          <MaterialIcons name="check-circle" size={22} color="#FFD700" />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.paymentCard}
        onPress={() => setPaymentMethod("BANK")}
      >
        <MaterialIcons name="account-balance" size={20} color="#FFD700" />
        <Text style={styles.paymentText}>Bank Transfer</Text>
        {paymentMethod === "BANK" && (
          <MaterialIcons name="check-circle" size={22} color="#FFD700" />
        )}
      </TouchableOpacity>

      {/* PLACE ORDER */}
      <TouchableOpacity style={styles.button} onPress={handlePlaceOrder}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#111",
    color: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  paymentText: {
    color: "#fff",
    flex: 1,
    marginLeft: 10,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});