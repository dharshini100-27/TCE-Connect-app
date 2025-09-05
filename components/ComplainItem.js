// components/ComplaintItem.js
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ComplaintItem({ item, onResolve }) {
  return (
    <View style={styles.card}>
      <Text style={{fontWeight:'700'}}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Text>Status: {item.status}</Text>
      {item.status !== "Resolved" ? <TouchableOpacity onPress={()=>onResolve(item.id)} style={styles.btn}><Text style={{color:'#fff'}}>Resolve</Text></TouchableOpacity> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card:{padding:10,borderWidth:1,borderColor:'#ddd',borderRadius:8,marginVertical:6},
  btn:{backgroundColor:'green',padding:8,marginTop:8,borderRadius:6,alignSelf:'flex-start'}
});
