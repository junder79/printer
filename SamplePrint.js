import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {hsdLogo} from './dummy-logo';
import axios from 'axios';
import {Button} from 'react-native-paper';
const SamplePrint = () => {
  const [rut, setRut] = useState('');

  const getDataUsuario = () => {
    axios
      .get(
        `https://grupohexxa.cl/controlacceso/APP/encontrarUsuario.php?run=${rut}`,
      )
      .then(response => {})
      .catch(e => {});
  };
  return (
    <View>
      <Button
        style={{backgroundColor: '#BBF1AE'}}
        labelStyle={{color: '#0E2510', fontSize: 18}}
        icon="printer"
        mode="contained"
        onPress={async () => {
          await BluetoothEscposPrinter.printText('\r\n\r\n\r\n\r\n\r\n', {});

          await BluetoothEscposPrinter.printText('Desarrollador - WEB', {
            widthtimes: 2,
            heigthtimes: 2,
            fonttype: 5,
          });
          await BluetoothEscposPrinter.printText(
            '-------------------------',
            {},
          );

          await BluetoothEscposPrinter.printText('\r\n\r\n', {});

          await BluetoothEscposPrinter.printText('Nicolas Cisterna', {
            widthtimes: 2,
            heigthtimes: 2,
            fonttype: 5,
          });
          await BluetoothEscposPrinter.printText('\r\n\r\n\r\n\r\n\r\n', {});
          await BluetoothEscposPrinter.printText('\r\n\r\n\r\n\r\n\r\n', {});
        }}>
        Imprimir
      </Button>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
