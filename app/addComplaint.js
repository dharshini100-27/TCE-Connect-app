// app/addComplaint.js
import { getAuth } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/FirebaseConfig";

export default function AddComplaint() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddComplaint = async () => {
    if (!title || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "complaints"), {
        title,
        description,
        userEmail: user.email,
        status: "Pending",
        createdAt: serverTimestamp(),
      });
      Alert.alert("Success", "Complaint submitted!");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to submit complaint");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Complaint</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleAddComplaint}>
        <Text style={styles.buttonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  button: { backgroundColor: "#007bff", padding: 12, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
