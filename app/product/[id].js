import { useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const products = [
  {
    id: "1",
    name: "Running Shoes",
    price: "Rs 6000",
    oldPrice: "Rs 8000",
    rating: 4.5,
    reviews: 120,
    description:
      "Performance-driven running shoes built with breathable mesh, cushioned soles, and advanced grip technology. Perfect for athletes, fitness enthusiasts, and everyday comfort. Designed to provide support, durability, and style for all your running needs.",
    image: require("../../assets/images/shoes.jpeg"),
  },
  {
    id: "2",
    name: "Luxury Watch",
    price: "Rs 4500",
    oldPrice: "Rs 6000",
    rating: 4.8,
    reviews: 200,
    description:
      "A premium luxury watch that blends timeless elegance with modern precision. Crafted with durable materials and sleek design, it’s a symbol of sophistication and style. Perfect for any occasion, this watch offers reliable performance and a touch of luxury to your wrist",
    image: require("../../assets/images/watch.jpeg"),
  },
  {
    id: "3",
    name: "Leather Wallet",
    price: "Rs 2500",
    oldPrice: "Rs 3500",
    rating: 4.3,
    reviews: 80,
    description:
      "Handcrafted genuine leather wallet with a slim profile and multiple compartments. Durable, stylish, and designed to keep your essentials organized with ease.",
    image: require("../../assets/images/wallet.jpeg"),
  },
  {
    id: "4",
    name: "Women Luxury Bag",
    price: "Rs 999",
    oldPrice: "Rs 1999",
    rating: 4.6,
    reviews: 150,
    description:
      "Elegant women’s luxury bag made with premium materials. Spacious yet chic, perfect for casual outings, office wear, or evening events. Crafted with attention to detail, it features multiple compartments for organized storage and a comfortable strap for easy carrying.",
    image: require("../../assets/images/bag.jpg"),
  },
  {
    id: "5",
    name: "Makeup Kit",
    price: "Rs 3500",
    oldPrice: "Rs 5000",
    rating: 4.7,
    reviews: 95,
    description:
      "Complete luxury makeup kit featuring high-quality products for flawless looks. Ideal for daily use or special occasions, offering versatility and professional results.",
    image: require("../../assets/images/makeup2.jpg"),
  },
  {
    id: "6",
    name: "Lipstick Set",
    price: "Rs 1200",
    oldPrice: "Rs 2000",
    rating: 4.4,
    reviews: 60,
    description:
      "Premium lipstick set with rich pigmentation, smooth texture, and long-lasting wear. Includes vibrant shades to suit every mood and occasion.",
    image: require("../../assets/images/makeup1.jpg"),
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams();

  const product = products.find((item) => item.id === id);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff" }}>Product not found</Text>
      </View>
    );
  }

  // ⭐ Stars
  const renderStars = (rating) => {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= Math.floor(rating) ? "★" : "☆";
    }
    return stars;
  };

  // 💰 Price calc
  const priceNum = parseInt(product.price.replace(/[^0-9]/g, ""));
  const oldPriceNum = parseInt(product.oldPrice.replace(/[^0-9]/g, ""));
  const savings = oldPriceNum - priceNum;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      <Image source={product.image} style={styles.image} />

      <View style={styles.content}>

        {/* TOP ROW */}
        <View style={styles.row}>

          {/* LEFT SIDE */}
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{product.name}</Text>

            <View style={styles.ratingRow}>
              <Text style={styles.stars}>{renderStars(product.rating)}</Text>
              <Text style={styles.ratingText}>
                {product.rating} ({product.reviews})
              </Text>
            </View>
          </View>

          {/* RIGHT SIDE */}
          <View style={styles.priceBox}>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.oldPrice}>{product.oldPrice}</Text>

            <Text style={styles.save}>
              Save Rs {savings}
            </Text>
          </View>

        </View>

        {/* DIVIDER */}
        <View style={styles.divider} />

        {/* PRODUCT DETAILS */}
        <View style={styles.detailsBox}>
          <Text style={styles.sectionTitle}>Product Details</Text>

          <Text style={styles.description}>
            {product.description}
          </Text>

          <Text style={styles.extra}>
            ✔ Premium Quality{"\n"}
            ✔ Fast Delivery{"\n"}
            ✔ Trusted Product
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  content: { padding: 20 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 5,
  },

  stars: {
    color: "#FFD700",
    marginRight: 5,
  },

  ratingText: {
    color: "#ccc",
  },

  priceBox: {
    alignItems: "flex-end",
  },

  price: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },

  oldPrice: {
    color: "#888",
    textDecorationLine: "line-through",
  },

  save: {
    color: "#FFD700",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#222",
    marginVertical: 15,
  },

  detailsBox: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 10,
  },

  sectionTitle: {
    color: "#FFD700",
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },

  description: {
    color: "#ccc",
    marginBottom: 10,
  },

  extra: {
    color: "#FFD700",
    fontSize: 13,
    lineHeight: 20,
  },
});