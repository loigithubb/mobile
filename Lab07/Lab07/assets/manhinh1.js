import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet,TextInput } from 'react-native';

const App = () => {
  const [data, setData] = useState([]);

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetch('https://64596be58badff578e0cf0f7.mockapi.io/api/job');
      const json = await response.json();
      setData(json); // Save the data to state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Render each item in FlatList
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>{item.nameJob}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Hi Twinkle</Text>
      <TextInput
      placeholder="Nhập tên công việc"
      style={styles.input}
      />
      
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()} // Ensure unique key for each item
        renderItem={renderItem} // Display each item
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
