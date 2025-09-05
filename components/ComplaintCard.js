// components/ComplaintCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ComplaintCard({ title, description, status, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
      <Text style={styles.status}>Status: {status || "Pending"}</Text>
      {/* Render any child elements, e.g., admin buttons */}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  title: { fontWeight: "bold", marginBottom: 5 },
  status: { marginTop: 5, fontStyle: "italic" },
});
