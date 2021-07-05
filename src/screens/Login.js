import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import firebase from 'firebase';
import { TextInput } from 'react-native-paper';
import { colors } from '../util/colors';
import { spacing, fontSizes } from '../util/sizes';

export const Login = ({ setIsPostPage }) => {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  async function onLogin() {
    let firebaseuser = null;

    try {
      firebaseuser = await firebase
        .auth()
        .signInWithEmailAndPassword(email, pass);
    } catch (error) {
      alert(error.message);
    }

    setIsPostPage(firebaseuser);
  }
  async function onSignup() {
    let firebaseuser = null;

    try {
      firebaseuser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, pass);
    } catch (error) {
      alert(error.message);
    }

    setIsPostPage(firebaseuser);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Tilleli</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#000f"
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={setPass}
        />
      </View>

      <View style={styles.center}>
        {isSignup ? (
          <Button
            style={styles.buttonDesign}
            title="Sign up"
            onPress={() => onSignup()}
          />
        ) : (
          <Button
            style={styles.buttonDesign}
            title="Login"
            onPress={() => {
              onLogin();
            }}
          />
        )}
      </View>
      {!isSignup && (
        <View>
          <TouchableOpacity onPress={setIsSignup}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: colors.color2,
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: spacing.lg,
  },

  center: {
    paddingTop: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonDesign: {
    flex: 1,
    paddingTop: spacing.md,
  },
  inputView: {
    width: '80%',
    backgroundColor: colors.lightPurple,
    borderRadius: spacing.lg,
    height: spacing.xxxl,
    marginBottom: spacing.md,
    justifyContent: 'center',
    padding: spacing.sm,
  },
});
