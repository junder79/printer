import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Avatar} from 'react-native-paper';
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
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Escanear"
        options={{
          tabBarLabel: 'Escanear',
          tabBarIcon: ({color, size}) => (
            <Avatar.Icon size={30} icon="camera" />
          ),
        }}
        component={InicioScreen}
      />
      <Tab.Screen
        name="Impresora"
        options={{
          tabBarLabel: 'Impresora',
          tabBarIcon: ({color, size}) => (
            <Avatar.Icon size={30} icon="printer" />
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

function DetalleScreen({route, navigation}) {
  return (
    <DetalleImpresion route={route} navigation={navigation}></DetalleImpresion>
  );
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

          <Stack.Screen
            name="DetalleImpresion"
            options={{
              title: 'Detalle',
            }}
            component={DetalleScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
