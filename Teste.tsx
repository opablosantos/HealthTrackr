import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from './src/shared/components/button/Button';

const AlarmCreateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { medication, alarm } = route.params || {};

  const [medicationName, setMedicationName] = useState(medication?.nomeProduto || alarm?.nom_medicamento || '');
  const [dosage, setDosage] = useState(alarm?.dosagem || '');
  const [time, setTime] = useState(alarm?.hr_alarme ? new Date(alarm.hr_alarme) : new Date());
  const [frequency, setFrequency] = useState(alarm?.frequencia || '1 vez ao dia');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const frequencies = ['1 vez ao dia', '2 vezes ao dia', '3 vezes ao dia', '4 vezes ao dia'];

  const getAbbreviatedName = (name, frequency) => {
    const freqMap = {
      '1 vez ao dia': '1x',
      '2 vezes ao dia': '2x',
      '3 vezes ao dia': '3x',
      '4 vezes ao dia': '4x'
    };
    return `${name.substring(0, 3)}${freqMap[frequency]}`;
  };

  const handleSaveAlarm = async () => {
    if (!medicationName || !time || !frequency || !dosage) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const alarmName = getAbbreviatedName(medicationName, frequency);

    const currentDate = new Date();
    const alarmDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), time.getHours(), time.getMinutes());

    const payload = {
      seq_usuario: 1,
      nom_alarme: alarmName,
      dat_alarme: currentDate.toISOString(),
      hr_alarme: alarmDate.toISOString(),
      repeticao_alarme: 8,
      tempo_repeticao: currentDate.toISOString(),
      sit_alarme: "1",
      nom_medicamento: medicationName,
      dosagem: dosage,
      frequencia: frequency,
    };

    try {
      const method = alarm ? 'PUT' : 'POST';
      const url = alarm ? `https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/alarme/${alarm.seq_alarme}` : 'https://healthtrackr-ae78ac7c7b4f.herokuapp.com/api/alarme';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Alert.alert('Sucesso', `Alarme ${alarm ? 'atualizado' : 'cadastrado'} com sucesso!`);
        navigation.navigate('Alarmes');
      } else {
        const errorData = await response.json();
        console.error('Erro ao salvar alarme:', errorData);
        Alert.alert('Erro', `Ocorreu um erro ao salvar o alarme: ${errorData.message || 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error('Erro ao salvar alarme:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar o alarme. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome do Medicamento"
        value={medicationName}
        onChangeText={setMedicationName}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosagem (mg)"
        value={dosage}
        onChangeText={setDosage}
      />
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Hora (HH:MM)"
          value={time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
          editable={false}
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      )}
      <Picker
        selectedValue={frequency}
        onValueChange={(itemValue) => setFrequency(itemValue)}
        style={styles.input}
      >
        {frequencies.map(freq => (
          <Picker.Item key={freq} label={freq} value={freq} />
        ))}
      </Picker>
      <View style={styles.buttonContainer}>
        <Button title="Salvar Alarme" onPress={handleSaveAlarm} style={styles.button} />
        <View style={styles.separator} />
        <Button title="Voltar" onPress={() => navigation.navigate('Alarmes')} style={styles.button} />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    width: 10, // Largura do espaço entre os botões
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default AlarmCreateScreen;