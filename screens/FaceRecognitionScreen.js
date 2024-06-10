import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const FaceRecognitionScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    FingerprintScanner.authenticate({ description: 'Scan your face to continue', fallbackEnabled: true })
      .then(() => {
        setIsAuthenticated(true);
        Alert.alert('Authenticated successfully');
        // Navigate to the next screen or perform any other action
      })
      .catch(error => {
        Alert.alert('Authentication failed', error.message);
        // Navigate back or handle the failure
      });

    return () => {
      if (isAuthenticated) {
        FingerprintScanner.release();
      }
    };
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Face Recognition Authentication</Text>
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

export default FaceRecognitionScreen;