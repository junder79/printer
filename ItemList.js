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
      {connected && <Text style={styles.connected}>Conectado</Text>}
      {!connected && (
        <Button mode="contained-tonal" onPress={onPress}>
          Conectar
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
    backgroundColor: '#8e0000',
    marginBottom: 12,
    padding: 12,
    borderRadius: 50,
  },
  label: {fontWeight: 'bold', color: 'white'},
  connected: {fontWeight: 'bold', color: '#00BCD4'},
  button: color => ({
    backgroundColor: color,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
  }),
  actionText: {color: 'white'},
});
