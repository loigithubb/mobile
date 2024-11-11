import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Item1 from "../components/Item1";
import { fetchBikes } from "../components/features/bikes/bikesSlice";
const ScreenListProduct = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items: bikes, status } = useSelector((state) => state.bikes);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBikes());
    }
  }, [status, dispatch]);
  useEffect(() => {
    setFilteredData(
      selectedCategory === "All"
        ? bikes
        : bikes.filter((item) => item.category === selectedCategory)
    );
  }, [selectedCategory, bikes]);
  return (
    <ScrollView>
      <Text style={styles.textHeaderList}>The world’s Best Bike</Text>
      {/* Nút chọn loại xe */}
      <View style={styles.buttonContainer}>
        {["All", "Roadbike", "Mountain"].map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.buttonList}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={{
                ...styles.textButtonList,
                color: selectedCategory === category ? "red" : "#beb6b6",
              }}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Detail", { product: item })}
            >
              <Item1 img={item.img} name={item.name} price={item.price} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  buttonList: {
    width: 99,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 1,
  },
  textButtonList: {
    fontFamily: "Voltaire",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 24.91,
  },
  textHeaderList: {
    fontFamily: "Ubuntu",
    textAlign: "left",
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 29.73,
    paddingLeft: 10,
    color: "red",
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
});
export default ScreenListProduct;
