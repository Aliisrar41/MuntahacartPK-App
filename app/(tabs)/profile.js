import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔥 NEW
import * as ImagePicker from "expo-image-picker";

// ✅ NEW: SafeAreaView import
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();

  // ✅ NEW: USER STATE FIX (ERROR FIX)
  const [user, setUser] = useState({});

  // 🔥 PROFILE IMAGE STATE
  const [profileImage, setProfileImage] = useState(
    require("../../assets/images/ali.jpg")
  );

  const handleLogout = () => {
    router.replace("/login");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleOrders = () => {
    router.push("/orders");
  };

  // 🔥 IMAGE PICKER FUNCTION
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission required to access gallery!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  // ✅ FIX: useEffect FUNCTION COMPONENT KE ANDAR LAAYA
  useEffect(() => {
    const loadData = async () => {
      const data = await AsyncStorage.getItem("userProfile");
      if (data) {
        setUser(JSON.parse(data));
      }
    };
    loadData();
  }, []);

  return (
    // ✅ NEW: SafeAreaView WRAP (MAIN FIX FOR UI SHIFT ISSUE)
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView style={styles.container}>

        {/* HEADER */}
        <Text style={styles.header}>Profile</Text>

        {/* PROFILE CARD */}
        <View style={styles.profileCard}>

          {/* 🔥 CLICKABLE IMAGE */}
          <TouchableOpacity onPress={pickImage}>
            <Image source={profileImage} style={styles.avatar} />
          </TouchableOpacity>

          <Text style={styles.name}>
            {user.name ? user.name : "Muntaha"}
          </Text>

          <Text style={styles.email}>
            {user.email ? user.email : "Muntaha@gmail.com"}
          </Text>

          {/* PROGRESS BAR */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
          <Text style={styles.progressText}>80% Profile Completed</Text>
        </View>

        {/* MENU */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <Ionicons name="person-outline" size={20} color="#FFD700" />
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleOrders}>
            <Ionicons name="bag-outline" size={20} color="#FFD700" />
            <Text style={styles.menuText}>Order History</Text>
          </TouchableOpacity>
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 15,
  },

  // ✅ OPTIONAL: thoda spacing better karne ke liye
  header: {
    color: "#FFD700",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 5, // 🔥 NEW: slight top spacing
  },

  profileCard: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#FFD700",
    marginBottom: 10,
  },

  name: {
    color: "#FFD700",
    fontSize: 18,
    fontWeight: "bold",
  },

  email: {
    color: "#aaa",
    fontSize: 13,
    marginBottom: 10,
  },

  progressContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#333",
    borderRadius: 5,
    marginTop: 10,
  },

  progressBar: {
    width: "80%",
    height: 6,
    backgroundColor: "#FFD700",
    borderRadius: 5,
  },

  progressText: {
    color: "#FFD700",
    fontSize: 12,
    marginTop: 5,
  },

  menuContainer: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },

  menuText: {
    color: "#FFD700",
    marginLeft: 15,
  },

  logoutButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
  },

  logoutText: {
    color: "#000",
    fontWeight: "bold",
  },
});