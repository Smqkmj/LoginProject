import React, { useState, Component } from 'react';
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
import { Post } from '../Post';

export const Home = ({ setIsPostPage }) => {
  const [text, onChangeText] = useState('');
  const [posts, setPosts] = useState([]);
 
   

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Tilleli</Text>
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
            setPosts([...posts, text]);
            onChangeText('');
          }}
          style={styles.buttonStyle}
          title="Post"
        />
      </View>
      {posts.map((post, key) => {
        return (
          <Text key={key} style={styles.post}>
            {post}
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
    marginBottom: 10,
    marginLeft: 240,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  post: {
    backgroundColor: colors.white,
    padding: spacing.sm,
    fontSize: fontSizes.lg,
    marginTop: 20,
    width: '100%',
    alignSelf: 'flex-start',
    //opacity:0.5,
    //display:none,
  },
});
