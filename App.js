import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar as RNStatusBar, FlatList, Button, Alert, Platform } from 'react-native';
import IOSButton from './components/IOSButton';

const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export default function App() {
  const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([])

  const handleAddTodo = () => {
    setTodos(prev => [{
      id: generateId(),
      title: inputValue,
    }, ...prev])
    setInputValue("")
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>

      <TextInput style={styles.input} value={inputValue} onChangeText={v => {
        console.log(v)
        setInputValue(v)
      }} />

      {
        Platform.OS === "ios" ? <IOSButton title="IOS Button Create Todo" onPress={() => {
          Alert.alert("ios button clicked")
          handleAddTodo()
        }} /> : <Button title='Create Todo' color="#841584" onPress={() => {
          Alert.alert("android button clicked")
          handleAddTodo()
        }} />
      }





      <FlatList
        data={todos}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RNStatusBar.currentHeight || 0,
    backgroundColor: 'green',
    paddingTop: "20%",
    padding: 16
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
