import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Provider } from 'react-native-paper';
import { WSnackBar } from 'react-native-smart-tip'
import { BarCodeScanner } from 'expo-barcode-scanner';

////// PAGE CONTENT /////
export default function Scan(props) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [productName, setProductName] = React.useState('');
  const [object, setObject] = React.useState(undefined);
  const hideModal = () => setVisible(false);

  // REQUEST CAMERA PERMISSION
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // SCAN BAR CODE
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log("Bar code with type " + type + " and data " + data + " has been scanned!");
    fetch(`https://easybin-backend-app.herokuapp.com/products/infos/${data}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) {
          const snackBar = {
            data: 'Code barre invalide',
            position: WSnackBar.position.BOTTOM,
            duration: WSnackBar.duration.SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          }
          WSnackBar.show(snackBar)
          return
        } else {
          if (!responseJson.name) {
            const snackBar = {
              data: 'Produit inconnu',
              position: WSnackBar.position.BOTTOM,
              duration: WSnackBar.duration.SHORT,
              textColor: 'white',
              backgroundColor: 'red',
            }
            WSnackBar.show(snackBar)
            return
          }
          setProductName(responseJson.name)
          setObject(responseJson.items[0])
          setVisible(true)
        }
      })
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Scan</Text>
      {/* SCAN ZONE */}
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanZone}
      />
      {/* POP-UP */}
      { visible &&
        <Provider>
          <Modal transparent={true} animationType="slide" visible={visible} onDismiss={hideModal}>
            <View style={styles.popupView}>
              <Text style={styles.popupTitle}>{productName}</Text>
              {Object.keys(object).map((keyName, i) => (
                <Text style={styles.details} key={i}><Text style={{ fontWeight: 'bold' }}>{keyName}: </Text>
                  <Text style={{ fontStyle: 'italic' }}>{object[keyName]}.</Text></Text>
              ))}
              <TouchableOpacity
                style={styles.popupButton}
                onPress={hideModal}
              >
                <Text style={styles.buttonText}> OK </Text>
              </TouchableOpacity>
            </View>

          </Modal>
        </Provider>
      }
      {/* BUTTON */}
      {scanned &&
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.buttonText}> Scanner à nouveau </Text>
        </TouchableOpacity>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  ///////// PAGE
  // Container
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Texts
  pageTitle: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 40,
    top: '5%',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  // Button
  button: {
    position: 'absolute',
    bottom: '1.7%',
    alignItems: 'center',
    backgroundColor: '#00d65b',
    borderRadius: 5,
    width: 200,
    padding: 7,
  },
  // Scan
  scanZone: {
    position: 'absolute',
    top: '15%',
    height: 465,
    width: 350,
    zIndex: 1,
  },
  ///////// POPUP
  // Container
  popupView: {
    position: 'absolute',
    height: 380,
    width: 330,
    marginTop: 150,
    marginLeft: 22,
    zIndex: 2,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',

  },
  //Texts
  popupTitle: {
    position: 'absolute',
    bottom: '85%',
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  details: {
    fontSize: 18,
    marginBottom: 10
  },
  // Buttons
  popupButton: {
    position: 'relative',
    top: '35%',
    alignItems: 'center',
    backgroundColor: '#00d65b',
    borderRadius: 5,
    zIndex: 3,
    width: 70,
    padding: 7,
  },
});