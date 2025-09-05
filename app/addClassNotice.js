// app/addClassNotice.js
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/FirebaseConfig";

export default function AddClassNotice() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // restrict non-admin users
  if (!user || user.email !== "admin@gmail.com") {
    return (
      <View style={styles.container}>
        <Text style={styles.denied}>Access Denied</Text>
      </View>
    );
  }

  const handleAddNotice = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "classNotices"), {
        title,
        description,
        createdAt: serverTimestamp(),
      });
      Alert.alert("Success", "Class notice added successfully!");
      router.back(); // go back to classNotice.js
    } catch (error) {
      console.error("Error adding class notice:", error);
      Alert.alert("Error", "Failed to add notice");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Class Notice</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleAddNotice}>
        <Text style={styles.buttonText}>Add Notice</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
  denied: { fontSize: 18, color: "red", textAlign: "center", marginTop: 50 },
});
