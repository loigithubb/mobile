import react, {useState} from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useNavigation } from '@react-navigation/native';

export default function Screen01() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try{
      const response = await fetch('https://6715e56333bc2bfe40bb7301.mockapi.io/data');
      const data = await response.json();

      const user = data.find(u => u.email === email);

      if (user){
        navigation.navigate('Api_Screen_02', {email});
      }else{
        Alert.alert('Error', 'Invalid credentials');
      }
    }catch(error){
      Alert.alert('Error', 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}> 
        <Image source={require("../assets/Image_95.png")}
              style={styles.image}
        />
      </View>
      <Text style={styles.title}>
        MANAGE YOUR{'\n'}TASK
      </Text>
      <View style={styles.inputContainer}>
        <Fontisto name="email" size={24} color="black" />
        <TextInput 
          style={styles.textInput}
          placeholder="Enter your name"
          placeholderTextColor = "#999"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>GET STARTED ➔</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    backgroundColor:'#fff'
  },
  imageContainer:{
    marginVertical:50,
  },
  image:{
    width:271,
    height:271,
    resizeMode:'contain',
  }, 
  title:{
    fontSize:24,
    fontWeight:'bold',
    color:'#8353E2',
    textAlign:'center',
    marginBottom:20,
  },  
  inputContainer:{
    flexDirection:'row',
    width:'90%',
    padding:5,
    borderWidth:1,
    borderRadius:10,
    marginBottom:20,
    alignItems:'center'
  },
  textInput:{
    flex:1,
    padding:5,
  },
  button:{
    backgroundColor:'#00BDD6',
    padding:10,
    borderRadius:10,
    width:'50%',
    alignItems:'center'
  },
  buttonText:{
    color:'#fff',
    fontSize:16,

  },
});