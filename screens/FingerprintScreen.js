// screens/FingerprintScreen.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const FingerprintScreen = ({ navigation }) => {
  useEffect(() => {
    FingerprintScanner.authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then(() => {
        Alert.alert('Authenticated successfully');
        // Navigate to the next screen or perform any other action
      })
      .catch(error => {
        Alert.alert('Authentication failed', error.message);
        // Navigate back or handle the failure
      });

    return () => {
      FingerprintScanner.release();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fingerprint Authentication</Text>
      <Button title="Back to Signup" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default FingerprintScreen;