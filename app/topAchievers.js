import React from "react";
import { Linking, ScrollView, StyleSheet, Text } from "react-native";

export default function TopAchievers() {
  const achievers = [
    { name: "Alice", rank: 1 },
    { name: "Bob", rank: 2 },
  ];
  const motivationalLinks = [
    { title: "Motivation Video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Top Rankers</Text>
      {achievers.map(a => <Text key={a.rank}>{a.rank}. {a.name}</Text>)}

      <Text style={styles.header}>Motivational Links</Text>
      {motivationalLinks.map((m, idx) => (
        <Text key={idx} style={styles.link} onPress={() => Linking.openURL(m.url)}>{m.title}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  header: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  link: { color: "#1e90ff", marginBottom: 5 },
});
