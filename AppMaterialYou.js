import * as React from 'react';
import {BottomNavigation, Text} from 'react-native-paper';

import AjustesBluetooth from './src/views/AjustesBluetooth';
import Escaner from './src/views/Escaner';
import DetalleImpresion from './src/views/DetalleImpresion';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Avatar} from 'react-native-paper';

function AjustesScreen() {
  return <AjustesBluetooth></AjustesBluetooth>;
}

function EscanearScreen() {
  return <Escaner></Escaner>;
}

function DetalleScreen({route, navigation}) {
  return (
    <DetalleImpresion route={route} navigation={navigation}></DetalleImpresion>
  );
}

const StackNavigator = createNativeStackNavigator();
const TabNavigator = createBottomTabNavigator();

const App = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'escaneo',
      title: 'Escanear',
      focusedIcon: 'camera',
      unfocusedIcon: 'camera-outline',
    },
    {
      key: 'ajustes',
      title: 'Impresora',
      focusedIcon: 'printer-wireless',
      unfocusedIcon: 'printer-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    escaneo: EscanearScreen,
    ajustes: AjustesScreen,
  });

  return (
    <NavigationContainer>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </NavigationContainer>
  );
};

export default App;
