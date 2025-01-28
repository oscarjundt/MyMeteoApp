import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, Text, View } from 'react-native';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import { useState,useEffect } from 'react';
import * as Location from 'expo-location';
export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Accès à la localisation refusé');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLocation(location.coords);
      } catch (error) {
        setErrorMsg('Erreur lors de la récupération de la localisation');
        console.error(error);
      }
    };

    getLocation();
  }, []); // Empty dependency array ensures this runs only once


  return (
    <View style={styles.container}>
      <CurrentWeather
      val={location}
      />
      <ForecastWeather
      val={location}
      />
      <StatusBar style="auto" />
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
