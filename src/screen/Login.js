import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from '@rneui/themed';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={styles.container}>
      <Input
        label="Email"
        placeholder="Enter your email"
        labelStyle={styles.label}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        secureTextEntry
        labelStyle={styles.label}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCapitalize="none"
      />
      <Button
        title="Login"
        onPress={handleLogin}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  label: {
    color: '#555',
  },
  inputContainer: {
    borderBottomColor: '#888',
  },
  input: {
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#f4511e',
    borderRadius: 10,
  },
  buttonTitle: {
    fontWeight: 'bold',
  },
});

export default Login;
