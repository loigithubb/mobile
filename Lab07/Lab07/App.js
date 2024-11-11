import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
const Stack = createStackNavigator();
const API_URL = "https://64596be58badff578e0cf0f7.mockapi.io/api/job";

function HomeScreen({ navigation }) {
  const [name, setName] = useState("");
  return (
    <View style={{}}>
      <Image
        style={{ marginTop: 50, marginLeft: 40 }}
        source={require("./assets/image_95.png")}
      />
      <Text style={{ color: "blue", fontWeight: "bold", textAlign: "center" }}>
        MANAGE YOUR{"\n"}TASK
      </Text>

      <TextInput
        style={{ borderWidth: 1, borderRadius: 5, width: 340, marginTop: 30 }}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={{
          backgroundColor: "rgb(44, 183, 218)",
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          color: "black",
          width: 200,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 80,
          marginTop: 50,
        }}
        onPress={() => navigation.navigate("Details", { name1: name })}
      >
        <Text style={{ color: "white" }}>GET STARTED -{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}
function DetailsScreen({ navigation, route }) {
  const { name1 } = route.params;
  const [task,setTask] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);
  const fetchTasks = async () => {
    try {
       const response = await axios.get(API_URL);
        setTask(response.data);
    }
    catch(error){
      console.log("Failed to fetch data", error);
    }
  };
  const renderItem = ({item}) => {
    <TouchableOpacity>
      
    </TouchableOpacity>
  };

  return (
    <View style={{}}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ marginLeft: -20 }}
            source={require("./assets/mdi_marker-tick.png")}
          />
        </TouchableOpacity>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={require("./assets/Frame1.png")} />
          <View>
            <Text style={{ fontSize: 18, marginLeft: 20, fontWeight: "bold" }}>
              Hi {name1}
            </Text>
            <Text style={{ marginLeft: 10, color: "rgb(214, 214, 216)" }}>
              Have agrate day a head
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderColor: "#ccc",
          borderWidth: 1,
          height: 32,
          marginTop: 20,
        }}
      >
        <Image source={require("./assets/mingcute_search-fill.png")} />
        <TextInput
          placeholder="Search"
          // value={searchQuery}
          // onChangeText={setSearchQuery}
        />
      </View>
      {/* <FlatList
        data={}
        renderItem={}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 10 }}
      /> */}
      <TouchableOpacity
        style={{ marginTop: 20, marginLeft: 150 }}
        onPress={() => navigation.navigate("Task", { name1, updateTasks })}
      >
        <Image source={require("./assets/Group 13.png")} />
      </TouchableOpacity>
    </View>
  );
}
function TaskScreen({ navigation, route }) {
  return (
    <View>
      <Text>Task</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={require("./assets/Frame1.png")} />
          <View>
            <Text style={{ fontSize: 18, marginLeft: 20, fontWeight: "bold" }}>
              Hi {name1}
            </Text>
            <Text style={{ marginLeft: 10, color: "rgb(214, 214, 216)" }}>
              Have agrate day a head
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ marginLeft: -20 }}
            source={require("./assets/mdi_marker-tick.png")}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 20,
        }}
      >
        ADD YOUR JOB
      </Text>
      {/* fxemoji_note */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 20,
        }}
      >
        <Image source={require("./assets/fxemoji_note.png")} />
        <TextInput
          placeholder="input your job"
          value={newTask}
          onChangeText={setNewTask}
        />
      </View>
      <TouchableOpacity
        style={{
          borderWidth: 0,
          width: 150,
          height: 30,
          borderRadius: 10,
          backgroundColor: "rgb(35, 195, 217)",
          marginLeft: 100,
          marginTop: 40,
        }}
        onPress={handleAddTask}
      >
        <Text style={{ textAlign: "center" }}>FINISH</Text>
      </TouchableOpacity>
      <Image
        style={{ marginTop: 50, marginLeft: 80, height: 200, width: 200 }}
        source={require("./assets/image_95.png")}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Task"
          component={TaskScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
