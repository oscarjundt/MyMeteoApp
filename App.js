import { StatusBar } from 'expo-status-bar';
import { StyleSheet,TextInput, Text, View } from 'react-native';
import Meteo from './Meteo';
import { useState } from 'react';
export default function App() {
  const [dt,setDt] = useState(new Date().toISOString().split('T')[0])
  return (
    <View style={styles.container}>
      <TextInput
      value={dt}
      placeholder='YYY-mm-dd'
      onChangeText={setDt}
      />
      <Meteo
      val={dt}
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
