import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const Stack = createStackNavigator();

function Home1({ navigation }) {
  const [name, setName] = useState("");
  return (
    <View style={{ width: 375, height: 667, borderWidth: 1 }}>
      <Image source={require("./assets/Image 95 (1).png")} />
      <Text style={{ marginTop: 50, marginLeft: 15, textAlign: "center" }}>
        MANAGE YOUR TASK
      </Text>
      <View
        style={{
          borderWidth: 1,
          width: 330,
          height: 35,
          marginLeft: 15,
          display: "flex",
          flexDirection: "row",
          marginTop: 50,
        }}
      >
        <Image
          style={{ marginTop: 5 }}
          source={require("./assets/fxemoji_note (1).png")}
        />
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Home2", { name })}>
        <View
          style={{
            borderWidth: 1,
            backgroundColor: "blue",
            width: 200,
            height: 30,
            marginLeft: 85,
            marginTop: 50,
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "gray", textAlign: "center" }}>
            GET STARTED -{">"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
function Home2({ navigation, route }) {
  const { name } = route.params;
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const searchFilterFunction = async (text) => {
    setSearch(text);
    if (text) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.example.com/search?query=${text}`
        );
        const result = await response.json();
        setData(result.items); // Giả sử kết quả trả về có dạng { items: [...] }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    if (route.params?.newJob) {
      setData(prevData => [...prevData, route.params.newJob]);
      setFilteredData(prevData => [...prevData, route.params.newJob]);
    }
  }, [route.params?.newJob]);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://64596be58badff578e0cf0f7.mockapi.io/api/api"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderItem = ({ item }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        marginTop: 5,
      }}
    >
      <Text>{item.title}</Text>
      <Image source={require("./assets/mingcute_search-fill (2).png")} />
    </View>
  );
  return (
    <View style={{ width: 375, height: 667, borderWidth: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ marginTop: 10 }}
            source={require("./assets/mingcute_search-fill (2).png")}
          />
        </TouchableOpacity>
        <View
          style={{
            marginLeft: 200,
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Image
            style={{ marginRight: 15 }}
            source={require("./assets/Avatar 31 (1).png")}
          />
          <Text style={{ marginTop: 3, marginRight: 30 }}>
            Hi {name}
            {"\n"}
            <Text style={{ marginTop: 3, marginRight: 30 }}>
              Let's get started
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
        <Image source={require("./assets/mingcute_search-fill (2).png")} />
        <TextInput placeholder="Search"></TextInput>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("Home3", { name })}>
        <Image source={require("./assets/mingcute_search-fill (2).png")} />
      </TouchableOpacity>
    </View>
  );
}
function Home3({ navigation, route }) {
  const [job, setJob] = useState("");
  const addJob = async () => {
    if (job) {
      try {
        const response = await fetch("https://api.example.com/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: job }),
        });
        const result = await response.json();
        if (response.ok) {
          // Truyền dữ liệu mới về Home2
          navigation.navigate("Home2", { newJob: result });
        } else {
          console.error("Failed to add job:", result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  const { name } = route.params;
  return (
    <View style={{ width: 375, height: 667, borderWidth: 1 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Image
            style={{ marginRight: 15 }}
            source={require("./assets/Avatar 31 (1).png")}
          />
          <Text style={{ marginTop: 3, marginRight: 30 }}>
            Hi {name}
            {"\n"}
            <Text style={{ marginTop: 3, marginRight: 30 }}>
              Let's get started
            </Text>
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{ marginTop: 10 }}
            source={require("./assets/mingcute_search-fill (2).png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: 200,
          height: 30,
          marginLeft: 15,
          marginTop: 100,
          borderWidth: 1,
        }}
      >
        <TextInput
          placeholder="input put your job"
          value={job}
          onChangeText={setJob}
        ></TextInput>
      </View>
      <TouchableOpacity style={{ marginTop: 100 }} onPress={addJob}>
        <Text>FINISH -{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home1">
        <Stack.Screen
          name="Home1"
          component={Home1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home2"
          component={Home2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home3"
          component={Home3}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
