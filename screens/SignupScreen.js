import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [biometricMethod, setBiometricMethod] = useState('biometric');

  const handleSignup = async () => {
    if (username && email && password) {
      await AsyncStorage.setItem('isAuthenticated', 'true');
      await AsyncStorage.setItem('biometricMethod', biometricMethod);
      Alert.alert('Signup Successful');
      navigation.navigate('Home');
    } else {
      Alert.alert('Please fill all fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Picker
        selectedValue={biometricMethod}
        onValueChange={(itemValue) => setBiometricMethod(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Biometric" value="biometric" />
        <Picker.Item label="Finger Recognition" value="finger" />
        <Picker.Item label="Face Recognition" value="face" />
      </Picker>
      <Button title="Signup" onPress={handleSignup} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
});

export default SignupScreen;
