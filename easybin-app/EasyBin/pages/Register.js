import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { WSnackBar } from 'react-native-smart-tip'
import { Ionicons } from '@expo/vector-icons';

// CHECK EMAIL FORMAT
function isValidEmail(val) {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(val)) {
    const snackBar = {
      data: 'Adresse mail invalide.',
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

// CHECK USERNAME FORMAT
function isValidUsername(val) {
  let regUsername = /^[0-9a-zA-Z(\-)]+$/;
  if (!regUsername.test(val)) {
    const snackBar = {
      data: 'Nom d\'utilisateur invalide.',
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

// CHECK PASSWORD FORMAT
function isValidPassword(val) {
  if (val.length < 6) {
    const snackBar = {
      data: 'Mot de passe invalide.',
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

////// PAGE CONTENT /////
export default function Register({ navigation }) {
  const [username, onChangeUsername] = React.useState('');
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  // PRESS OK BUTTON
  async function pressOk(username, email, password) {
    if (username && email && password) {
      if (isValidUsername(username) && isValidEmail(email) && isValidPassword(password)) {
        await fetch('https://easybin-backend-app.herokuapp.com/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            'username': username,
            'email': email,
            'password': password,
            'items_scanned': []
          })
        });
        navigation.navigate('Login')
      }
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
      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")
        }
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      {/* HEADER */}
      <Text style={styles.mainTitle}>EASY BIN</Text>
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.subTitle}>Créer un compte</Text>
      {/* INPUTS */}
      <TextInput
        style={styles.textInput}
        placeholder="Nom (charactères alphanumériques)"
        onChangeText={text => onChangeUsername(text)}
        value={username}
      />
      <TextInput
        type="email"
        style={styles.textInput}
        placeholder="Adresse email"
        onChangeText={text => onChangeEmail(text)}
        value={email}
      />
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        placeholder="Mot de passe (au moins 6 charactères)"
        onChangeText={text => onChangePassword(text)}
        value={password}
      />
      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => pressOk(username, email, password)}
      >
        <Text style={styles.buttonText}> OK </Text>
      </TouchableOpacity>
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
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  backButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 35,
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
  // Buttons
  button: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#00d65b',
    borderRadius: 5,
    width: 70,
    padding: 7,
  },
  backButton: {
    position: 'relative',
    right: '37%',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    width: 70,
  }
});
