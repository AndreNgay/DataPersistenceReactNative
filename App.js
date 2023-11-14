import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-web';
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
    else {
      appRef.add(container)
      .then(() => {
        alert("wow you added somethin'");
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  const [fetchedData, setFetchedData] = useState([]);

  const fetchFromDB = () => {
    appRef.orderBy('createdAt', 'desc').onSnapshot(
      querySnaphot => {
        const dataContainer = []
        querySnaphot.forEach((document) => {
          const { createdAt, description } = document.data();
          dataContainer.push({
            id: document.id, 
            createdAt, 
            description
          })
          setFetchedData(dataContainer);
        })
      }
    )
  }

  useEffect(() => {
    fetchFromDB();
  }, [])

  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter text" onChangeText={(value) => {
        setUserInput(value) 
      }}/>

      <TouchableOpacity>
        <Text onPress={addToDB}>Add to Database</Text>
      </TouchableOpacity>

      <FlatList 
        data={fetchedData}
        renderItem = {({item}) =>(
          <Text>{item.description}</Text>
        )}
      />
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
