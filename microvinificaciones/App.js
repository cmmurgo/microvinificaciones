import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import HomeScreen from './src/screens/HomeScreen';
import AddVineyardScreen from './src/screens/AddVineyardScreen';
import AddSampleScreen from './src/screens/AddSampleScreen';
import VineyardDetailScreen from './src/screens/VineyardDetailScreen';
import EditVineyardScreen from './src/screens/EditVineyardScreen';
import SampleDetailScreen from './src/screens/SampleDetailScreen';
import EditSampleScreen from './src/screens/EditSampleScreen';
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
          <Stack.Screen name="VineyardDetail" component={VineyardDetailScreen} options={{ title: 'Detalle Viñedo' }} />
          <Stack.Screen name="EditVineyard" component={EditVineyardScreen} options={{ title: 'Editar Viñedo' }} />
          <Stack.Screen name="SampleDetail" component={SampleDetailScreen} options={{ title: 'Detalle Muestra' }} />
          <Stack.Screen name="EditSample" component={EditSampleScreen} options={{ title: 'Editar Muestra' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
