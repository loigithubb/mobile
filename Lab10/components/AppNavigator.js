import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreenHome from "../components/ScreenHome";
import ScreenListProduct from "../components/ScreenListProduct";
import ScreenProductDetail from "../components/ScreenProductDetail";
import ScreenAddBike from "../components/ScreenAddBike";
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ScreenHome} />
        <Stack.Screen name="List" component={ScreenListProduct} />
        <Stack.Screen name="Detail" component={ScreenProductDetail} />
        <Stack.Screen name="AddBike" component={ScreenAddBike} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
