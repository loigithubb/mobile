import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';

const ScreenHome = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Text style={{ ...styles.text1, width: 351, height: 87, paddingTop: 40 }}>
        A premium online store for sporter and their stylish choice
      </Text>
      <View style={styles.khungImage}>
        <Image
          source={require('../assets/bifour_-removebg-preview.png')}
          style={{ width: 292, height: 270 }}
        />
      </View>

      <Text style={{ ...styles.text2, width: 200 }}>POWER BIKE SHOP</Text>
      <TouchableOpacity
        style={styles.buttonStart}
        onPress={() => navigation.navigate('List')}>
        <Text style={{ ...styles.text1, color: '#FFFFFF' }}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.buttonStart, backgroundColor: 'blue' }}
        onPress={() => navigation.navigate('AddBike')}>
        <Text style={{ ...styles.text1, color: '#FFFFFF' }}>Add Bike</Text>
      </TouchableOpacity>
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
  text2: {
    fontFamily: 'Ubuntu',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 700,
    lineHeight: 29.87,
    alignContent: 'center',
  },
    buttonStart: {
    width: 340,
    height: 61,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default ScreenHome;