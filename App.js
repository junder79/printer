import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Importar Componentes

import AjustesBluetooth from './src/views/AjustesBluetooth';
import Escaner from './src/views/Escaner';
import DetalleImpresion from './src/views/DetalleImpresion';

// importar icons
import Icon from 'react-native-vector-icons/dist/FontAwesome';

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
      <Tab.Screen
        name="InicioScreen"
        options={{
          tabBarLabel: 'Escanear',
          tabBarIcon: ({color, size}) => (
            <Icon name="camera" color="black" size={25} />
          ),
        }}
        component={InicioScreen}
      />
      <Tab.Screen
        name="Ajustes"
        options={{
          tabBarLabel: 'Impresora',
          tabBarIcon: ({color, size}) => (
            <Icon name="print" color="black" size={25} />
          ),
        }}
        component={AjustesScreen}
      />
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
