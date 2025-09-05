import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const router = useRouter();
  const { role } = useLocalSearchParams();

  return (
    <ImageBackground
      source={require("../assets/logo.png")} 
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <MaterialIcons name="home" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            {role === "admin" ? "Admin Dashboard" : "Student Dashboard"}
          </Text>
      
        </View>

        {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => router.push("/CommonNotice")}>
          <MaterialIcons name="notifications" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Common Notice Board</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/classNotice")}>
          <MaterialIcons name="class" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>My Class Notice Board</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/complaints")}>
          <MaterialIcons name="report-problem" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Complaints</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push("/Events")}>
          <MaterialIcons name="event" size={24} color="#fff" style={styles.icon} />
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/Clubs")}>
          <MaterialIcons name="class" size={24} color="#fff" style={styles.icon} />
        <Text style={styles.buttonText}>Clubs</Text>
      </TouchableOpacity>


     
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    flex: 1,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e90ff",
    padding: 15,
    width: "100%",
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
