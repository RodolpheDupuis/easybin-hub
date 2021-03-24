import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Picker } from 'react-native';
import { WSnackBar } from 'react-native-smart-tip'

////// PAGE CONTENT /////
export default function AddProduct(props) {
  const [productName, setProductName] = React.useState('');
  const [productBarcode, setProductBarcode] = React.useState('');
  const [detailName1, setDetailName1] = React.useState('');
  const [detailPicker1, setDetailPicker1] = React.useState('');
  const [detailName2, setDetailName2] = React.useState('');
  const [detailPicker2, setDetailPicker2] = React.useState('');
  const [detailName3, setDetailName3] = React.useState('');
  const [detailPicker3, setDetailPicker3] = React.useState('');
  let details = {};

  // INPUTS MANAGEMENT -> NAME/BARCODE
  function checkBasicInputs() {
    if (!productName || !productBarcode) {
      const snackBar = {
        data: 'Veuillez remplir tous les champs requis.',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
      return false
    }
    if (productBarcode.length != 13) {
      const snackBar = {
        data: 'Code barre invalide',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
      return false
    }
    return true
  }

  // INPUTS MANAGEMENT -> PRODUCT DETAILS
  function checkDetailsInputs() {
    if (!detailName1 && !detailName2 && !detailName3) {
      const snackBar = {
        data: 'Veuillez remplir les champs requis.',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
      return false
    }
    if (detailName1 && !detailPicker1) {
      const snackBar = {
        data: 'Veuillez sélectionnez une catégorie.',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
      return false
    }
    if (detailName2 && !detailPicker2) {
      const snackBar = {
        data: 'Veuillez sélectionnez une catégorie.',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
      return false
    }
    if (detailName3 && !detailPicker3) {
      const snackBar = {
        data: 'Veuillez sélectionnez une catégorie.',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
      return false
    }
    return true
  }

  // CREATE JSON  OBJECT CONTAINING DETAILS
  function createDetailsJson() {
    if (detailName1)
      details[detailName1] = detailPicker1

    if (detailName2)
      details[detailName2] = detailPicker2

    if (detailName3)
      details[detailName3] = detailPicker3
  }

  // ADD PRODUCT TO DB
  function addProductToDb() {
    if (!checkBasicInputs() || !checkDetailsInputs())
      return
    createDetailsJson()

    fetch('https://easybin-backend-app.herokuapp.com/products/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
      body: JSON.stringify({
        'name': productName,
        'barcode': productBarcode,
        'items': details,

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.error) {
          // display error message
          const snackBar = {
            data: 'Error',
            position: WSnackBar.position.BOTTOM,
            duration: WSnackBar.duration.SHORT,
            textColor: 'white',
            backgroundColor: 'red',
          }
          WSnackBar.show(snackBar)
        } else {
          // display succes message
          const snackBar = {
            data: 'Produit ajouté !',
            position: WSnackBar.position.BOTTOM,
            duration: WSnackBar.duration.SHORT,
            textColor: 'white',
            backgroundColor: 'green',
          }
          WSnackBar.show(snackBar)
          // reset inputs values
          setProductName('')
          setProductBarcode('')
          setDetailName1('')
          setDetailName2('')
          setDetailName3('')
          setDetailPicker1('')
          setDetailPicker2('')
          setDetailPicker3('')
        }
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Ajouter un produit</Text>
      <View style={styles.inputsContainer}>
        {/* INPUTS */}
        <TextInput
          style={styles.textInput}
          placeholder="Nom du produit *"
          onChangeText={text => setProductName(text)}
          value={productName}
        />
        <TextInput
          style={styles.textInput}
          keyboardType={'numeric'}
          placeholder="13 chiffres du code barre *"
          onChangeText={text => setProductBarcode(text)}
          value={productBarcode}
        />
        {/* DETAIL 1 */}
        <View>
          <TextInput
            style={styles.detailInput}
            placeholder="Partie du produit *"
            onChangeText={text => setDetailName1(text)}
            value={detailName1}
          />
          <Picker
            style={styles.picker}
            itemStyle={{ height: 50 }}
            selectedValue={detailPicker1}
            onValueChange={(itemValue, itemIndex) => setDetailPicker1(itemValue)}
          >
            <Picker.Item label="Catégorie" value="" />
            <Picker.Item label="Ordure" value="ordure" />
            <Picker.Item label="Recycler" value="recycler" />
            <Picker.Item label="Verre" value="verre" />
          </Picker>
        </View>
        {/* DETAIL 2 */}
        <View style={{ marginTop: -30 }}>
          <TextInput
            style={styles.detailInput}
            placeholder="Partie du produit"
            onChangeText={text => setDetailName2(text)}
            value={detailName2}
          />
          <Picker
            style={styles.picker}
            itemStyle={{ height: 50 }}
            selectedValue={detailPicker2}
            onValueChange={(itemValue, itemIndex) => setDetailPicker2(itemValue)}
          >
            <Picker.Item label="Catégorie" value="" />
            <Picker.Item label="Ordure" value="ordure" />
            <Picker.Item label="Recycler" value="recycler" />
            <Picker.Item label="Verre" value="verre" />
          </Picker>
        </View>
        {/* DETAIL 3 */}
        <View style={{ marginTop: -30 }}>
          <TextInput
            style={styles.detailInput}
            placeholder="Partie du produit"
            onChangeText={text => setDetailName3(text)}
            value={detailName3}
          />
          <Picker
            style={styles.picker}
            itemStyle={{ height: 50 }}
            selectedValue={detailPicker3}
            onValueChange={(itemValue, itemIndex) => setDetailPicker3(itemValue)}
          >
            <Picker.Item label="Catégorie" value="" />
            <Picker.Item label="Ordure" value="ordure" />
            <Picker.Item label="Recycler" value="recycler" />
            <Picker.Item label="Verre" value="verre" />
          </Picker>
        </View>
      </View>
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => addProductToDb()}
      >
        <Text style={styles.buttonText}>Ajouter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsContainer: {
    position: 'absolute',
    top: '20%'
  },
  // Texts
  pageTitle: {
    position: 'absolute',
    fontWeight: 'bold',
    fontSize: 30,
    top: '7%',
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
  // Inputs
  textInput: {
    height: 50,
    width: 330,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingLeft: 6,
  },
  detailInput: {
    top: '40%',
    height: 40,
    width: 200,
    fontSize: 18,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingLeft: 6,
  },
  // Picker
  picker: {
    width: '37%',
    left: '66%',
    marginBottom: 25,
  }
});