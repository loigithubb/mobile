import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import { addBike } from './features/bikes/bikesSlice';

const ScreenAddBike = ({ navigation }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [img, setImg] = useState('');
  const dispatch = useDispatch();

  const handleAddBike = () => {
    const newBike = { name, price, category, img };
    dispatch(addBike(newBike)).then(() => {
      navigation.navigate('List');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Bike Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <Text style={styles.label}>Image URL</Text>
      <TextInput style={styles.input} value={img} onChangeText={setImg} />
      <Button title="Add Bike" onPress={handleAddBike} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default ScreenAddBike;