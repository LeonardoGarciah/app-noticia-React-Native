import React,{useState,useEffect} from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as firebase from "firebase/app";
import { db } from "./firebase.js";

function HomeScreen({ navigation }) {

  const [noticias,setarNoticias] = useState([]);

  useEffect(() => {
    db.collection('noticias').orderBy('data','desc').onSnapshot(snapshot=>{
      setarNoticias(snapshot.docs.map((doc)=>{
        return {info:doc.data()}
      }));
    });

  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.4 }}>
        <ScrollView
          horizontal
          contentContainerStyle={{ width: "200%", height: 250 }}
          style={{ flex: 1 }}
        >

{
          noticias.map((val,index)=>{
            if(index < 2){
              return(
          <ImageBackground
            source={{ uri: val.info.imagem }}
            resizeMode="cover"
            style={styles.image}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Noticia", {
                  titulo: val.info.titulo,
                  noticia: val.info.conteudo,
                  imagem:val.info.imagem
                })
              }
              style={styles.shadow}
            ></TouchableOpacity>
            <Text style={{ fontSize: 29, color: "white" }}>
              { val.info.titulo}
            </Text>
          </ImageBackground>
              )

            
          }
          })
}
          
        </ScrollView>
      </View>
      <View style={{ flex: 0.6, padding: 20 }}>
        <View
          style={{
            width: 50,
            height: 2,
            backgroundColor: "#069",
            position: "absolute",
            left: 40,
            top: 40,
          }}
        ></View>
        <Text>Mais noticias!</Text>

        <ScrollView contentContainerStyle={{ padding: 20 }} style={{ flex: 1 }}>
          {
          noticias.map((val,index)=>{
            if(index >= 2){
              return(
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() =>
                navigation.navigate("Noticia", {
                  titulo: val.info.titulo,
                  noticia: val.info.conteudo,
                  imagem:val.info.imagem
                })
              }
            >
              <Image
                source={{ uri: val.info.imagem }}
                style={{ width: 100, height: 100 }}
              ></Image>
              <Text style={{ padding: 10,width:'75%' }}>{val.info.titulo}</Text>
            </TouchableOpacity>
          </View>
                           )

            
                          }
                          })
                }
        </ScrollView>
      </View>
    </View>
  );
}

function NoticiaScreen({ route, navigation }) {

  return (
    <View  style={{flex:1}}>
    <ScrollView style={{ flex: 1 }} >
      <ImageBackground
            source={{ uri: route.params.imagem }}
            resizeMode="cover"
            style={styles.imageNoticia}
          >
      <View style={styles.shadow}>

            <Text style={{ fontSize: 29, color: "white" }}>
              { route.params.titulo}
            </Text>
            </View>
          </ImageBackground>
          
          <View style={{flex:1,padding:20}}>
          
      {
        route.params.noticia.split("/n").map((val)=>{
          return(
          <Text style={{fontSize:15,padding:3}}>{val}</Text>
          )
    })
      }
      </View>
    </ScrollView>
    </View>
  );
}
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Portal" component={HomeScreen} />
        <Stack.Screen name="Noticia" component={NoticiaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },  imageNoticia: {
    resizeMode: "cover",
    flex: 0.6,
    width: "100%",
    height:200
  },
  shadow: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent:'flex-end'
  },
});
