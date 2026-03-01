import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Checkout() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 20 }}>
      <Text style={{ color: "#FFD700", fontSize: 22, marginBottom: 20 }}>
        Checkout
      </Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor="#888"
        style={{ backgroundColor: "#111", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 15 }}
      />

      <TextInput
        placeholder="Address"
        placeholderTextColor="#888"
        style={{ backgroundColor: "#111", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 20 }}
      />

      <TouchableOpacity
        style={{ backgroundColor: "#FFD700", padding: 12, borderRadius: 10 }}
        onPress={() => router.push("/success")}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Place Order
        </Text>
      </TouchableOpacity>
    </View>
  );
}