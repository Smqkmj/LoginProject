import React, { useState } from 'react';

import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import {Login} from './src/screens/Login';

import {Home} from './src/screens/Home';
import firebase from 'firebase';
import{colors} from './src/util/colors'




export default function App() {
  const [isPostPage, setIsPostPage] = useState(false);
  const [email, setEmail] = useState(false);
   var firebaseConfig = {
    apiKey: "AIzaSyByj3647tb72aC3Jxfkhy-rTylOS1lpO8w",
    authDomain: "loginproject-91cec.firebaseapp.com",
    projectId: "loginproject-91cec",
    storageBucket: "loginproject-91cec.appspot.com",
    messagingSenderId: "380074027079",
    appId: "1:380074027079:web:b9cf8dcf04e15be9f7a962"
  };
  // Initialize Firebase

  if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); 
}

  
  return (
    <View style={styles.container}>
    { isPostPage? <Home setIsPostPage={setIsPostPage} email={email}/> : <Login setIsPostPage={setIsPostPage} saveEmail={setEmail} />}
      
    
    </View> 
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.lightPurple,
    padding: 8,
  },

});
