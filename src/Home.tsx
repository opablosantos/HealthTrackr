import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from './shared/components/button/Button';

const Home = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Bem-vindo!</Text>
            <Button margin="16px" title="BUSCAR MEDICAMENTO" onPress={() => navigation.navigate('BuscaMedicamento')}/>
            <Button margin="16px" title="MEUS ALARMES" onPress={() => navigation.navigate('Alarmes')}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 24,
        marginBottom: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
    },
    separator: {
        width: 10, // Largura do espaço entre os botões
    },
});

export default Home;
