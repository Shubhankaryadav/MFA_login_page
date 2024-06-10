// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import FingerprintScreen from './screens/FingerprintScreen';
import FaceRecognitionScreen from './screens/FaceRecognitionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Fingerprint" component={FingerprintScreen} />
        <Stack.Screen name="FaceRecognition" component={FaceRecognitionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
