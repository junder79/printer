import React, {useState, useEffect, useCallback} from 'react';

import {Text} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {styles} from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const Escaner = () => {
  const navigation = useNavigation();
  const onSuccess = e => {
    const string = e.data.split('?', 2)[1];
    const stringSerial = string.split('&', 1)[0];
    const run = stringSerial.split('=', 2)[1];

    navigation.navigate('DetalleImpresion', {run: run});
  };

  return (
    <QRCodeScanner
      onRead={onSuccess}
      showMarker={true}
      flashMode={RNCamera.Constants.FlashMode.off}
      reactivate={true}
      reactivateTimeout={5000}
      cameraStyle={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}
      topContent={<Text style={styles.centerText}></Text>}
    />
  );
};

export default Escaner;
