import React, {useState, useEffect, useCallback} from 'react';

import {
  AppRegistry,
  StyleSheet,
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

import {BluetoothManager} from 'react-native-bluetooth-escpos-printer';
import ItemList from '../../ItemList';

import {styles} from '../../styles';
import {
  Badge,
  ProgressBar,
  Text,
  Divider,
  Card,
  Button,
  Surface,
  Avatar,
} from 'react-native-paper';

const AjustesBluetooth = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      err => {
        err;
      },
    );

    if (Platform.OS === 'ios') {
      let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
      bluetoothManagerEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName('');
          setBoundAddress('');
        },
      );
    } else if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          deviceAlreadPaired(rsp);
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_FOUND,
        rsp => {
          deviceFoundEvent(rsp);
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        () => {
          setName('');
          setBoundAddress('');
        },
      );
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
        () => {
          ToastAndroid.show(
            'Device Not Support Bluetooth !',
            ToastAndroid.LONG,
          );
        },
      );
    }
    if (pairedDevices.length < 1) {
      scan();
    }
  }, [boundAddress, deviceAlreadPaired, deviceFoundEvent, pairedDevices, scan]);

  const showToast = mensaje => {
    ToastAndroid.show(mensaje, ToastAndroid.SHORT);
  };

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) {}
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = row => {
    setLoading(true);
    BluetoothManager.connect(row.address).then(
      s => {
        setLoading(false);
        setBoundAddress(row.address);
        setName(row.name || 'UNKNOWN');
        showToast('Impresora Conectada');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const unPair = address => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      s => {
        setLoading(false);
        setBoundAddress('');
        setName('');
        showToast('Impresora Desconectada');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        setFoundDs(fds);
        setLoading(false);
      },
      er => {
        setLoading(false);
        // ignore
      },
    );
  }, [foundDs]);

  const scan = useCallback(() => {
    try {
      async function blueTooth() {
        const permissions = {
          title: 'HSD bluetooth meminta izin untuk mengakses bluetooth',
          message:
            'HSD bluetooth memerlukan akses ke bluetooth untuk proses koneksi ke bluetooth printer',
          buttonNeutral: 'Lain Waktu',
          buttonNegative: 'Tidak',
          buttonPositive: 'Boleh',
        };

        const bluetoothConnectGranted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          permissions,
        );
        if (bluetoothConnectGranted === PermissionsAndroid.RESULTS.GRANTED) {
          const bluetoothScanGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            permissions,
          );
          if (bluetoothScanGranted === PermissionsAndroid.RESULTS.GRANTED) {
            scanDevices();
          }
        } else {
          // ignore akses ditolak
        }
      }
      blueTooth();
    } catch (err) {
      console.warn(err);
    }
  }, [scanDevices]);

  return (
    <ScrollView style={styles.container}>
      {/*   <Badge
        style={{
          color: 'white',
          backgroundColor: 'black',
          paddingLeft: 10,
          paddingRight: 10,
          marginBottom: 10,
        }}>
        Bluetooth : <Text>{bleOpend ? 'Encendido' : 'No encendido'}</Text>
      </Badge> */}
      {/*  <Divider /> */}
      <Text
        variant="titleLarge"
        style={{
          color: 'black',
          marginTop: 0,
          marginBottom: 20,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        Dispositivo Conectado
      </Text>
      {boundAddress.length > 0 && (
        <ItemList
          style={{backgroundColor: 'white', borderRadius: 20}}
          label={name}
          value={boundAddress}
          onPress={() => unPair(boundAddress)}
          actionText="Desconectar"
          color="#E9493F"
        />
      )}
      {boundAddress.length < 1 && (
        <Card.Title
          elevation={10}
          title="Impresora no conectada"
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            marginBottom: 10,
          }}
          left={props => <Avatar.Icon {...props} icon="printer" />}
        />
      )}
      <Divider />
      <Text
        variant="bodyLarge"
        style={{
          color: 'black',
          marginTop: 20,
          marginBottom: 20,
          marginLeft: 5,
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 15,
        }}>
        Dispositivos emparejados
      </Text>
      {loading ? (
        <ProgressBar
          indeterminate={true}
          style={{marginBottom: 10}}
          color="#af4448"
        />
      ) : null}
      <View style={styles.containerList}>
        {pairedDevices.map((item, index) => {
          return (
            <ItemList
              key={index}
              onPress={() => connect(item)}
              label={item.name}
              value={item.address}
              connected={item.address === boundAddress}
              actionText="Conectar"
              color="#00BCD4"
            />
          );
        })}
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

export default AjustesBluetooth;
