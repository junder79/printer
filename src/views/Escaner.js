import React, {useState, useEffect, useCallback} from 'react';

import {Text, Image} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {styles} from '../../styles';
import {useNavigation} from '@react-navigation/native';
import {Dimensions} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from 'react-native-paper';
import axios from 'axios';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

//importar modal

const Escaner = () => {
  const navigation = useNavigation();

  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);
  const [cargado, setCargado] = useState(false);
  const [estado, setEstado] = useState('');

  const hideDialog = () => setVisible(false);

  const onSuccess = e => {
    try {
      const string = e.data.split('?', 2)[1];
      const stringSerial = string.split('&', 1)[0];
      const run = stringSerial.split('=', 2)[1];
      setVisible(true);
      getInfoUsuario(run);
    } catch (error) {
      alert('Error al obtener RUN');
    }
  };

  async function getInfoUsuario(run) {
    setCargado(true);
    await axios
      .get(`https://inow.cl/controlacceso/APP/encontrarUsuario.php?run=${run}`)
      .then(response => {
        setEstado(response.data.estado);
        setCargado(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let icono =
    estado == 'encontrado'
      ? require('../img/icons8-print.gif')
      : require('../img/icons8-box-important.gif');
  return (
    <>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        flashMode={RNCamera.Constants.FlashMode.off}
        reactivate={true}
        reactivateTimeout={5000}
        cameraStyle={{height: SCREEN_HEIGHT, width: SCREEN_WIDTH}}
        topContent={<Text style={styles.centerText}></Text>}
      />

      <Portal>
        <Dialog
          visible={visible}
          style={{backgroundColor: 'white'}}
          onDismiss={hideDialog}>
          {cargado ? (
            <ActivityIndicator
              animating={true}
              size={'large'}
              color={'#3F50B5'}
              style={{
                marginBottom: 20,
              }}
            />
          ) : (
            <>
              <Dialog.Content>
                <Text
                  variant="bodyLarge"
                  style={{
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 22,
                    borderColor: 'red',
                    textTransform: 'uppercase',
                    marginTop: 10,
                    alignSelf: 'center',
                  }}>
                  {estado == 'encontrado'
                    ? 'Imprimiendo Etiqueta'
                    : 'Usuario no encontrado'}
                </Text>
                <Image
                  source={icono}
                  style={{
                    resizeMode: 'contain',
                    borderColor: 'red',
                    width: '100%',
                  }}
                />
              </Dialog.Content>
            </>
          )}
        </Dialog>
      </Portal>
    </>
  );
};

export default Escaner;
