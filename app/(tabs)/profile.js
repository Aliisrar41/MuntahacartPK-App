import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/login");
  };

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const handleOrders = () => {
    router.push("/orders");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', paddingTop: 60 }}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/girl.jpg")}
          style={styles.avatar}
        />
      </View>

      {/* Name & Email */}
      <Text style={styles.name}>Muntaha</Text>
      <Text style={styles.email}>Muntaha@example.com</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOrders}>
        <Text style={styles.buttonText}>Order History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a", // deep dark background for premium feel
  },
  avatarContainer: {
    elevation: 5,
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 60,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  name: {
    color: "#FFD700",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    color: "#ccc",
    fontSize: 14,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 15,
    width: "70%",
    alignItems: "center",
    marginVertical: 10,
    elevation: 3, // subtle shadow
  },
  logoutButton: {
    backgroundColor: "#ffffff", // white for logout
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});