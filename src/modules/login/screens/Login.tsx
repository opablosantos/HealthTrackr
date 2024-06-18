import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { ContainerLogin, Imagemlogo } from '../styles/login.style';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../shared/components/text/Text';

import notifee, { AndroidImportance, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';

const Login = () => {
    async function createChannelId() {
        const channelId = await notifee.createChannel({
            id: 'test',
            name: 'sales',
            vibration: true,
            importance: AndroidImportance.HIGH
        });

        return channelId;
    }

    async function displayNotification() {
        await notifee.requestPermission();

        const channelId = await createChannelId();

        await notifee.displayNotification({
            id: '7',
            title: 'Olá, Pablo!',
            body: 'Essa é minha primeira notificação.',
            android: { channelId }
        });
    }

    async function updateNotification() {
        await notifee.requestPermission();

        const channelId = await createChannelId();

        await notifee.displayNotification({
            id: '7',
            title: 'Olá, <strong>Pablo!</strong> 😎',
            body: 'Essa é minha <span style="color:red;">notificação atualizada.</span> 🤩',
            android: { channelId }
        });
    }

    async function cancelNotification() {
        await notifee.cancelNotification('7');
    }

    async function scheduleNotification() {
        const date = new Date(Date.now());
        date.setMinutes(date.getMinutes() + 1);

        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime()
        }

        const channelId = await createChannelId();

        await notifee.createTriggerNotification({
            title: 'Notificação agendada! ⏰',
            body: 'Esta é uma Notificação agendada',
            android: {
                channelId
            }
        }, trigger);
    }

    async function listScheduledNotifications() {
        notifee.getTriggerNotificationIds().then(ids => console.log(ids));
    }

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('Usuário descartou a notificação!');
                    break;
                case EventType.ACTION_PRESS:
                    console.log('Usuário tocou na notificação!', detail.notification);
            }
        });
    }, []);

    useEffect(() => {
        return notifee.onBackgroundEvent(async ({ type, detail }) => {
            if (type === EventType.PRESS) {
                console.log('Usuário tocou na notificação!', detail.notification);
            }
        });
    }, []);

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

                <Button margin="4px" title="Enviar Notificação" onPress={displayNotification}/>
                <Button margin="4px" title="Atualizar Notificação" onPress={updateNotification}/>
                <Button margin="4px" title="Cancelar Notificação" onPress={cancelNotification}/>
                <Button margin="4px" title="Agendar Notificação" onPress={scheduleNotification}/>
                <Button margin="4px" title="Listar Notificações" onPress={listScheduledNotifications}/>
            </ContainerLogin>
        </View>
    );
};

export default Login;
