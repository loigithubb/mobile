import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { addTodo } from '../components/todoSlice';

const Dashboard = ({ navigation }) => {
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState('');

  const dispatch = useDispatch();

  const handleAddBike = () => {
    const newBike = { name, price, discount, category, description, img };
    dispatch(addTodo(newBike));
    navigation.navigate('Screen02');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 32, textAlign: 'center'}}>Bike Name</Text>
      <View style={{ margin: 20 }}>
        <Text style={styles.label}>Bike Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Discount</Text>
        <TextInput
          style={styles.input}
          value={discount}
          onChangeText={setDiscount}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Image URL</Text>
        <TextInput style={styles.input} value={img} onChangeText={setImg} />
        <Button title="Add Bike" onPress={handleAddBike} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7BA8326',
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

export default Dashboard;