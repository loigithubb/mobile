import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
const ScreenProductDetail = ({ route }) => {
  const { product } = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: product.img }} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>
        High-quality bike suitable for all terrains.
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "blue",
  },
  price: {
    fontSize: 20,
    color: "green",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
export default ScreenProductDetail;
