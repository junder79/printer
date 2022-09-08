import React, {useState, useEffect, useCallback} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {styles} from '../../styles';
import {useNavigation} from '@react-navigation/native';
const Escaner = () => {
  const navigation = useNavigation();
  const onSuccess = () => {
    navigation.navigate('DetalleImpresion');
  };

  return (
    <QRCodeScanner
      onRead={({data}) => onSuccess(data)}
      showMarker={true}
      flashMode={RNCamera.Constants.FlashMode.off}
      reactivate={true}
      reactivateTimeout={5000}
      topContent={
        <Text style={styles.centerText}>
          <Text style={styles.textBold}>Escanear Cédula de Identidad</Text>
        </Text>
      }
    />
  );
};

export default Escaner;
