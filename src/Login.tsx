import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = () => {
    // Verifica se o email segue o padrão de email
    if (!validateEmail(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    // Faz a solicitação para o backend
    fetch('URL_DO_BACKEND/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Falha na solicitação');
        }
        return response.json();
      })
      .then((data) => {
        // Aqui você pode lidar com a resposta do backend
        console.log('Resposta do backend:', data);
        setLoginSuccess(true);
      })
      .catch((error) => {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer login. Por favor, tente novamente.');
      });
  };

  // Função para validar o formato de email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Health Trackr</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#4CAF50"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Senha..."
          placeholderTextColor="#4CAF50"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} >
        <Text style={styles.signupText}>Ainda não tem cadastro? Cadastre-se!</Text>
      </TouchableOpacity>
      {loginSuccess && (
        <Text style={styles.successMessage}>Login realizado com sucesso!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#4CAF50',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#E8F5E9',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: '#4CAF50',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  signupText: {
    color: '#4CAF50',
    marginTop: 20,
  },
  successMessage: {
    marginTop: 20,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
