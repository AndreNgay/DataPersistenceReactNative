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
  }, []);

  const deleteFromDB = (id) => {
    appRef.doc(id).delete()
    .then(() => {
      alert('Deleted')
    })
    .catch((error) => {
      console.log(error)
    })
  }

 
  return (
<View style={styles.container}>
  <TextInput
    style={styles.input}
    placeholder="Enter text"
    onChangeText={(value) => setUserInput(value)}
  />

  <TouchableOpacity style={styles.button} onPress={addToDB}>
    <Text style={styles.buttonText}>Add to Database</Text>
  </TouchableOpacity>

  <FlatList
    data={fetchedData}
    renderItem={({ item }) => (
      <View style={styles.listItem}>
        <Text>{item.description}</Text>
        <TouchableOpacity onPress={() => deleteFromDB(item.id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    )}
  />
</View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deleteButton: {
    color: 'red',
  },
});

