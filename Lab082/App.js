import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";

// App.js

const Stack = createStackNavigator();

// Màn hình Home
function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Giá trị tìm kiếm

  const handleFilter = (title) => {
    if (title === "Donut") {
      // Nếu người dùng nhấn "Donut", hiển thị toàn bộ danh sách (không lọc)
      setFilteredData([]);
    } else {
      // Lọc danh sách dựa trên tiêu chí
      const result = data.filter((item) => item.title === title);
      setFilteredData(result); // Cập nhật dữ liệu đã lọc
    }
  };
  const handleSearch = (text) => {
    // Lọc danh sách dựa trên từ khóa tìm kiếm
    setSearchQuery(text);
    if (text) {
      const result = data.filter((item) => item.title.includes(text));
      setFilteredData(result);
    } else {
      setFilteredData([]);
    }
  };

  const imageMap = {
    1: require("./assets/donut_yellow 1.png"),
    2: require("./assets/tasty_donut 1 (1).png"),
    3: require("./assets/green_donut 1.png"),
    4: require("./assets/donut_red 1.png"),
    // Thêm các hình ảnh khác nếu cần
  };
  // Hàm fetch dữ liệu từ mock API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://64596be58badff578e0cf0f7.mockapi.io/api/blank"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);
  const renderItem = ({ item }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "pink",
        borderRadius: 5,
        marginTop: 10,
      }}
    >
      <Image source={imageMap[item.id]} />
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
          {item.title}
        </Text>
        <Text style={{ marginTop: 10 }}>{item.noidung}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            {item.price}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Details",{item})}>
            <Image
              style={{ marginLeft: 120 }}
              source={require("./assets/plus_button.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
  // viết hàm so sánh từng chữ trong item.title với touchableopacity và trả về kết quả flatlist

  return (
    <View style={{ marginLeft: 10, marginTop: 20, marginRight: 10 }}>
      <Text style={{ fontSize: 15 }}>Welcome,jala!</Text>
      <Text style={{ fontSize: 17, fontWeight: "bold" }}>
        Choice you Best food
      </Text>
      <View style={{ width: 330, height: 30, borderRadius: 5, borderWidth: 1 }}>
        <TextInput
          placeholder="Search food"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => handleFilter("Donut")}>
          <View
            style={{ width: 100, height: 25, borderWidth: 1, borderRadius: 5 }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Donut
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter("Pink Donut")}>
          <View
            style={{ width: 100, height: 25, borderWidth: 1, borderRadius: 5 }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Pink Donut
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter("Floating Donut")}>
          <View
            style={{ width: 100, height: 25, borderWidth: 1, borderRadius: 5 }}
          >
            <Text style={{ textAlign: "center", fontWeight: "bold" }}>
              Floating
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData.length > 0 ? filteredData : data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Màn hình Details
function DetailsScreen({ navigation,route }) {
  const [count, setCount] = useState(0);
  //viết hàm tăng giảm số lượng sản phẩm

  const handleIncrease = () => {
    setCount(count + 1);
  };
  const handleDecrease = () => {
      setCount(count - 1);
    }
  const { item } = route.params;
  return (
    <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10 }}>
      <Image
        style={{ marginLeft: 40 }}
        source={require("./assets/pink_donut 1.png")}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.title}</Text>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text>{item.noidung}</Text>
        <Text style={{ marginLeft: 145 }}>${parseFloat(item.price)*count}</Text>
      </View>
      <Text style={{ marginTop: 25 }}>Delivery in</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ marginTop: 10 }}>30 min</Text>
        <View
          style={{ marginLeft: 100, display: "flex", flexDirection: "row" }}
        >
          <TouchableOpacity onPress={handleDecrease}>
            <Image source={require("./assets/Group 16.png")} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 10, marginRight: 10 }}>{count}</Text>
          <TouchableOpacity onPress={handleIncrease}>
            <Image source={require("./assets/Group 15.png")} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
        Restaurants info
      </Text>
      <Text style={{ marginTop: 10 }}>
        Order a Large Pizza but the size is the equivalent{"\n"}of a
        medium/small from other places at the{"\n"}same price range.
      </Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View
          style={{
            width: 335,
            height: 40,
            backgroundColor: "pink",
            borderRadius: 5,
            marginTop: 50,
          }}
        >
          <Text style={{ textAlign: "center", marginTop: 10, fontSize: 18 }}>
            Add to Cart
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

// App chính
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
