import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Card, Provider } from 'react-native-paper';

////// CARD CONTENT /////
export default function ItemCard(props) {
  const { name, ...details } = props;
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const object = details.details[0]

  return (
    <View style={styles.container}>
      {/* CARD */}
      <Card style={styles.card}>
        <TouchableOpacity onPress={() => showModal}>
          <Text style={styles.cardTitle}>{name}</Text>
        </TouchableOpacity>
      </Card>
      {/* POP-UP */}
      <Provider>
        <Modal transparent={true} animationType="slide" visible={visible} onDismiss={hideModal}>
          <View style={styles.popupView}>
            <Text style={styles.popupTitle}>{name}</Text>
            {/* PRODUCT DETAILS */}
            {Object.keys(object).map((keyName, i) => (
              <Text style={styles.details} key={i}><Text style={{ fontWeight: 'bold' }}>{keyName}: </Text>
                <Text style={{ fontStyle: 'italic' }}>{object[keyName]}.</Text></Text>
            ))}
          <TouchableOpacity
            style={styles.button}
            onPress={hideModal}
          >
            <Text style={styles.buttonText}> OK </Text>
          </TouchableOpacity>
          </View>

        </Modal>
      </Provider>
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
  ///////// ITEMCARD
  // Card
  card: {
    backgroundColor: '#ecf0f1',
    width: 300,
    height: 70,
    marginBottom: 20
  },
  // Texts
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25,
  },
  ///////// POPUP
  // Container
  popupView: {
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
  button: {
    position: 'relative',
    top: '35%',
    alignItems: 'center',
    backgroundColor: '#00d65b',
    borderRadius: 5,
    zIndex: 3,
    width: 70,
    padding: 7,
  },
})