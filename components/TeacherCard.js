import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function TeacherCard({ name, email, phone, image }) {
  return (
    <View style={styles.card}>
      <Image source={image ? { uri: image } : require("../assets/default_teacher.png")} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text>Email: {email}</Text>
      <Text>Phone: {phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  image: { width: "100%", height: 150, borderRadius: 5, marginBottom: 5 },
  name: { fontWeight: "bold", fontSize: 16 },
});
