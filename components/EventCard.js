import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function EventCard({ title, venue, registration, image }) {
  return (
    <View style={styles.card}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text>Venue: {venue}</Text>
      <Text>Registration: {registration}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, borderWidth: 1, borderRadius: 5, marginVertical: 5 },
  image: { width: "100%", height: 150, borderRadius: 5, marginBottom: 5 },
  title: { fontWeight: "bold", fontSize: 16 },
});
