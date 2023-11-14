import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-web';
import { firebase } from './config';

export default function App() {
  // Connection to the firestore db
  const appRef = firebase.firestore().collection('myTable');
  const [userInput, setUserInput] = useState('');

  const timestamp = firebase.firestore.FieldValue.serverTimestamp();

  const container = {
    createdAt: timestamp,
    description: userInput,
  }

  const addToDB = () => {
    if(!userInput) {
      alert('Empty fields');
    }
    appRef.add(container)
    .then(() => {
      alert("wow you added somethin'");
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter text" onChangeText={(value) => {
        setUserInput(value);
      }}/>

      <TouchableOpacity>
        <Text onPress={addToDB}>Add to Database</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
