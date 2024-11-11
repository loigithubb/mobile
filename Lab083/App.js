import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

const Stack = createStackNavigator();

const Home1 = ({ navigation }) => {
  const [name, setname] = useState("");
  return (
    <View
      style={{
        width: 375,
        height: 667,
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
      }}
    >
      <Image
        style={{ marginLeft: 50 }}
        source={require("./assets/Image 95 (2).png")}
      />
      <Text style={{ textAlign: "center", color: "pink", fontWeight: "bold" }}>
        MANAGER YOUR{"\n"}TASK
      </Text>

      <View
        style={{
          width: 330,
          height: 30,
          borderWidth: 1,
          borderRadius: 5,
          marginTop: 50,
          marginLeft: 15,
        }}
      >
        <TextInput
          style={{ textAlign: "center" }}
          placeholder="Enter your name"
          value={name}
          onChangeText={setname}
        />
      </View>
      <TouchableOpacity
        style={{ marginTop: 100 }}
        onPress={() => navigation.navigate("Home2", { name })}
      >
        <View
          style={{
            width: 150,
            height: 30,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "blue",
            marginLeft: 100,
          }}
        >
          <Text style={{ textAlign: "center" }}>Get Started {"->"}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Home2 = ({ navigation, route }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://64596be58badff578e0cf0f7.mockapi.io/api/baimoi"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (route.params?.newJob) {
      setData((prevData) => [...prevData, route.params.newJob]);
    }
  }, [route.params?.newJob]);
  useEffect(() => {
    if (route.params?.updatedJob) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === route.params.updatedJob.id
            ? route.params.updatedJob
            : item
        )
      );
    }
  }, [route.params?.updatedJob]);
  const deleteItem = async (id) => {
    try {
      await fetch(
        `https://64596be58badff578e0cf0f7.mockapi.io/api/baimoi/${id}`,
        {
          method: "DELETE",
        }
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
      }}
    >
      <TouchableOpacity onPress={() => deleteItem(item.id)}>
        <Image source={require("./assets/Frame (7).png")} />
      </TouchableOpacity>
      <Text>{item.title}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Home3", { job: item, isEdit: true })
        }
      >
        <Image source={require("./assets/Frame (4).png")} />
      </TouchableOpacity>
    </View>
  );

  const { name } = route.params;
  return (
    <View
      style={{
        width: 375,
        height: 667,
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("./assets/Frame (7).png")} />
        </TouchableOpacity>
        <View
          style={{ display: "flex", flexDirection: "row", marginLeft: 100 }}
        >
          <Image source={require("./assets/Frame (6).png")} />
          <View>
            <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
              Hi {name}
            </Text>
            <Text style={{ marginLeft: 10 }}>Have agrate day a head</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          width: 330,
          height: 30,
          borderRadius: 5,
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
          marginLeft: 15,
        }}
      >
        <Image source={require("./assets/Frame (7).png")} />
        <TextInput placeholder="Search" />
      </View>
      <FlatList
        style={{ marginTop: 15 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={{ marginBottom: 130, marginLeft: 150 }}
        onPress={() => navigation.navigate("Home3", { name })}
      >
        <Image source={require("./assets/Group 13 (1).png")} />
      </TouchableOpacity>
    </View>
  );
};

const Home3 = ({ navigation, route }) => {
  const isEdit = route.params?.isEdit || false;
  const job = route.params?.job || {};
  const { name } = route.params;
  const [name1, setname1] = useState("");
  const addJob = async () => {
    if (name1) {
      try {
        const response = await fetch(
          "https://64596be58badff578e0cf0f7.mockapi.io/api/baimoi",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: name1 }), // Cập nhật cấu trúc dữ liệu
          }
        );
        const result = await response.json();
        if (response.ok) {
          navigation.navigate("Home2", { newJob: result });
          setname1(""); // Reset trường nhập liệu
        } else {
          console.error("Failed to add job:", result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (isEdit && job.name) {
      setname1(job.name);
    }
  }, [isEdit, job]);
  const handleFinish = async () => {
    if (name1) {
      try {
        const url = isEdit
          ? `https://64596be58badff578e0cf0f7.mockapi.io/api/baimoi/${job.id}`
          : `https://64596be58badff578e0cf0f7.mockapi.io/api/baimoi`;

        const response = await fetch(url, {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: name1 }),
        });

        const result = await response.json();
        console.log("API response:", result);

        if (response.ok) {
          navigation.navigate("Home2", { updatedJob: result });
        } else {
          console.error("Failed to save job:", result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Name1 is empty");
    }
  };

  return (
    <View
      style={{
        width: 375,
        height: 667,
        borderWidth: 1,
        marginLeft: 15,
        marginRight: 15,
      }}
    >
      <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image source={require("./assets/Frame (6).png")} />
          <View>
            <Text style={{ marginLeft: 10, fontWeight: "bold", fontSize: 18 }}>
              Hi {name}
            </Text>
            <Text style={{ marginLeft: 10 }}>Have agrate day a head</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 100 }}
          onPress={() => navigation.goBack()}
        >
          <Image source={require("./assets/Frame (7).png")} />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          textAlign: "center",
          color: "pink",
          fontWeight: "bold",
          fontSize: 22,
          marginTop: 20,
        }}
      >
        {isEdit ? "EDIT YOUR JOB" : "ADD YOUR JOB"}
      </Text>
      <View
        style={{
          width: 330,
          height: 30,
          borderRadius: 5,
          borderWidth: 1,
          display: "flex",
          flexDirection: "row",
          marginTop: 15,
          marginLeft: 15,
        }}
      >
        <Image source={require("./assets/Frame (7).png")} />
        <TextInput
          placeholder="Input your job"
          value={name1}
          onChangeText={setname1}
        />
      </View>
      <TouchableOpacity
        style={{ marginTop: 100 }}
        onPress={isEdit ? handleFinish : addJob}
      >
        <View
          style={{
            width: 150,
            height: 30,
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: "blue",
            marginLeft: 100,
          }}
        >
          <Text style={{ textAlign: "center" }}>FINISH {"->"}</Text>
        </View>
      </TouchableOpacity>
      <Image
        style={{ height: 200, width: 200, marginTop: 100, marginLeft: 70 }}
        source={require("./assets/Image 95 (2).png")}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home1">
        <Stack.Screen name="Home1" component={Home1} />
        <Stack.Screen name="Home2" component={Home2} />
        <Stack.Screen name="Home3" component={Home3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
