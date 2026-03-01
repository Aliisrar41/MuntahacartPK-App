
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";



const menProducts = [
  {
    id: "1",
    name: "Men Shoes",
    price: "Rs 5000",
    desc: "Comfortable running shoes",
    image: require("../../assets/images/shoes.jpeg"),
  },
  {
    id: "2",
    name: "Men Watch",
    price: "Rs 4500",
    desc: "Premium stylish watch",
    image: require("../../assets/images/watch.jpeg"),
  },
];

const womenProducts = [
  {
    id: "3",
    name: "Women Wallet",
    price: "Rs 3000",
    desc: "Elegant leather wallet",
    image: require("../../assets/images/wallet.jpeg"),
  },
  {
    id: "4",
    name: "Women Luxry Bag",
    price: "Rs 999",
    desc: "Premium luxury bag",
    image: require("../../assets/images/bag.jpg"),
  },
];


export default function Categories() {
  const [activeTab, setActiveTab] = useState("men");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((item) => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const data = activeTab === "men" ? menProducts : womenProducts;

  return (
    <View style={styles.container}>

      {/* Top Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "men" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("men")}
        >
          <Text style={styles.tabText}>Men Fashion</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "women" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("women")}
        >
          <Text style={styles.tabText}>Women Fashion</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            
            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
            >
              <Ionicons
                name={
                  favorites.includes(item.id)
                    ? "heart"
                    : "heart-outline"
                }
                size={24}
                color={
                  favorites.includes(item.id)
                    ? "red"
                    : "#FFD700"
                }
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  tabButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffdc16",
  },
  activeTab: {
    backgroundColor: "#000000",
  },
  tabText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#272626",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  name: {
    color: "#FFD700",
    fontWeight: "bold",
  },
  desc: {
    color: "#ffffff",
    fontSize: 12,
  },
  price: {
    color: "#FFD700",
    marginTop: 5,
  },
  cartButton: {
  backgroundColor: "#FFD700",
  padding: 6,
  borderRadius: 6,
  marginTop: 5,
  alignItems: "center",
},
});