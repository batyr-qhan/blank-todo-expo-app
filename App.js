import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, StatusBar as RNStatusBar, FlatList, Button, Alert, Platform, ImageBackground, Image, ScrollView } from 'react-native';
import IOSButton from './components/IOSButton';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';

import { EvilIcons } from '@expo/vector-icons';

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

  const [loaded, error] = useFonts({
    JosefinSans_400Regular
  })

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <Image source={require("./assets/Background.png")} style={styles.backgroundImage} resizeMode="cover" />
        
        <View style={styles.scrollViewContainer}>

          <Text style={{ fontFamily: "JosefinSans_400Regular", ...styles.headerTitle }}>Todo</Text>

          <TextInput style={styles.input} value={inputValue} onChangeText={v => {
            console.log(v)
            setInputValue(v)
          }} />

          {
            Platform.OS === "ios" ? <IOSButton title="IOS Button Create Todo" onPress={() => {
              handleAddTodo()
            }} /> : <Button title='Create Todo' onPress={() => {
              handleAddTodo()
            }} />
          }

          <FlatList
            style={styles.listContainer}
            data={todos}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider >

  );
}

const Item = ({ title }) => (
  <View style={styles.item}>

    <Text style={styles.itemTitle}>{title}</Text>
    <EvilIcons name='close' size={32} />
  </View>
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: RNStatusBar.currentHeight || 0,
    backgroundColor: '#e2e2e2',
    paddingTop: "20%",

  },
  input: {
    height: 60,
    marginVertical: 12,
    paddingHorizontal: 10,
    fontFamily: "JosefinSans_400Regular",
    fontSize: 20,
    backgroundColor: "#fff",
    borderRadius: 5,

  },
  item: {
    padding: 20,
    marginVertical: 8,
    // marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1
  },
  itemTitle: {
    fontSize: 24,
    fontFamily: "JosefinSans_400Regular",

  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    backgroundColor: 'red'
  },
  imageWrapper: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    backgroundColor: 'red'
  },
  scrollViewContainer: {
    flex: 1,
    padding: 16
  },
  headerTitle: {
    textTransform: "uppercase",
    fontSize: 24,
    color: "white",
    fontWeight: 600,
    letterSpacing: 8
  },
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
  marginTop: 16
  }
});
