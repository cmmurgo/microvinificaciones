import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Title, Subheading } from 'react-native-paper';
import * as Location from 'expo-location';
import { insertVinedo } from '../database/db';

const AddVineyardScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    sistema_conduccion: '',
    estado_sanitario: '',
    tipo_suelo: '',
    tipo_riego: '',
    provincia: '',
    localidad: '',
    latitud: '',
    longitud: '',
    observaciones: '',
  });

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setForm({
      ...form,
      latitud: location.coords.latitude.toString(),
      longitud: location.coords.longitude.toString(),
    });
  };

  const save = () => {
    try {
      insertVinedo({
        ...form,
        latitud: parseFloat(form.latitud),
        longitud: parseFloat(form.longitud),
      });
      alert('Viñedo guardado localmente');
      navigation.goBack();
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title>Nuevo Viñedo</Title>
      <TextInput label="Sistema de Conducción" value={form.sistema_conduccion} onChangeText={t => setForm({...form, sistema_conduccion: t})} />
      <TextInput label="Estado Sanitario" value={form.estado_sanitario} onChangeText={t => setForm({...form, estado_sanitario: t})} />
      <TextInput label="Tipo de Suelo" value={form.tipo_suelo} onChangeText={t => setForm({...form, tipo_suelo: t})} />
      <TextInput label="Tipo de Riego" value={form.tipo_riego} onChangeText={t => setForm({...form, tipo_riego: t})} />
      <TextInput label="Provincia" value={form.provincia} onChangeText={t => setForm({...form, provincia: t})} />
      <TextInput label="Localidad" value={form.localidad} onChangeText={t => setForm({...form, localidad: t})} />
      <View style={styles.row}>
        <TextInput style={{flex: 1}} label="Latitud" value={form.latitud} keyboardType="numeric" onChangeText={t => setForm({...form, latitud: t})} />
        <TextInput style={{flex: 1}} label="Longitud" value={form.longitud} keyboardType="numeric" onChangeText={t => setForm({...form, longitud: t})} />
      </View>
      <Button mode="outlined" onPress={getLocation}>Obtener GPS</Button>
      <TextInput label="Observaciones" multiline={true} numberOfLines={3} value={form.observaciones} onChangeText={t => setForm({...form, observaciones: t})} />
      <Button mode="contained" onPress={save} style={styles.button}>Guardar Localmente</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  row: { flexDirection: 'row', gap: 8, marginVertical: 8 },
  button: { marginTop: 16, marginBottom: 32 },
});

export default AddVineyardScreen;
