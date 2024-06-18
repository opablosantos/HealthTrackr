import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { ContainerLogin, Imagemlogo } from '../styles/login.style';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../shared/components/text/Text';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const response = await fetch('https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.status === 200) {
                Alert.alert('Sucesso', 'Você entrou com sucesso!');
                // Aqui você pode salvar o token se necessário
                navigation.navigate('Home');
            } else {
                Alert.alert('Erro', data.message || 'Usuário ou senha inválidos');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Erro ao realizar login');
        }
    };

    return (
        <View>
            <ContainerLogin>
                <Imagemlogo resizeMode="contain" source={require('../../../assets/images/logo.png')} />
                <Text style={{ fontSize: 50 }}>Health Trackr</Text>
                <Input
                    margin="0px 0px 8px 0px"
                    placeholder="Digite seu email"
                    title="Email:"
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    secureTextEntry
                    placeholder="Digite sua senha"
                    title="Senha:"
                    value={senha}
                    onChangeText={setSenha}
                />
                <Button margin="16px" title="ENTRAR" onPress={handleLogin} />
                <Text>Ainda não tem cadastro?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={{ textDecorationLine: 'underline' }}>Cadastre-se aqui</Text>
                </TouchableOpacity>
            </ContainerLogin>
        </View>
    );
};

export default Login;
