import { getAuth } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Linking, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/FirebaseConfig";

export default function Clubs() {
  const auth = getAuth();
  const user = auth.currentUser; // Get the logged-in user
  const isAdmin = user?.email === "admin@gmail.com"; // Check if admin

  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    const snapshot = await getDocs(collection(db, "clubs"));
    setClubs(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addClub = async () => {
    if (!name || !link) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (!isValidURL(link)) {
      Alert.alert("Error", "Please enter a valid URL.");
      return;
    }
    await addDoc(collection(db, "clubs"), {
      name,
      link,
      createdAt: serverTimestamp(),
    });
    Alert.alert("Success", "Club added successfully!");
    setName("");
    setLink("");
    setModalVisible(false); // Close the modal after adding the club
    fetchClubs();
  };

  const isValidURL = (url) => {
    const regex = /^(https?:\/\/)?([\w\d-]+\.){1,}[\w\d-]+(\/[\w\d-./?%&=]*)?$/;
    return regex.test(url);
  };

  const handleVisitClub = (url) => {
    if (!isValidURL(url)) {
      Alert.alert("Error", "Invalid URL. Cannot open the link.");
      return;
    }
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Failed to open the link.");
    });
  };

  const handleRemoveClub = async (id) => {
    Alert.alert(
      "Remove Club",
      "Are you sure you want to remove this club?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "clubs", id));
              Alert.alert("Success", "Club removed successfully!");
              fetchClubs();
            } catch (error) {
              Alert.alert("Error", "Failed to remove the club.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Explore Clubs</Text>
      {clubs.length === 0 ? (
        <Text style={styles.noClubsText}>No clubs available</Text>
      ) : (
        <FlatList
          data={clubs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={styles.clubCard}>
              <Text style={styles.clubName}>{item.name}</Text>
              <View style={styles.actions}>
                {!isAdmin && (
                  <TouchableOpacity
                    style={styles.visitButton}
                    onPress={() => handleVisitClub(item.link)}
                  >
                    <Text style={styles.visitButtonText}>Visit Club</Text>
                  </TouchableOpacity>
                )}
                {isAdmin && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveClub(item.id)}
                  >
                    <Text style={styles.removeButtonText}>Remove</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}

      {/* Floating Action Button for Admins */}
      {isAdmin && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setModalVisible(true)} // Open the modal
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}

      {/* Modal for Adding a New Club */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Club</Text>
            <TextInput
              placeholder="Club Name"
              value={name}
              onChangeText={setName}
              style={styles.clubCard}
            />
            <TextInput
              placeholder="Link to Club (e.g., website or resource)"
              value={link}
              onChangeText={setLink}
              style={styles.clubCard}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.addButton} onPress={addClub}>
                <Text style={styles.addButtonText}>Add Club</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  noClubsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  clubCard: {
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
  clubName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  visitButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  visitButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1e90ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  fabText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});