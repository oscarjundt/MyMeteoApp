import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { Button, StyleSheet,Image, Text, View } from 'react-native';

export default function CurrentWeather({meteo,style,ville,icon}) {

  return (
    <View style={style}>
      <Text>{ville}</Text>
      <Text>{new Date(meteo?.dt*1000).toLocaleString()}</Text>
      <Text>{parseInt(meteo?.temp)}°</Text>
      <Image 
      source={{ uri: 'https://openweathermap.org/img/wn/'+icon+'@2x.png' }}
      style={{ width: 200, height: 200 }}
      />
      <StatusBar style="auto" />
    </View>
  );
} 

