import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { WSnackBar } from 'react-native-smart-tip'

////// PAGE CONTENT /////
export default function Register({ navigation }) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  // PRESS OK BUTTON
  async function pressOk(email, password) {
    if (email && password) {
      // Call server
      await fetch('https://easybin-backend-app.herokuapp.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          'email': email,
          'password': password
        })
      })
        .then((response) => response.json())
        // Check server response
        .then((responseJson) => {
          if (responseJson.error) {
            const snackBar = {
              data: 'Email ou mot de passe invalide',
              position: WSnackBar.position.BOTTOM,
              duration: WSnackBar.duration.SHORT,
              textColor: 'white',
              backgroundColor: 'red',
            }
            WSnackBar.show(snackBar)
          }
          else {
            navigation.navigate('Home', {
              token: responseJson.token,
              username: responseJson.username,
            });
          }
        })
    } else {
      const snackBar = {
        data: 'Veuillez remplir tous les champs.',
        position: WSnackBar.position.BOTTOM,
        duration: WSnackBar.duration.SHORT,
        textColor: 'white',
        backgroundColor: 'red',
      }
      WSnackBar.show(snackBar)
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Text style={styles.mainTitle}>EASY BIN</Text>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.subTitle}>Se connecter</Text>
      {/* INPUTS */}
      <TextInput
        style={styles.textInput}
        placeholder="Adresse email"
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        placeholder="Mot de passe"
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressOk(email, password)}
      >
        <Text style={styles.buttonText}> OK </Text>
      </TouchableOpacity>
      {/* REGISTER TEXT */}
      <Text style={styles.infoText}>Nouveau sur l'application ?</Text>
      <Text style={styles.registerText} onPress={() => navigation.navigate("Register")}>
        Créer un compte
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // App Logo
  logo: {
    height: 200,
    width: 200,
    marginTop: 15,
    marginBottom: 15,
  },
  // Texts
  mainTitle: {
    position: 'relative',
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: -25,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  infoText: {
    position: 'absolute',
    fontSize: 18,
    top: '92%',
  },
  registerText: {
    position: 'absolute',
    fontWeight: 'bold',
    color: '#00d65b',
    fontSize: 18,
    top: '95%',
  },
  // Input
  textInput: {
    height: 50,
    width: 300,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    paddingLeft: 6,
  },
  // Button
  button: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#00d65b',
    borderRadius: 5,
    width: 70,
    padding: 7,
  }
});
