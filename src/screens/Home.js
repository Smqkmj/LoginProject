import React, { useState, Component, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  Button,
  AppRegistry,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../util/colors';
import { fontSizes, spacing } from '../util/sizes';
import firebase from 'firebase';
import "firebase/auth";

export const Home = ({ setIsPostPage, email}) => {
  const [text, onChangeText] = useState('');
  const [posts, setPosts] = useState([]);
  const db = firebase.firestore();
  
useEffect(() => {
  try{
    myPosts(db)


  }catch (error){
    alert(error.message);
  }
  
},[]);
async function myPosts(db) {
  // [START firestore_query_filter_dataset]
  const posts = db.collection('posts').doc('FdebLLkgLbnNx8VElWFL');
  const doc = await posts.get();
  if (!doc.exists) {
    return [];
  } else {
   
    setPosts(doc.data().posts)
  }
}
async function onPost(){
  try{
    const newPost = db.collection('posts');
    
    await newPost.doc('FdebLLkgLbnNx8VElWFL').set({
    posts: [...posts, {email,post:text}]
  });
  setPosts([...posts, {email,post:text}]);
  onChangeText('');
}catch (error){
  alert(error.message);
}
  
}
  
async function onLogout() {
  let firebaseuser = null;

  try {
    firebaseuser = await firebase
      .auth()
      .signOut();
      setIsPostPage(false);
  } catch (error) {
    alert(error.message);
  }

}



  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Tilleli</Text>
        </View>
        <View style={styles.buttonPlacement}>

        
        <Button
          onPress={() => {
            onLogout();
          }}
          style={styles.buttonStyle}
          title="Logout"
        />
      </View>
      
    
      <ScrollView>
        <View style={styles.inputView}>
          <TextInput
            multiline
            style={styles.inputText}
            placeholder="Create post"
            onChangeText={onChangeText}
            value={text}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonPlacement}>
        <Button
          onPress={() => {
            onPost()
          }}
          style={styles.buttonStyle}
          title="Post"
        />
      </View>
      {posts && posts.map((post, key) => {
        return (
          <Text key={key} style={styles.post}>
            <Text style={styles.postAuthor}>{post.email}{'\n'}</Text>{post.post} 
          </Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    backgroundColor: colors.skyBlue,
    padding: spacing.sm,

    marginHorizontal: spacing.xxxl,
    marginTop: spacing.md,
  },

  logo: {
    color: colors.color2,
    fontSize: fontSizes.xl,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  container: {
    //flex: 1,
  },

  inputView: {
    marginTop:10,
    height: spacing.xxl,
  },
  inputText: {
    backgroundColor: colors.white,

    height: spacing.xxl,
    width: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  buttonStyle: {
    paddingTop: spacing.sm,
  },
  buttonPlacement: {
    marginTop: 10,
    marginLeft: 240,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  post: {
    backgroundColor: colors.skyBlue,
    padding: spacing.sm,
    fontSize: fontSizes.lg,
    marginTop: 20,
    width: '100%',

  },
  postAuthor:{
    fontSize: fontSizes.md, 
    backgroundColor:colors.green, 
    textAlignVertical:'top',
    justifyContent:'center'
    
  },
});
