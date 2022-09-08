import React from 'react';
import {Text} from 'react-native';
import {Avatar, Card, IconButton} from 'react-native-paper';
const DetalleImpresion = () => {
  return (
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={props => <Avatar.Icon {...props} icon="folder" />}
      right={props => (
        <IconButton {...props} icon="more-vert" onPress={() => {}} />
      )}
    />
  );
};

export default DetalleImpresion;
