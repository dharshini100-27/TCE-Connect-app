import { useLocalSearchParams, useRouter } from "expo-router"; // ✅ FIXED
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { role } = useLocalSearchParams(); // ✅ FIXED

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />

      <TouchableOpacity style={styles.button} onPress={() => router.push("/CommonNotice")}>
        <Text style={styles.buttonText}>Common Notice Board</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/classNotice")}>
        <Text style={styles.buttonText}>My Class Notice Board</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/complaints")}>
        <Text style={styles.buttonText}>Complaints</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Events")}>
        <Text style={styles.buttonText}>Events</Text>
      </TouchableOpacity>


     
      {/* Admin-only features */}
      {role === "admin" && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/Teachers?admin=true")}>
            <Text style={styles.buttonText}>Upload Teachers Info</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/Events")}>
            <Text style={styles.buttonText}>Upload Events</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/addCommonNotice?admin=true")}>
            <Text style={styles.buttonText}>Add Common Notice</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/addClassNotice?admin=true")}>
            <Text style={styles.buttonText}>Add Class Notice</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 20, backgroundColor: "#f0f0f0" },
  logo: { width: 150, height: 150, marginBottom: 20, resizeMode: "contain" },
  button: { backgroundColor: "#1e90ff", padding: 12, width: "100%", marginVertical: 5, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
