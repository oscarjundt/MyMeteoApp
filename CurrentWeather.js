import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CurrentWeather({meteo,style}) {

  return (
    <View style={style}>
      <Text>{new Date(meteo?.dt*1000).toLocaleString()}</Text>
      <Text>{parseInt(meteo?.temp)}°</Text>
      <StatusBar style="auto" />
    </View>
  );
} 

