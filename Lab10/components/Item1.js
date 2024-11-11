import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const Item1 = ({ img, name, price }) => (
  <View style={{ paddingTop: 20, paddingLeft: 20 }}>
    <View
      style={{
        width: 167,
        height: 200,
        backgroundColor: "#E941411A",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Image
        style={{
          position: "absolute", // đặt position là absolute để di chuyển
          top: 5, // khoảng cách từ trên cùng
          left: 10, // khoảng cách từ bên phải
          zIndex: 1, // đảm bảo hình ảnh không bị che bởi các thành phần khác
        }}
        source={require("../assets/heart.png")}
      />
      <Image style={{ width: 135, height: 127 }} source={{ uri: img }} />
      <Text style={{ ...styles.textButtonList, color: "#8c8681" }}>{name}</Text>
      <Text
        style={{ fontSize: 20, fontFamily: "Voltaire", textAlign: "center" }}
      >
        <Text style={{ color: "#F7BA83" }}>$</Text>
        {price}
      </Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  textButtonList: {
    fontFamily: "Voltaire",
    textAlign: "center",
    fontSize: 20,
    fontWeight: 400,
    lineHeight: 24.91,
    alignContent: "center",
  },
});
export default Item1;
