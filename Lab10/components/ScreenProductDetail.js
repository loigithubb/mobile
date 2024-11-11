import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const ScreenProductDetail = ({ route }) => {
  const { product } = route.params;
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.khungImage}>
        <Image
          source={{ uri: product.img }}
          style={{ width: 292, height: 270 }}
        />
      </View>
      <View>
        <Text
          style={{ ...styles.textProductDetail, color: 'black', fontSize: 35 }}>
          {product.name}
        </Text>
        <Text style={{ ...styles.textProductDetail, fontSize: 20 }}>
          Price: ${product.price}
          <Text
            style={{
              color: 'black',
              paddingLeft: 20,
              textDecorationLine: 'line-through',
            }}>
            449$
          </Text>
        </Text>
        <Text
          style={{
            ...styles.textProductDetail,
            fontSize: 25,
            color: 'black',
            paddingTop: 15,
            paddingBottom: 15,
          }}>
          Description
        </Text>
        <Text style={{ ...styles.textProductDetail, fontSize: 20 }}>
          It is a very important form of writing as we write almost everything
          in paragraphs, be it an answer, essay, story, emails, etc.
        </Text>
      </View>
      <View style={{ width: 375 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity>
            <Image source={require('../assets/akar-icons_heart.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.buttonStart, borderRadius: 10, width: 269 }}>
            <Text style={{ ...styles.text1, color: '#FFFFFF' }}>
              Add to cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  khungImage: {
    width: 359,
    height: 388,
    backgroundColor: '#E941411A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
  text1: {
    fontFamily: 'VT323',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 400,
    lineHeight: 26,
    alignContent: 'center',
  },
  buttonStart: {
    width: 340,
    height: 61,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textProductDetail: {
    fontFamily: 'Voltaire',
    fontWeight: 400,
    color: '#00000091',
    width: 335,
  },
});

export default ScreenProductDetail;