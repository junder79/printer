import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {BluetoothEscposPrinter} from 'react-native-bluetooth-escpos-printer';
import {hsdLogo} from './dummy-logo';
import axios from 'axios';

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
      <Text>Intrucciones de impresora</Text>
      <View style={styles.btn}>
        <Button
          title="Escanear"
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
          }}
        />
      </View>
    </View>
  );
};

export default SamplePrint;

const styles = StyleSheet.create({
  btn: {
    marginBottom: 8,
  },
});
