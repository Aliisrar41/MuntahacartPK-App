import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

const products = [
  {
    id: "1",
    name: "Running Shoes",
    price: "Rs 6000",
    oldPrice: "Rs 8000",
    description: "High quality running shoes designed for comfort and durability. Perfect for daily workouts and outdoor running.",
    image: require("../../assets/images/shoes.jpeg"),
  },
  {
    id: "2",
    name: "Luxury Watch",
    price: "Rs 4500",
    oldPrice: "Rs 6000",
    description: "Premium luxury watch crafted with elegant design and modern technology.",
    image: require("../../assets/images/watch.jpeg"),
  },
  {
    id: "3",
    name: "Leather Wallet",
    price: "Rs 2500",
    oldPrice: "Rs 3500",
    description: "High-quality genuine leather wallet with a sleek and modern finish.",
    image: require("../../assets/images/wallet.jpeg"),
  },
  {
    id: "4",
    name: "Women Luxry Bag",
    price: "Rs 999",
    oldPrice: "Rs 1999",
    description: "Elegant luxury bag for women with premium materials and stylish design.",
    image: require("../../assets/images/bag.jpg"),
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Image source={product.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>

        

        <View style={styles.priceRow}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.oldPrice}>{product.oldPrice}</Text>
        </View>

        <Text style={styles.sectionTitle}>Product Details</Text>
        <Text style={styles.description}>
          {product.description}
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  name: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  price: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  oldPrice: {
    color: "#888",
    textDecorationLine: "line-through",
  },
  sectionTitle: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 10,
  },
  description: {
    color: "#ccc",
    lineHeight: 22,
  },
});