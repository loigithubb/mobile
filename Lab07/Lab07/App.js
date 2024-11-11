import react from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screen01 from './components/API_Screen_01';
import Screen02 from './components/API_Screen_02';
import Screen03 from './components/API_Screen_03';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name = "Home" component={Screen01} options={{ headerShown: false }} />
        <Stack.Screen name = "Api_Screen_02" component={Screen02} options={{headerShown:false}} />
        <Stack.Screen name = "Api_Screen_03" component={Screen03} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}