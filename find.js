import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,ImageBackground ,StyleSheet,TextInput, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import { useState,useEffect } from 'react';
import axios from "axios";
import * as Location from 'expo-location';
import { Appbar } from 'react-native-paper';
import styles from './style';

export default function find({navigation}) {

    const [location, setLocation] = useState(null);
    const [currentWeather,setCurrentWeather] = useState(null);
    const [forecastWeather,setForecastWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [city,setCity] = useState("")
    const [input,setInput] = useState("");
    let ApiOther = "api.openweathermap.org/data/2.5/forecast";
    let Api = "https://api.openweathermap.org/data/3.0/onecall?units=metric&lat="+location?.latitude+"&lon="+location?.longitude+"&exclude=hourly,minutely&appid=d6def4924ad5f9a9b59f3ae895b234cb";
    
    useEffect(() => {
      const constinitTasks = async () => {
        try {
            setIsLoading(true);
          let Api = "https://api.openweathermap.org/data/3.0/onecall?units=metric&lat="+location?.latitude+"&lon="+location?.longitude+"&exclude=hourly,minutely&appid=d6def4924ad5f9a9b59f3ae895b234cb";
          const response = await axios.get(Api);
          const data = response.data;
          setCurrentWeather(data.current);
          setForecastWeather(data.daily.splice(1,5));
          setCity(input);
          setIsLoading(false);
        } catch (e) { 
            setIsLoading(false);
            Alert("Ereur");
          console.log("Erreur lors de l'appel à l'API2 : " + e); 
        }
      };
      constinitTasks()
    },[location]);
  
    if (isLoading) {
  
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Chargement de la localisation...</Text>
        </View>
      );
    }
  
  
    return (
        <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View>
        <View style={styles.groupInput}>
         <TextInput type="text" onChangeText={(text)=>{
          setInput(text);
        }} value={input}
        style={styles.input}
        placeholder='choisir une ville'
        />
        <Button
        onPress={async () => {
          try {
            const response = await axios.get("https://api.openweathermap.org/geo/1.0/direct?q="+input+",fr&limit=1&appid=d6def4924ad5f9a9b59f3ae895b234cb");
            const data = response.data[0];
            setLocation({"latitude":data.lat,"longitude":data.lon});
          } catch (e) { 
            console.log("Erreur lors de l'appel à l'API : " + e); 
          }
        }}
        title='ref'
        />
        </View>
        <CurrentWeather
        icon={currentWeather?.weather[0].icon}
        ville={city}
        style={styles.header}
        meteo={currentWeather}
        />
        <View style={styles.row}>
        {forecastWeather?.map(element => {
          return <ForecastWeather
          style={styles.card}
          key={element.dt}
          meteo={element}
          />
        })}
        </View>
        <StatusBar style="auto" />
      </View>
      </ImageBackground>
    );
}
  