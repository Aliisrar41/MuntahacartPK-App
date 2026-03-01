import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Success() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <Ionicons name="checkmark-circle" size={80} color="#00ff88" />
      <Text style={{ color: "#fff", fontSize: 20, marginTop: 20 }}>
        Order Placed Successfully!
      </Text>
    </View>
  );
}