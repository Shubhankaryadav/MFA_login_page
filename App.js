import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as localAuthentication from 'expo-local-authentication';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FingerprintScreen from './screens/FingerprintScreen';
import FaceRecognitionScreen from './screens/FaceRecognitionScreen';
import AuthScreen from './screens/AuthScreen';
import HomeScreen from './screens/HomeScreen';
import WebViewScreen from './screens/WebViewScreen';

// Create a Stack navigator for navigation
const Stack = createStackNavigator();

// App component
const App = () => {
  // State to track authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect to run once when the component mounts
  useEffect(() => {
    // Function to check authentication status from AsyncStorage
    const checkAuthStatus = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    };

    // Function to handle biometric authentication
    const handleBiometric = async () => {
      // Check if the device supports biometrics and if biometrics are enrolled
      const compatible = await localAuthentication.hasHardwareAsync();
      const savedBiometrics = await localAuthentication.isEnrolledAsync();

      // If biometrics are compatible and enrolled, attempt biometric authentication
      if (compatible && savedBiometrics) {
        const biometricAuth = await localAuthentication.authenticateAsync({
          promptMessage: 'Login With Biometrics',
          cancelLabel: 'Cancel',
          disableDeviceFallback: true,
        });

        // If biometric authentication is successful, set isAuthenticated to true
        if (biometricAuth.success) {
          setIsAuthenticated(true);
        }
      }
    };

    // Call the functions to check authentication status and handle biometrics
    checkAuthStatus();
    handleBiometric();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  // Render the NavigationContainer with Stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
        {/* Define screens with their respective names and components */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
        <Stack.Screen name="FaceRecognition" component={FaceRecognitionScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;