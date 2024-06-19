import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Icon } from './shared/components/icon/Icon';
import Button from './shared/components/button/Button';
import ButtonBack from './shared/components/button/ButtonBack';

const AlarmListScreen = () => {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchAlarms = async () => {
    try {
      const response = await fetch('https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/alarme');
      const data = await response.json();
      setAlarms(data);
    } catch (error) {
      console.error('Erro ao buscar alarmes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchAlarms();
    }, [])
  );

  const handleDeleteAlarm = async (id) => {
    try {
      await fetch(`https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/alarme/${id}`, {
        method: 'DELETE',
      });
      setAlarms(alarms.filter(alarm => alarm.seq_alarme !== id));
    } catch (error) {
      console.error('Erro ao deletar alarme:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao deletar o alarme. Por favor, tente novamente.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemTitle}>{item.nom_medicamento}</Text>
        <Text style={styles.itemText}>{new Date(item.hr_alarme).toLocaleTimeString()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('CadastrarAlarme', { alarm: item })}>
          <Icon name="pencil" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => handleDeleteAlarm(item.seq_alarme)}>
          <Icon name="bin" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={alarms}
        renderItem={renderItem}
        keyExtractor={item => item.seq_alarme.toString()}
      />
      <View>
        <Button margin="8px" title="CADASTRAR NOVO ALARME" onPress={() => navigation.navigate('CadastrarAlarme')}/>
        <ButtonBack margin="8px" title="VOLTAR" onPress={() => navigation.navigate('Home')}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 10, // Espaço entre os ícones
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Espaço entre a lista e os botões
  },
});

export default AlarmListScreen;
