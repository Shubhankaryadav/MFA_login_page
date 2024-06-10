import React from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  authMethod: Yup.string().required('Authentication method is required'),
});

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: '', email: '', authMethod: 'Finger Recognition' }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          if (values.authMethod === 'Finger Recognition') {
            navigation.navigate('Fingerprint');
          } else {
            navigation.navigate('FaceRecognition');
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, setFieldValue, errors }) => (
          <>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholder="Username"
            />
            {errors.username && <Text style={styles.error}>{errors.username}</Text>}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholder="Email"
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}
            <Picker
              selectedValue={values.authMethod}
              onValueChange={(itemValue) => setFieldValue('authMethod', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Finger Recognition" value="Finger Recognition" />
              <Picker.Item label="Face Recognition" value="Face Recognition" />
            </Picker>
            {errors.authMethod && <Text style={styles.error}>{errors.authMethod}</Text>}
            <Button onPress={handleSubmit} title="Signup" />
            <Button onPress={() => navigation.navigate('Login')} title="Go to Login" />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default SignupScreen;
