import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ItemCard from '../components/ItemCard'
import { useEffect } from 'react';

export default function Profile(props) {
  const [history, setHistory] = React.useState([]);

  // GET HISTORY ON PAGE LOAD
  useEffect(() => {
    getHistory()
  }, [])

  // GET USER HISTORY TO DISPLAY LAST SCANNED PRODUCTS
  const getHistory = () => {
    console.log('Getting history...')
    fetch('https://easybin-backend-app.herokuapp.com/history', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${props.token}`
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setHistory(responseJson.history)
      })
  }

  return (
    <View style={styles.container}>
      {/* HEADER WITH INFOS */}
      <MaterialCommunityIcons style={styles.profileIcon} name="account" size={90} onPress={getHistory} />
      <Text style={styles.username}> {props.username} </Text>
      { history.length == 1 ?
        <Text style={styles.milestones}> {history.length} produit scanné </Text>
        :
        <Text style={styles.milestones}> {history.length} produits scannés </Text>
      }
      <View style={styles.separator} />
      {/* HISTORY */}
      <Text style={styles.historyTitle}> Historique </Text>
      <ScrollView style={styles.historyDiv}>
        {history.map(function (item, idx) {
          return (<ItemCard key={idx} name={item.name} details={item.items} ></ItemCard>)
        })}
        <View style={styles.footer} />
      </ScrollView>
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
  historyDiv: {
    position: 'relative',
    top: '32%',
    width: '100%',
    height: 50,
    overflow: 'visible'
  },
  // Texts
  username: {
    position: 'absolute',
    top: '8%',
    right: '33%',
    fontSize: 25,
    fontWeight: 'bold',
  },
  milestones: {
    position: 'absolute',
    top: '15%',
    right: '5%',
    fontSize: 20,
  },
  historyTitle: {
    position: 'relative',
    top: '27%',

    fontSize: 20,
    fontWeight: 'bold'
  },
  // Icons
  profileIcon: {
    position: 'absolute',
    right: '70%',
    top: '6%',
  },
  // Separator
  separator: {
    position: 'absolute',
    top: '22%',
    height: 2,
    width: '95%',
    backgroundColor: 'black',
  },
  footer: {
    height: 210,
  }
});