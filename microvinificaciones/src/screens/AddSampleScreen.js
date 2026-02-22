import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Title, List } from 'react-native-paper';
import { insertMuestra, getAllVinedos } from '../database/db';

const AddSampleScreen = ({ navigation }) => {
  const [vinedos, setVinedos] = useState([]);
  const [selectedVinedo, setSelectedVinedo] = useState(null);
  const [showVinedos, setShowVinedos] = useState(false);
  const [form, setForm] = useState({
    variedad_uva: '',
    grados_brix: '',
    temperatura: '',
    ph: '',
    peso_muestra: '',
    observaciones: '',
  });

  useEffect(() => {
    setVinedos(getAllVinedos());
  }, []);

  const save = () => {
    if (!selectedVinedo) {
      alert('Seleccione un viñedo');
      return;
    }
    try {
      insertMuestra({
        ...form,
        vinedo_id: selectedVinedo.id,
        grados_brix: parseFloat(form.grados_brix),
        temperatura: parseFloat(form.temperatura),
        ph: parseFloat(form.ph),
        peso_muestra: parseFloat(form.peso_muestra),
        fecha_hora_muestreo: new Date().toISOString(),
      });
      alert('Muestra guardada localmente');
      navigation.goBack();
    } catch (error) {
      alert('Error al guardar: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Title>Nueva Muestra</Title>
      
      <Button mode="outlined" onPress={() => setShowVinedos(!showVinedos)}>
        {selectedVinedo ? `Viñedo: ${selectedVinedo.localidad} - ${selectedVinedo.sistema_conduccion}` : 'Seleccionar Viñedo'}
      </Button>
      
      {showVinedos && vinedos.map(v => (
        <List.Item
          key={v.id}
          title={`${v.localidad} - ${v.sistema_conduccion}`}
          onPress={() => {
            setSelectedVinedo(v);
            setShowVinedos(false);
          }}
        />
      ))}

      <TextInput label="Variedad de Uva" value={form.variedad_uva} onChangeText={t => setForm({...form, variedad_uva: t})} />
      <TextInput label="Grados Brix" keyboardType="numeric" value={form.grados_brix} onChangeText={t => setForm({...form, grados_brix: t})} />
      <TextInput label="Temperatura" keyboardType="numeric" value={form.temperatura} onChangeText={t => setForm({...form, temperatura: t})} />
      <TextInput label="pH" keyboardType="numeric" value={form.ph} onChangeText={t => setForm({...form, ph: t})} />
      <TextInput label="Peso de la Muestra" keyboardType="numeric" value={form.peso_muestra} onChangeText={t => setForm({...form, peso_muestra: t})} />
      <TextInput label="Observaciones" multiline={true} numberOfLines={3} value={form.observaciones} onChangeText={t => setForm({...form, observaciones: t})} />
      
      <Button mode="contained" onPress={save} style={styles.button}>Guardar Muestra</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  button: { marginTop: 16, marginBottom: 32 },
});

export default AddSampleScreen;
