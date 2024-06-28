import React, { useEffect, useState } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthScreen = ({ navigation }) => {
  const [biometricMethod, setBiometricMethod] = useState('biometric');

  useEffect(() => {
    checkBiometricMethod();
    authenticate();
  }, []);

  const checkBiometricMethod = async () => {
    const method = await AsyncStorage.getItem('biometricMethod');
    if (method) {
      setBiometricMethod(method);
    }
  };

  const authenticate = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (hasHardware && isEnrolled) {
      let result;
      if (biometricMethod === 'biometric') {
        result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate',
        });
      } else if (biometricMethod === 'finger') {
        result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with Finger Recognition',
        });
      } else if (biometricMethod === 'face') {
        result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate with Face Recognition',
        });
      }

      if (result.success) {
        Alert.alert('Authenticated Successfully');
        navigation.navigate('Home');
      } else {
        Alert.alert('Authentication Failed');
      }
    } else {
      Alert.alert('Biometric authentication not available or not enrolled');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Authenticate" onPress={authenticate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
