import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList, Linking } from 'react-native';
import Button from './shared/components/button/Button';
import { useNavigation } from '@react-navigation/native';

const MedicationSearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const searchMedication = () => {
    if (!searchTerm) {
      Alert.alert('Erro', 'Por favor, digite o nome do medicamento.');
      return;
    }

    setLoading(true);

    fetch(`https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/pesquisar?nome=${encodeURIComponent(searchTerm)}&pagina=1`)
      .then(response => response.json())
      .then(data => {
        setMedications(data.content);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
        setLoading(false);
      });
  };

  const handleDownloadPDF = async (medication) => {
    const idBula = medication.idBulaPacienteProtegido;
    try {
      const pdfUrl = `https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/pdf?id=${idBula}`;
      await Linking.openURL(pdfUrl);
    } catch (error) {
      console.error('Erro ao baixar o PDF:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao baixar o PDF. Por favor, tente novamente.');
    }
  };

  const handleAddAlarm = (medication) => {
    navigation.navigate('CadastrarAlarme', { medication });
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.nomeProduto}</Text>
      <Text style={styles.itemInfo}>Número de Registro: {item.numeroRegistro}</Text>
      <Text style={styles.itemInfo}>Razão Social: {item.razaoSocial}</Text>
      <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownloadPDF(item)}>
        <Text style={styles.downloadButtonText}>Baixar Bula</Text>
      </TouchableOpacity>
      <Button title="Adicionar Alarme" onPress={() => handleAddAlarm(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do medicamento"
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
      />
      <Button title="Pesquisar" onPress={searchMedication} />
      
      {loading && <Text>Carregando...</Text>}

      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={item => item.idProduto.toString()}
      />

      <Button title="Voltar" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  itemInfo: {
    fontSize: 14,
  },
  downloadButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MedicationSearchScreen;