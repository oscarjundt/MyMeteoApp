import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import axios from "axios";
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Meteo({val}) {
  const [meteo,setMeteo] = useState([])
  let Api = "https://api.openweathermap.org/data/3.0/onecall/day_summary?units=metric&lat=45.769651322465904&lon=4.806347187391293&date="+val+"&exclude=hourly,minutely&appid=d6def4924ad5f9a9b59f3ae895b234cb";
  const constinitTasks = async () => {
    try {
      console.log(Api);
      const response = await axios.get(Api);
      const data = response.data;
      console.log(data.temperature);
      setMeteo(data);
    } catch (e) { 
      console.log("Erreur lors de l'appel à l'API : " + e); 
    }
  };

  return (
    <View>
      <Button
        onPress={()=>{
        constinitTasks()
        }}
        title='submit'
      />
      <StatusBar style="auto" />
    </View>
  );
} 
