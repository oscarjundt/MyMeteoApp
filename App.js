import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator,StyleSheet,TextInput, Text, View, Button } from 'react-native';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import { useState,useEffect } from 'react';
import axios from "axios";
import * as Location from 'expo-location';
export default function App() {
  const [location, setLocation] = useState(null);
  const [currentWeather,setCurrentWeather] = useState(null);
  const [forecastWeather,setForecastWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let ApiOther = "api.openweathermap.org/data/2.5/forecast";
  let Api = "https://api.openweathermap.org/data/3.0/onecall?units=metric&lat="+location?.latitude+"&lon="+location?.longitude+"&exclude=hourly,minutely&appid=d6def4924ad5f9a9b59f3ae895b234cb";
  
  useEffect(() => {
    const constinitTasks = async () => {
      try {
        const response = await axios.get(Api);
        const data = response.data;
        setCurrentWeather(data.current);
        setForecastWeather(data.daily.splice(1,5));
      } catch (e) { 
        console.log("Erreur lors de l'appel à l'API : " + e); 
      }
    };
    constinitTasks()
  },[]);
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
        setIsLoading(false); // Masque le loader une fois la récupération terminée
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures this runs only once


  if (isLoading) {
    // Affiche le loader en plein écran pendant le chargement
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement de la localisation...</Text>
      </View>
    );
  }


  return (
    <View>
      <CurrentWeather
      style={styles.header}
      meteo={currentWeather}
      />
      <Button
      onPress={async () => {
        try {
          console.log(Api);
          const response = await axios.get(Api);
          const data = response.data;
          setCurrentWeather(data.current);
          setForecastWeather(data.daily.splice(1,5));
        } catch (e) { 
          console.log("Erreur lors de l'appel à l'API : " + e); 
        }
      }}
      title='ref'
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
  );
}
 

const styles = StyleSheet.create({
  header:{
    margin: 100
  },
  row: {
    flexDirection: 'row', // Aligne les vues en ligne
    flexWrap: 'wrap', // Permet le retour à la ligne si l'écran est trop petit
    justifyContent: 'space-between', // Gère l'espacement entre les vues
    alignItems: 'center',
    width: '100%', // Utilise toute la largeur de l'écran
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Ombre pour Android
    width: '30%', // Adapte la largeur des cartes pour tenir dans l'écran
    alignItems: 'center', // Centre le contenu à l'intérieur de chaque carte
  },
  section:{
      flexDirection: 'row', // Permet d'aligner les vues en ligne
      justifyContent: 'space-between', // Espacement entre les éléments
      alignItems: 'center', // Alignement vertical des éléments
      padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }, loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});
