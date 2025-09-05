import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import TeacherCard from "../components/TeacherCard";
import { db } from "../config/FirebaseConfig";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchTeachers();

    // Check logged in user role
    const auth = getAuth();
    const user = auth.currentUser;
    if (user && user.email === "admin@gmail.com") {
      setIsAdmin(true);
    }
  }, []);

  const fetchTeachers = async () => {
    const snapshot = await getDocs(collection(db, "teachers"));
    setTeachers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const addTeacher = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Error", "Fill all fields");
      return;
    }
    try {
      await addDoc(collection(db, "teachers"), {
        name,
        email,
        phone,
        createdAt: serverTimestamp(),
      });
      Alert.alert("Success", "Teacher added!");
      setName(""); setEmail(""); setPhone("");
      fetchTeachers();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Teacher List */}
      <Text style={styles.heading}>Teachers</Text>
      {teachers.map(t => <TeacherCard key={t.id} {...t} />)}

      {/* Only admin can see Add Teacher form */}
      {isAdmin && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.heading}>Add Teacher</Text>
          <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
          <TextInput placeholder="Phone" value={phone} onChangeText={setPhone} style={styles.input} />

          <TouchableOpacity style={styles.button} onPress={addTeacher}>
            <Text style={styles.buttonText}>Add Teacher</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  heading: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 5 },
  button: { backgroundColor: "#1e90ff", padding: 10, borderRadius: 5, marginVertical: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
});
