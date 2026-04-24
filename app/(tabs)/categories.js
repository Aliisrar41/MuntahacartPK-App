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

      {/* 🔥 PREMIUM TABS UI */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "men" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("men")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "men" && styles.activeTabText,
            ]}
          >
            Men
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "women" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("women")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "women" && styles.activeTabText,
            ]}
          >
            Women
          </Text>
        </TouchableOpacity>
      </View>

      {/* 🔥 PREMIUM PRODUCT CARD */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            {/* 🔥 IMAGE */}
            <Image source={item.image} style={styles.image} />

            {/* 🔥 DETAILS */}
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>{item.price}</Text>

                {/* 🔥 HEART ICON */}
                <TouchableOpacity
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons
                    name={
                      favorites.includes(item.id)
                        ? "heart"
                        : "heart-outline"
                    }
                    size={20}
                    color={
                      favorites.includes(item.id)
                        ? "red"
                        : "#FFD700"
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
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
    padding: 12,
  },

  /* 🔥 TABS */
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#111",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#FFD700",
  },
  tabText: {
    color: "#FFD700",
    fontWeight: "600",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "bold",
  },

  /* 🔥 CARD */
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    padding: 12,
    borderRadius: 15,
    marginBottom: 12,
    alignItems: "center",

    // 🔥 Shadow (premium feel)
    elevation: 5,
  },

  image: {
    width: 85,
    height: 85,
    borderRadius: 12,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 15,
  },
  desc: {
    color: "#ccc",
    fontSize: 12,
    marginTop: 2,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },

  price: {
    color: "#FFD700",
    fontWeight: "bold",
    fontSize: 14,
  },
});