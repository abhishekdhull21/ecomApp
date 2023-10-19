import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import { Input, Button } from '@rneui/themed';
import request from '../utils/request';
import { useNavigation } from '@react-navigation/native';
import Screens from '.';
import { getToken, setToken } from '../utils/common';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()
  const handleLogin = async() => {
    setLoading(true);
     request("login",{ data:{email,password}}).then( async(res) => {
      if(res.success) {
        await setToken(res.token);
        resetForm();
        navigation.navigate(Screens.HOME_SCREEN)
      }
    }).catch(err =>{
      Alert.alert(
        "Login failed",err.message
        )
      }).finally(()=>{
       setLoading(false)
     })
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };
  useEffect(() => {
  let fetchToken = async() =>{
     const token = await getToken();
  if(token) {
    resetForm();
    navigation.navigate(Screens.HOME_SCREEN)
  }
}
  fetchToken();
 
  },[])
  return (
    <View style={styles.container}>
      <Input
        label="Email / Mobile"
        placeholder="Enter your email or mobile"
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
        title={loading ? <ActivityIndicator /> : 'Login'}
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
