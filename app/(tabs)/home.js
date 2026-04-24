import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartContext } from "../../context/CartContext";

const { width } = Dimensions.get("window");

// Product Data
const products = [
  {
    id: "1",
    name: "Running Shoes",
    price: "Rs 6000",
    oldPrice: "Rs 8000",
    category: "Shoes",
    image: require("../../assets/images/shoes.jpeg"),
  },
  {
    id: "2",
    name: "Luxury Watch",
    price: "Rs 4500",
    oldPrice: "Rs 6000",
    category: "Watches",
    image: require("../../assets/images/watch.jpeg"),
  },
  {
    id: "3",
    name: "Leather Wallet",
    price: "Rs 2500",
    oldPrice: "Rs 3500",
    category: "Bags",
    image: require("../../assets/images/wallet.jpeg"),
  },
  {
    id: "4",
    name: "Women Luxry Bag",
    price: "Rs 999",
    oldPrice: "Rs 1999",
    category: "Bags",
    image: require("../../assets/images/bag.jpg"),
  },
  
  {
    id: "5",
    name: "Makeup Kit",
    price: "Rs 3500",
    oldPrice: "Rs 5000",
    category: "Makeup",
    image: require("../../assets/images/makeup2.jpg"),
  },
  {
    id: "6",
    name: "Lipstick Set",
    price: "Rs 1200",
    oldPrice: "Rs 2000",
    category: "Makeup",
    image: require("../../assets/images/makeup1.jpg"),
  },
];

export default function Home() {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const [likes, setLikes] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  const sliderImages = [
    require("../../assets/images/friday.png"),
    require("../../assets/images/ramdan.png"),
  ];

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // Category Filter state
  const [activeCategory, setActiveCategory] = useState("All");

  // Heart animation
  const heartAnim = useRef(new Animated.Value(1)).current;

  // Flash sale timer state
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Initialize flash sale countdown (2 hours for example)
  useEffect(() => {
    let countDown = 2 * 60 * 60; // 2 hours in seconds
    const interval = setInterval(() => {
      const hrs = Math.floor(countDown / 3600);
      const mins = Math.floor((countDown % 3600) / 60);
      const secs = countDown % 60;
      setTimer({ hours: hrs, minutes: mins, seconds: secs });
      countDown--;
      if (countDown < 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle heart with animation
  const toggleLike = (id) => {
    // Animate heart
    Animated.sequence([
      Animated.spring(heartAnim, { toValue: 1.5, useNativeDriver: true }),
      Animated.spring(heartAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    setLikes((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  // Slider scroll
  const handleScroll = (event) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (width - 30)
    );
    setCurrentSlide(index);
  };

  // Filter products based on search + category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" ? true : product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Categories for buttons
  const categories = ["All", "Shoes", "Watches", "Bags", "Makeup"];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Text style={styles.header}>MuntahaCartPK</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color="#000" />
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              activeCategory === cat && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === cat && { fontWeight: "bold" },
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Slider */}
      <View style={{ marginBottom: 20 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          ref={scrollRef}
        >
          {sliderImages.map((img, index) => (
            <Image key={index} source={img} style={styles.sliderImage} />
          ))}
        </ScrollView>
        {/* Pagination dots */}
        <View style={styles.dotsContainer}>
          {sliderImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentSlide === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Flash Sale Label + Timer */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
        <Text style={styles.flashText}>Flash Sale</Text>
        <Text style={styles.timerText}>
          {String(timer.hours).padStart(2, "0")}:
          {String(timer.minutes).padStart(2, "0")}:
          {String(timer.seconds).padStart(2, "0")}
        </Text>
      </View>

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push(`/product/${item.id}`)}
            >
              {/* Discount Badge */}
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>25%</Text>
              </View>

              {/* Product Image */}
              <Image source={item.image} style={styles.productImage} />

              {/* Product Name + Heart with animation */}
              <View style={styles.productNameContainer}>
                <Text style={styles.productName} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={styles.heartWrapper}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleLike(item.id);
                  }}
                >
                  <Animated.View style={{ transform: [{ scale: heartAnim }] }}>
                    <Ionicons
                      name="heart"
                      size={18}
                      color={likes[item.id] ? "red" : "#999"}
                    />
                  </Animated.View>
                  <Text style={styles.likeCount}>
                    {likes[item.id] ? likes[item.id] : " "}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Price */}
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                <Text style={styles.oldPrice}>{item.oldPrice}</Text>
              </View>

              {/* Add to Cart */}
              <TouchableOpacity
                style={styles.cartButton}
                onPress={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                }}
              >
                <Text style={styles.cartText}>Add to Cart</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.notFoundText}>Product not found 😔</Text>
      )}
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 15 },
  header: { color: "#ffd902", fontSize: 26, fontWeight: "bold", marginBottom: 15, marginTop: 5, textAlign: "center" },
  searchContainer: { flexDirection: "row", backgroundColor: "#FFD700", padding: 12, borderRadius: 15, alignItems: "center", marginBottom: 20 },
  searchInput: { marginLeft: 10, flex: 1 },
  sliderImage: { width: width - 30, height: 180, borderRadius: 10, marginRight: 15, resizeMode: "cover" },
  dotsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#888", marginHorizontal: 4 },
  activeDot: { backgroundColor: "#FFD700" },
  flashText: { color: "#FFD700", fontSize: 20, fontWeight: "bold" },
  timerText: { color: "#FFD700", fontSize: 16, fontWeight: "600" },
  card: { backgroundColor: "#111", width: (width - 45) / 2, borderRadius: 15, padding: 10, marginBottom: 15, overflow: "hidden" },
  discountBadge: { position: "absolute", backgroundColor: "red", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, top: 8, left: 8, zIndex: 1 },
  discountText: { color: "#fff", fontSize: 10, fontWeight: "bold" },
  productNameContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4, minHeight: 20 },
  productName: { color: "#FFD700", fontWeight: "600", fontSize: 14, flex: 1 },
  heartWrapper: { flexDirection: "row", alignItems: "center", justifyContent: "center", width: 30, marginLeft: 6 },
  likeCount: { color: "red", fontSize: 10, marginLeft: 4, textAlign: "center", minWidth: 10 },
  productImage: { width: "100%", height: 120, borderRadius: 12, marginBottom: 8 },
  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  price: { color: "#FFD700", fontWeight: "bold", marginRight: 6 },
  oldPrice: { color: "#888", textDecorationLine: "line-through", fontSize: 12 },
  cartButton: { backgroundColor: "#FFD700", marginTop: 8, padding: 8, borderRadius: 10, alignItems: "center" },
  cartText: { color: "#000", fontWeight: "bold" },
  notFoundText: { color: "#FFD700", fontSize: 16, textAlign: "center", marginTop: 20 },
  categoryButton: { backgroundColor: "#222", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, marginRight: 8 },
  activeCategory: { backgroundColor: "#FFD700" },
  categoryText: { color: "#fff" },
});