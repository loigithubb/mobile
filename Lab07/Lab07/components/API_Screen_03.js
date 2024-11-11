import React,{ useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image,TouchableOpacity,TextInput, Alert} from 'react-native';
import {AntDesign, Fontisto} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function Screen03() {
  const [task,setTask] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  const name = route.params?.name || "User";

  
  const addTask = async () => {
    if(!task.trim()){
      Alert.alert("Error", "Please enter a job description.");
      return;
    }
  
    try{
      const response = await axios.post('https://6715e56333bc2bfe40bb7301.mockapi.io/data', {
        email:email,
        task: task,
        name:name,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Job added successfully!");
        setTask('');
        navigation.navigate('Api_Screen_02', { email });
         } else {
        Alert.alert("Error", "Failed to add job. Please try again.");
      }
    } catch (error) {
      console.log("Error adding job:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.info}> 
          <Image source={require("../assets/Rectangle.png")} style={styles.profileImage}/>
          <View style={styles.textHeader}>
            <Text style={styles.name}>Hi {name}</Text>
            <Text style={styles.description}>Have agrate day a head</Text>
          </View>
        </View>
        <TouchableOpacity> 
          <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('Api_Screen_02', {email})}/>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>ADD YOUR JOB</Text>
      <View style={styles.inputContainer}> 
        <Fontisto name="nav-icon-list-a" size={24} color="green" />
        <TextInput style={styles.textInput} placeholder="input your job" value={task} onChangeText={setTask}/>
      </View>
      <TouchableOpacity style={styles.finishButton} onPress={addTask}>
        <Text style={styles.textButton}>Finish ➔</Text>
      </TouchableOpacity>

      <Image source={require("../assets/Image_95.png")} style={styles.noteImage}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    marginTop:10,
    marginHorizontal:20,
    flexDirection:'row',
    justifyContent:"space-between",
    alignItems:'center',
  },
  info:{
    flexDirection:"row",
    alignItems:'center'
  },
  profileImage:{
    borderRadius:30,
    backgroundColor:'#D9CBF6',
  },
  textHeader:{
    marginLeft:10,
  },
  name:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center'
  },
  description:{
    fontWeight:'bold',
    color:'#9095A0',
  },
  title:{
    fontWeight:'bold',
    fontSize:30,
    textAlign:'center',
    marginVertical:30,
  },
  inputContainer:{
    flexDirection:'row',
    borderWidth:1,
    borderRadius:5,
    alignItems:'center',
    padding:10,
    marginHorizontal:10,
    marginBottom:20,
  },
  textInput:{
    flex:1,
    fontSize:20,
    paddingLeft:10,
  },
  finishButton:{
    backgroundColor:'#00BDD6',
    alignItems:'center',
    borderRadius:10,
    paddingVertical:10,
    marginHorizontal:70,
  },textButton:{
    color:'#fff',
    fontSize:20,
  },
  noteImage:{
    marginTop:50,
    width: 150,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});