// components/NoticeItem.js
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NoticeItem({ notice, onPress }) {
  let createdText = "";
  if (notice.createdAt && notice.createdAt.toDate) createdText = notice.createdAt.toDate().toLocaleString();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {notice.imageUrl ? <Image source={{uri:notice.imageUrl}} style={styles.image} /> : null}
      <View style={styles.body}>
        <Text style={styles.title}>{notice.title}</Text>
        {notice.description ? <Text style={styles.desc}>{notice.description}</Text> : null}
        {createdText ? <Text style={styles.date}>{createdText}</Text> : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card:{backgroundColor:'#fff',margin:10,borderRadius:10,overflow:'hidden',elevation:2},
  image:{width:'100%',height:160},
  body:{padding:12},
  title:{fontSize:16,fontWeight:'700'},
  desc:{marginTop:6,color:'#333'},
  date:{marginTop:8,color:'#888',fontSize:12}
});
