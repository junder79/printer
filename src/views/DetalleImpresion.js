import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {Avatar, Card, IconButton, Button, DataTable} from 'react-native-paper';
import SamplePrint from '../../SamplePrint';
import axios from 'axios';
const DetalleImpresion = ({navigation, route}) => {
  const {run} = route.params;
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    getInfoUsuario();
  }, []);

  const getInfoUsuario = async () => {
    axios
      .get(
        `https://grupohexxa.com/sistemas/controlacceso/APP/encontrarUsuario.php?run=${run}`,
      )
      .then(response => {
        console.log(response.data);
        setNombre(response.data.nombre);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <SamplePrint run={run} nombre={nombre} />
    </>
  );
};

export default DetalleImpresion;
