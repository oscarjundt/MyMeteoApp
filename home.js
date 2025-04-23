import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,StyleSheet,ImageBackground,TextInput, Text, View, Button } from 'react-native';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import { useState,useEffect } from 'react';
import axios from "axios";
import * as Location from 'expo-location';
import styles from './style';
export default function find({navigation}) {

    const [location, setLocation] = useState(null);
    const [currentWeather,setCurrentWeather] = useState(null);
    const [forecastWeather,setForecastWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [input,setInput] = useState("");
    let ApiOther = "api.openweathermap.org/data/2.5/forecast";
    let Api = "https://api.openweathermap.org/data/3.0/onecall?units=metric&lat="+location?.latitude+"&lon="+location?.longitude+"&exclude=hourly,minutely&appid=d6def4924ad5f9a9b59f3ae895b234cb";
    
    useEffect(() => {
      const constinitTasks = async () => {
        try {
          let Api = "https://api.openweathermap.org/data/3.0/onecall?units=metric&lat="+location?.latitude+"&lon="+location?.longitude+"&exclude=hourly,minutely&appid=d6def4924ad5f9a9b59f3ae895b234cb";
          const response = await axios.get(Api);
          const data = response.data;
          setCurrentWeather(data.current);
          setForecastWeather(data.daily.splice(1,5));
        } catch (e) { 
          console.log("Erreur lors de l'appel à l'API2 : " + e); 
        }
      };
      constinitTasks()
    },[location]);
    useEffect(() => {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Accès à la localisation refusé');
          return;
        }
  
        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location.coords);
        } catch (error) {
          setErrorMsg('Erreur lors de la récupération de la localisation');
          console.error(error);
        }finally {
          setIsLoading(false);
        }
      };
  
      getLocation();
    }, []);
  
  
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
        <CurrentWeather
        icon={currentWeather?.weather[0].icon}
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
  