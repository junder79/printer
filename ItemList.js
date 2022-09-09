import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Surface} from 'react-native';
import {Button} from 'react-native-paper';
const ItemList = ({
  label,
  value,
  onPress,
  connected,
  actionText,
  color = '#00BCD4',
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{label || 'UNKNOWN'}</Text>
        {/* MAC ADDRESS  <Text>{value}</Text>  */}
      </View>
      {connected && (
        <Button icon="printer" mode="contained">
          Conectado
        </Button>
      )}
      {!connected && (
        <Button
          elevation={4}
          icon="printer"
          mode="contained-tonal"
          onPress={onPress}>
          {actionText}
        </Button>
      )}
    </View>
  );
};

export default ItemList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 12,
    padding: 12,
    borderRadius: 15,
  },
  label: {fontWeight: 'bold', color: '#757575'},
  connected: {fontWeight: 'bold', color: '#00BCD4'},
  button: color => ({
    backgroundColor: color,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  }),
  actionText: {color: 'white'},
});
