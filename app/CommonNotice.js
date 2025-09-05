// app/commonNotice.js
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { db } from "../config/FirebaseConfig";

export default function CommonNotice() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "commonNotices"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotices(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Common Notices</Text>

      {notices.length === 0 ? (
        <Text style={styles.empty}>No notices available</Text>
      ) : (
        <FlatList
          data={notices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.time}>
                {item.createdAt?.toDate().toLocaleString() || "Just now"}
              </Text>
            </View>
          )}
        />
      )}

      {/* Show Add button only for admin */}
      {user && user.email === "admin@gmail.com" && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("/addCommonNotice")}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center" },
  empty: { textAlign: "center", marginTop: 50, fontSize: 16, color: "gray" },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  desc: { fontSize: 15, color: "#333", marginBottom: 8 },
  time: { fontSize: 12, color: "gray", textAlign: "right" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
});
