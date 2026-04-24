import { useContext } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from "react-native";
import { OrderContext } from "../context/OrderContext";

export default function Orders() {
    const { orders } = useContext(OrderContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Orders</Text>

            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.text}>
                            Items: {item.items.length}
                        </Text>
                        <Text style={styles.text}>
                            Address: {item.user.address}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000", padding: 15 },
    title: { color: "#FFD700", fontSize: 20, marginBottom: 10 },
    card: {
        backgroundColor: "#111",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    date: { color: "#FFD700" },
    text: { color: "#fff" },
});