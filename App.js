import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Importar Componentes

import AjustesBluetooth from './src/views/AjustesBluetooth';
import Escaner from './src/views/Escaner';
import DetalleImpresion from './src/views/DetalleImpresion';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function InicioScreen() {
  return (
    <>
      <Escaner></Escaner>
    </>
  );
}

function InicioStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Ajustes" component={AjustesScreen} />
    </Tab.Navigator>
  );
}

function AjustesScreen() {
  return <AjustesBluetooth></AjustesBluetooth>;
}

function DetalleScreen() {
  return <DetalleImpresion></DetalleImpresion>;
}

function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Inicio"
            component={InicioStack}
          />

          <Stack.Screen name="DetalleImpresion" component={DetalleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
