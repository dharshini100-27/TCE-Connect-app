import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../config/FirebaseConfig";

export default function Complaints() {
  const auth = getAuth();
  const user = auth.currentUser;
  const isAdmin = user?.email === "admin@gmail.com"; // Determine admin from email
  const router = useRouter();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const q = query(collection(db, "complaints"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setComplaints(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
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

  const handleDelete = async (id) => {
    Alert.alert(
      "Delete Complaint",
      "Are you sure you want to delete this complaint?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "complaints", id));
              Alert.alert("Success", "Complaint deleted successfully");
              fetchComplaints();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "Failed to delete complaint");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading complaints...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isAdmin && (
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/addComplaint")}>
          <Text style={styles.addButtonText}>Add Complaint</Text>
        </TouchableOpacity>
      )}

      {complaints.length === 0 ? (
        <Text style={styles.noComplaintsText}>No complaints available</Text>
      ) : (
        <FlatList
          data={complaints}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description}</Text>
              <Text style={styles.time}>
                {item.createdAt?.toDate().toLocaleString() || "Just now"}
              </Text>

              {/* Status Field */}
              <View
                style={[
                  styles.statusBadge,
                  item.status === "Resolved" ? styles.resolved : styles.pending,
                ]}
              >
                <Text style={styles.statusText}>
                  {item.status || "Pending"}
                </Text>
              </View>

              {/* Admin-only Resolve Button */}
              {isAdmin && item.status !== "Resolved" && (
                <TouchableOpacity
                  style={styles.resolveButton}
                  onPress={() => handleResolve(item.id)}
                >
              <Text style={styles.resolveButtonText}>Mark as Resolved</Text>
            </TouchableOpacity>
          )}

              {/* Student-only Delete Button */}
              {!isAdmin && user?.email === item.createdBy && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              )}
        </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background for better contrast
    padding: 15,
  },
  listContent: {
    paddingBottom: 20, // Add padding to avoid overlap with the bottom of the screen
  },
  addButton: {
    backgroundColor: "#1e90ff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  noComplaintsText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "gray",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007bff",
  },
  desc: {
    fontSize: 15,
    color: "#555",
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: "gray",
    textAlign: "right",
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resolved: {
    backgroundColor: "#28a745", // Green for resolved
  },
  pending: {
    backgroundColor: "#007bff", // Yellow for pending
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  resolveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  resolveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "gray",
  },
});