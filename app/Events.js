import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "../config/FirebaseConfig";

export default function Events() {
  const auth = getAuth();
  const user = auth.currentUser; // Get the logged-in user
  const isAdmin = user?.email === "admin@gmail.com"; // Check if admin

  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState("");
  const [venue, setVenue] = useState("");
  const [registration, setRegistration] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const snapshot = await getDocs(collection(db, "events"));
    setEvents(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addEvent = async () => {
    if (!title || !venue || !registration) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    await addDoc(collection(db, "events"), {
      title,
      venue,
      registration,
      createdAt: serverTimestamp(),
    });
    Alert.alert("Success", "Event added successfully!");
    setTitle("");
    setVenue("");
    setRegistration("");
    fetchEvents();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Banner image at top */}
      <View style={styles.bannerContainer}>
       
      </View>

      {isAdmin && (
        <>
          <Text style={styles.sectionTitle}>Add New Event</Text>
          <View style={styles.box}>
          <TextInput
            placeholder="Event Title"
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
          <TouchableOpacity style={styles.addButton} onPress={addEvent}>
            <Text style={styles.addButtonText}>Add Event</Text>
          </TouchableOpacity>
          </View>
        </>
      )}

      
      {events.length === 0 ? (
        <Text style={styles.noEventsText}>No events available</Text>
      ) : (
        events.map((e) => (
          <View key={e.id} style={styles.eventCard}>
            <Text style={styles.eventTitle}>{e.title}</Text>
            <Text style={styles.eventDetails}>Venue: {e.venue}</Text>
            <Text style={styles.eventDetails}>Registration: {e.registration}</Text>
            <Text style={styles.eventDate}>
              {e.createdAt?.toDate().toLocaleString() || "Just now"}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Light background for better contrast
    padding: 15,
  },
  scrollContent: {
    paddingBottom: 20, // Add padding to avoid overlap with the bottom of the screen
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  box: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  noEventsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  eventCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#007bff",
  },
  eventDetails: {
    fontSize: 15,
    color: "#555",
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 12,
    color: "gray",
    textAlign: "right",
  },
});
