import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function NoticeCard({ title, description, image }) {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5 },
  image: { width: "100%", height: 150, marginBottom: 5, borderRadius: 5 },
  title: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
});
