import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import CheckBox from "react-native-check-box";
const Stack = createStackNavigator();

function Home1({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 350,
          width: 330,
          marginTop: 40,
          borderRadius: 10,
          marginLeft: 15,
        }}
        source={require("./assets/Container 17.png")}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>
        {" "}
        Boost Productivity
      </Text>
      <Text
        style={{ color: "rgb(185, 186, 191)", marginLeft: 15, marginTop: 10 }}
      >
        Simplify tasks, boost productivity
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home2")}
        style={{
          width: 330,
          backgroundColor: "rgb(35, 195, 217)",
          height: 30,
          borderRadius: 5,
          marginLeft: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ marginLeft: 15, textAlign: "center", marginTop: 5 }}>
          Sign up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Home3")}>
        <Text
          style={{
            marginLeft: 15,
            textAlign: "center",
            marginTop: 20,
            marginLeft: 15,
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          marginLeft: 15,
        }}
      >
        <Image source={require("./assets/Rating 3.png")} />
        <Image source={require("./assets/Rating 3.png")} />
        <Image source={require("./assets/Rating 3.png")} />
      </View>
    </View>
  );
}
function Home2({ navigation }) {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://64596be58badff578e0cf0f7.mockapi.io/api/dangnhap",
        {
          email,
          password,
        }
      );
      console.log(response.data);
      navigation.navigate("Home1");
    } catch (error) {
      console.log("Failed to register", error);
    }
  };
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{ marginTop: 30 }}
          source={require("./assets/Rating 3.png")}
        />
      </TouchableOpacity>
      <Image
        style={{ marginLeft: 150, marginTop: 80 }}
        source={require("./assets/Image 19.png")}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Nice to see you!
      </Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 10,
          color: "rgb(185, 186, 191)",
        }}
      >
        Create your account
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 15,
          borderRadius: 10,
          borderWidth: 1,
          width: 330,
          marginTop: 20,
        }}
      >
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 3 }}
          source={require("./assets/codicon_account.png")}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="Enter your user name"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 15,
          borderRadius: 10,
          borderWidth: 1,
          width: 330,
          marginTop: 20,
        }}
      >
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 3 }}
          source={require("./assets/codicon_account.png")}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="Enter your email address"
          value={email}
          onChangeText={setemail}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 15,
          borderRadius: 10,
          borderWidth: 1,
          width: 330,
          marginTop: 20,
        }}
      >
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 3 }}
          source={require("./assets/codicon_account.png")}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="Enter your password"
          value={password}
          onChangeText={setpassword}
        />
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 140 }}
          source={require("./assets/codicon_account.png")}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 3,
          marginTop: 10,
        }}
      >
        <CheckBox
          style={{ padding: 10 }}
          onClick={() => setIsChecked(!isChecked)}
          isChecked={isChecked}
          checkBoxColor={isChecked ? "blue" : "gray"}
        />
        <Text style={{ marginTop: 12 }}>
          I agree with{" "}
          <Text style={{ color: "rgb(159, 204, 239)" }}>
            Terms & Conditions
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        onPress={handleRegister}
        style={{
          width: 330,
          backgroundColor: "rgb(35, 195, 217)",
          height: 30,
          borderRadius: 10,
          marginLeft: 15,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            color: "rgb(248, 250, 252)",
          }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function Home3({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `https://64596be58badff578e0cf0f7.mockapi.io/api/dangnhap`
      );
      const user = response.data;
      const userExist = user.find(
        (user) => user.email === email && user.password === password
      );

      if (userExist) {
        navigation.navigate("Home4");
      } else {
        Alert.alert("Invalid email or password");
      }
    } catch (error) {
      console.log("Failed to login", error);
    }
  };
  return (
    <View>
      <Image source={require("./assets/Image 20.png")} />
      <Text
        style={{
          marginLeft: 15,
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 35,
        }}
      >
        Welcome!
      </Text>
      <Text style={{ marginTop: 40, marginLeft: 15, fontWeight: "bold" }}>
        Email
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 15,
          backgroundColor: "rgb(248, 250, 252)",
          borderWidth: 0.16,
          width: 330,
        }}
      >
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 3 }}
          source={require("./assets/codicon_account.png")}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="Enter your user name"
          value={email}
          onChangeText={setemail}
        />
      </View>
      <Text style={{ marginTop: 20, marginLeft: 15, fontWeight: "bold" }}>
        Password
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 15,
          backgroundColor: "rgb(248, 250, 252)",
          borderWidth: 0.16,
          width: 330,
        }}
      >
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 3 }}
          source={require("./assets/codicon_account.png")}
        />
        <TextInput
          style={{ marginLeft: 10 }}
          placeholder="Enter your password"
          value={password}
          onChangeText={setpassword}
        />
        <Image
          style={{ height: 20, width: 20, marginTop: 4, marginLeft: 140 }}
          source={require("./assets/codicon_account.png")}
        />
      </View>
      <TouchableOpacity
        onPress={handleLogin}
        style={{
          width: 330,
          backgroundColor: "rgb(35, 195, 217)",
          height: 30,
          borderRadius: 10,
          marginLeft: 15,
          marginTop: 100,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            marginTop: 5,
            color: "rgb(248, 250, 252)",
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function Home4({ navigation }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [count, setCount] = useState(0);
  const gia=Number(selectedProduct.price);
  const Counter = () => {
    const [count, setCount] = useState(0);
  };
  
  const images = {
    1: require("./assets/Image 7 (2).png"),
    2: require("./assets/Image 7 (1).png"),
    3: require("./assets/Image 7 (4).png"),
    4: require("./assets/Image 7.png"),
  };
  //Fetch data from API
  useEffect(() => {
    axios
      .get("https://64596be58badff578e0cf0f7.mockapi.io/api/hinh4")
      .then((response) => {
        setProducts(response.data); // Lưu sản phẩm vào state
        setSelectedProduct(response.data[0]); // Chọn sản phẩm đầu tiên mặc định
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);
  const handleImagePress = (productId) => {
    const product = products.find((product) => product.id === productId);
    setSelectedProduct(product);
    console.log(selectedProduct);
  };
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => navigation.goBack()}
        >
          <Image style={{}} source={require("./assets/Rating 3.png")} />
        </TouchableOpacity>
        <Text style={{ marginTop: 22, marginLeft: 20 }}>Product name</Text>
      </View>
      <View
        style={{
          height: 200,
          width: 330,
          borderRadius: 10,
          borderWidth: 1,
          marginTop: 10,
          marginLeft: 15,
        }}
      >
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 10,
            borderWidth: 1,
            marginLeft: 100,
          }}
          source={images[selectedProduct?.id]}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-around",
          flexDirection: "row",
          marginLeft: 7,
          marginTop: 10,
          marginRight: 7,
        }}
      >
        <TouchableOpacity onPress={() => handleImagePress("1")}>
          <View style={{ borderWidth: 1, borderRadius: 10 }}>
            <Image source={require("./assets/Image 7 (2).png")} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleImagePress("2")}>
          <View style={{ borderWidth: 1, borderRadius: 10 }}>
            <Image source={require("./assets/Image 7 (1).png")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress("3")}>
          <View style={{ borderWidth: 1, borderRadius: 10 }}>
            <Image source={require("./assets/Image 7 (4).png")} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleImagePress("4")}>
          <View style={{ borderWidth: 1, borderRadius: 10 }}>
            <Image source={require("./assets/Image 7.png")} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
        <Text style={{ marginLeft: 15, fontSize: 24, fontWeight: "bold" }}>
          {selectedProduct.price}
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 5,
            marginLeft: 10,
            backgroundColor: "pink",
            height: 25,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              textAlign: "center",
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            Buy 1 get 1
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ marginLeft: 15, marginTop: 10, fontWeight: "bold" }}>
            {selectedProduct.name}
          </Text>
          <Text style={{ marginLeft: 15 }}>tiem hot nhat 123456</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Image
            style={{ marginTop: 15 }}
            source={require("./assets/Rating 3.png")}
          />
          <Text style={{ marginTop: 15, marginRight: 20, marginLeft: 5 }}>
            {selectedProduct.sao}
          </Text>
        </View>
      </View>
      <Text style={{ marginTop: 10, marginLeft: 15 }}>Size</Text>
      <View style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}>
        <View style={{ borderWidth: 1, borderRadius: 2, height: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 10,
                marginRight: 5,
                paddingRight: 5,
              }}
            >
              XS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 2, height: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 10,
                marginRight: 5,
                paddingRight: 5,
              }}
            >
              S
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 2, height: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 10,
                marginRight: 5,
                paddingRight: 5,
              }}
            >
              M
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 2, height: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 10,
                marginRight: 5,
                paddingRight: 5,
              }}
            >
              L
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ borderWidth: 1, borderRadius: 2, height: 30 }}>
          <TouchableOpacity>
            <Text
              style={{
                marginLeft: 15,
                marginTop: 10,
                marginRight: 5,
                paddingRight: 5,
              }}
            >
              XL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ marginTop: 10, marginLeft: 15 }}>Quantity</Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setCount(count-1)}>
            <Image source={require("./assets/Button 5.png")} />
          </TouchableOpacity  >
          <Text style={{ marginLeft: 5, marginRight: 5, marginTop: 8 }}>{count}</Text>
          <TouchableOpacity onPress={() => setCount(count+1)}>
            <Image source={require("./assets/Button 5.png")} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginRight: 15,
            marginTop: 2,
          }}
        >
          <Text>
            Total <Text style={{ fontSize: 22, fontWeight: "bold" }}>{gia*count}</Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
          marginLeft: 15,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Size guide</Text>
        <Image
          style={{ marginRight: 13 }}
          source={require("./assets/Rating 3.png")}
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 15,
          marginLeft: 15,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Reviews(99)</Text>
        <Image
          style={{ marginRight: 13 }}
          source={require("./assets/Rating 3.png")}
        />
      </View>
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
        <Stack.Screen
          name="Home4"
          component={Home4}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
