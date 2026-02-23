import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import AddVineyardScreen from './src/screens/AddVineyardScreen';
import AddSampleScreen from './src/screens/AddSampleScreen';
import { initDB } from './src/database/db';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Microvinificaciones' }} />
          <Stack.Screen name="AddVineyard" component={AddVineyardScreen} options={{ title: 'Nuevo Viñedo' }} />
          <Stack.Screen name="AddSample" component={AddSampleScreen} options={{ title: 'Nueva Muestra' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
