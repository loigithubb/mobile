import React, {useState, useEffect} from 'react';
import { Image,Text, SafeAreaView, StyleSheet, View, FlatList,TouchableOpacity, TextInput, Modal, Button} from 'react-native';
import {AntDesign, Fontisto} from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

export default function Screen02() {
  const navigation = useNavigation();
  const route = useRoute();
  const [tasks,setStasks] = useState([]);
  const [user,setUser] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null); 
  const [updatedTask, setUpdatedTask] = useState('');
  const [isModal, setModal] = useState(false);

  const emailFromScreen01 = route.params?.email;

  useEffect(() => {
    fetchTasks();
  },[]);

  const fetchTasks = async () => {
    try{
      const response = await axios.get('https://6715e56333bc2bfe40bb7301.mockapi.io/data');
      const data = response.data;
      setStasks(data);

      const currentUser = data.find((user) => user.email === emailFromScreen01);
      if (currentUser) {
        setUser(currentUser);
        const filterTask = data.filter((task) => task.email === emailFromScreen01);
        setStasks(filterTask);
      }else{
        setStasks([])
      }
    }catch(error) {
      console.log("Error fetch tasks: ", error);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask(task.task);
    setModal(true);
  };
  
  const saveEdit = async () => {
    try{
      const response = await axios.put(`https://6715e56333bc2bfe40bb7301.mockapi.io/data/${editingTaskId}`, {
      task: updatedTask,
    });

    if (response.status === 200){
      const updatedTaskFromApi = response.data;

      const updatedTasks = tasks.map((task) => {
        if(task.id === editingTaskId){
          return updatedTaskFromApi;
        }
        return task;
      });

      setStasks(updatedTasks);
      setModal(false);
      setEditingTaskId(null);
      setUpdatedTask('');

    } else {
        const errorData = response.data;
        console.log("Failed to update task in API : " + errorData);
      }
    } catch (error) {
      console.log("Error updating task: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.task}>
        <View style={styles.checkbox}>
          <Text style = {styles.checkmark}>✓</Text>
        </View>
        <Text style={styles.taskText}>
          {item.task}
        </Text>
      </View>
      <TouchableOpacity style={styles.editClick} onPress={() => handleEdit(item)}>
        <AntDesign name="edit" size={24} color="red" />
      </TouchableOpacity>
    </View>
  )
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={() => navigation.navigate('Home')}/>
        <View style={styles.info}> 
            <Image source={require("../assets/Rectangle.png")} style={{height:50,width:50,borderRadius:50,backgroundColor:"#D9CBF6"}}/>
            <View style={styles.textHeader}>
              <Text style={styles.username}> 
                Hi {user ? user.name : 'User'}
              </Text>
              <Text style={styles.greeting}>
                Have agrate day a head  
              </Text>
            </View>
        </View>
      </View>
      <View style={styles.boxSearch}>
        <Fontisto name="search" size={24} color="black" />
        <TextInput style={styles.textInput} placeholder="Search" />
      </View>
      {tasks.length > 0 ? (
        <FlatList 
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={{alignItems:'center',fontSize:20, fontWeight:'bold', textAlign:'center'}}>No tasks available</Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Api_Screen_03', {email: emailFromScreen01, name: user?.name})}>
        <AntDesign name="plus" size={24} color="white" /> 
      </TouchableOpacity>
      
      <Modal
        visible={isModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Task</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Update task title"
              value={updatedTask}
              onChangeText={(text) => setUpdatedTask(text)}
            />
            <Button title="Save" onPress={saveEdit} />
            <Button title="Cancel" color="red" onPress={() => setModal(false)} />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    alignItems:'center',
    marginTop:10,
    marginHorizontal:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  info:{
    flexDirection:'row',
    alignItems:'center'
  },  
  textHeader:{
    justifyContent: 'center',
  },  
  username:{
    fontSize:20,
    fontWeight:'bold',
    paddingLeft:5,
  },
  greeting:{
    fontSize:14,
    fontWeight:'bold',
    color:"#9095A0",
  },  
  boxSearch:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginTop:20,
    marginBottom:30,
    flexDirection:'row',
    marginHorizontal:10,
  },  
  textInput:{
    flex:1,
    fontSize:16,
    paddingLeft:5,
  },
  taskContainer:{
    borderRadius:20,
    margin:6,
    backgroundColor: '#DEE1E678',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:20,
    padding:5
  },
  task:{  
    flexDirection:'row',
    alignItems:'center',
  },
  checkmark:{
    color:"#14923E",
    fontWeight:'700',
  },
  checkbox:{
    borderWidth:2,
    borderColor:"#14923E", 
    alignItems:'center',
    justifyContent:'center',
    margin:5,
    padding:3,
  },
  taskText:{
    fontSize:16,
    fontWeight: 'bold',
    paddingLeft:10
  },
  editClick:{
    padding:5,
  },
  list: {
    paddingBottom: 20,
  },
  addButton:{
    backgroundColor:'#00BDD6',
    width:69,
    height:69,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:40,
    alignSelf:'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    padding: 5,
  },
});