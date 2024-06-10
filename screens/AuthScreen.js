import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const AuthScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    FingerprintScanner.authenticate({ description: 'Authenticate to continue' })
      .then(() => {
        setIsAuthenticated(true);
        Alert.alert('Authenticated successfully');
        navigation.replace('Home'); // Navigate to the home screen or main content
      })
      .catch(error => {
        Alert.alert('Authentication failed', error.message);
        // Handle authentication failure, maybe allow retry
      });

    return () => {
      if (isAuthenticated) {
        FingerprintScanner.release();
      }
    };
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please authenticate to continue</Text>
      <Button title="Retry" onPress={() => FingerprintScanner.release() || FingerprintScanner.authenticate()} />
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

export default AuthScreen;