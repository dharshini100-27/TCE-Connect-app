import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import EventCard from "../components/EventCard";
import { db } from "../config/FirebaseConfig";

export default function Events() {
  const auth = getAuth();
  const user = auth.currentUser;   // Get the logged-in user
  const isAdmin = user?.email === "admin@gmail.com"; // Check if admin

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [registration, setRegistration] = useState("");

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addEvent = async () => {
    if (!title || !venue || !registration) { 
      Alert.alert("Error", "Fill all fields"); 
      return; 
    }
    await addDoc(collection(db, "events"), { 
      title, 
      venue, 
      registration, 
      createdAt: serverTimestamp() 
    });
    Alert.alert("Success", "Event added!");
    setTitle(""); setVenue(""); setRegistration("");
    fetchEvents();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Banner image at top */}
      <View style={styles.bannerContainer}>
        <Image source={require("../assets/default_event.png")} style={styles.banner} />
      </View>

      {isAdmin && (   // Only show add form if logged-in user is admin
        <>
          <TextInput 
            placeholder="Title" 
            value={title} 
            onChangeText={setTitle} 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Venue" 
            value={venue} 
            onChangeText={setVenue} 
            style={styles.input} 
          />
          <TextInput 
            placeholder="Registration Details" 
            value={registration} 
            onChangeText={setRegistration} 
            style={styles.input} 
          />
          <TouchableOpacity style={styles.button} onPress={addEvent}>
            <Text style={styles.buttonText}>Add Event</Text>
          </TouchableOpacity>
        </>
      )}

      {events.map(e => <EventCard key={e.id} {...e} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  bannerContainer: { alignItems: "center", marginBottom: 15 },
  banner: { width: "100%", height: 150, resizeMode: "contain", borderRadius: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5 },
  button: { backgroundColor: "#1e90ff", padding: 10, borderRadius: 5, marginVertical: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
