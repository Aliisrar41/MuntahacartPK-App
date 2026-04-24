import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  // 🔥 VALIDATION + SAVE
  const handleSave = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Name, Email & Password required!");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Invalid Email!");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be 6+ characters!");
      return;
    }

    const userData = {
      name,
      fatherName,
      email,
      password,
      phone,
      age,
      address,
    };

    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(userData));
      Alert.alert("Success", "Profile Saved ✅");
      router.back();
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.header}>Edit Profile</Text>

      {/* INPUTS */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" placeholderTextColor="#777" />

      <Text style={styles.label}>Father Name</Text>
      <TextInput style={styles.input} value={fatherName} onChangeText={setFatherName} placeholder="Father Name" placeholderTextColor="#777" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#777" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Password" secureTextEntry placeholderTextColor="#777" />

      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" placeholderTextColor="#777" />

      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" placeholderTextColor="#777" />

      <Text style={styles.label}>Address</Text>
      <TextInput style={[styles.input, { height: 80 }]} value={address} onChangeText={setAddress} placeholder="Address" multiline placeholderTextColor="#777" />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: { color: "#FFD700", fontSize: 22, textAlign: "center", marginBottom: 20 },
  label: { color: "#FFD700", marginTop: 10 },
  input: { backgroundColor: "#111", color: "#FFD700", padding: 12, borderRadius: 10, marginTop: 5 },
  button: { backgroundColor: "#FFD700", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 20 },
  buttonText: { color: "#000", fontWeight: "bold" },
});