import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ComplaintCard from "../components/ComplaintCard";
import { db } from "../config/FirebaseConfig";

export default function Complaints() {
  const auth = getAuth();
  const user = auth.currentUser;
  const isAdmin = user?.email === "admin@gmail.com"; // Determine admin from email
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setComplaints(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleResolve = async (id) => {
    try {
      await updateDoc(doc(db, "complaints", id), { status: "Resolved" });
      Alert.alert("Success", "Complaint marked as resolved");
      fetchComplaints();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to update complaint");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {!isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/addComplaint")}>
          <Text style={styles.addButtonText}>Add Complaint</Text>
        </TouchableOpacity>
      )}

      {complaints.map(c => (
        <View key={c.id} style={{ marginBottom: 10 }}>
          <ComplaintCard {...c} />
          {isAdmin && c.status !== "Resolved" && (
            <TouchableOpacity style={styles.resolveButton} onPress={() => handleResolve(c.id)}>
              <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  addButton: { backgroundColor: "#1e90ff", padding: 10, borderRadius: 5, marginBottom: 10 },
  addButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  resolveButton: { backgroundColor: "#28a745", padding: 10, borderRadius: 5, marginTop: 5 },
  resolveButtonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
