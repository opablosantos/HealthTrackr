import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Button from './shared/components/button/Button';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const navigation = useNavigation();

  const handleSignup = async () => {
    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !senha || !telefone || !idade || !genero) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom_usuario: nome,
          dsc_email: email,
          dsc_senha: senha,
          dsc_ddd_celular: telefone.substring(0, 2), // Extrai o DDD do telefone
          dsc_fone_celular: telefone.substring(2), // Extrai o número de telefone sem o DDD
          dsc_idade: idade,
          cod_genero: genero // Adiciona o gênero ao corpo da requisição
        }),
      });

      if (!response.ok) {
        throw new Error('Falha na solicitação');
      }

      const data = await response.json();
      // Aqui você pode lidar com a resposta do backend
      console.log('Resposta do backend:', data);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer o cadastro. Por favor, tente novamente.');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={100}>
        <Text style={styles.logo}>Cadastro</Text>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          onChangeText={(text) => setNome(text)}
          value={nome}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry={true}
          onChangeText={(text) => setSenha(text)}
          value={senha}
        />
        <Text style={styles.label}>Telefone:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu telefone"
          onChangeText={(text) => setTelefone(text)}
          value={telefone}
        />
        <Text style={styles.label}>Idade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua idade"
          keyboardType="numeric"
          onChangeText={(text) => setIdade(text)}
          value={idade}
        />
        <Text style={styles.label}>Gênero (0-Masculino, 1-Feminino, 2-Outro):</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu gênero"
          keyboardType="numeric"
          onChangeText={(text) => setGenero(text)}
          value={genero}
        />
        <Button margin="16px" title="CADASTRAR" onPress={handleSignup} />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#4CAF50',
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'flex-start', // Alinha o texto à esquerda
  },
  input: {
    width: '100%', // Ocupa 100% da largura
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  signupBtn: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  signupText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SignupScreen;
