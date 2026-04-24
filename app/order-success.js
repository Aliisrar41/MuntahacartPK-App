import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={90} color="#FFD700" />

      <Text style={styles.title}>Order Placed Successfully!</Text>

      <Text style={styles.subtitle}>
        Your order has been confirmed 🎉
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/orders")}
      >
        <Text style={styles.buttonText}>View Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/")}>
        <Text style={styles.home}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  subtitle: {
    color: "#ccc",
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    width: "80%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  home: {
    color: "#FFD700",
    marginTop: 15,
    fontWeight: "bold",
  },
});