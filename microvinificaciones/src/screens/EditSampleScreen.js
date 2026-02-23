import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { getMuestraById, updateMuestra, getAllVinedos } from '../database/db';
import { Picker } from '@react-native-picker/picker';

const EditSampleScreen = ({ route, navigation }) => {
    const { sampleId } = route.params;
    const [vinedos, setVinedos] = useState([]);
    const [vinedoId, setVinedoId] = useState('');
    const [variedadUva, setVariedadUva] = useState('');
    const [gradosBrix, setGradosBrix] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [ph, setPh] = useState('');
    const [pesoMuestra, setPesoMuestra] = useState('');
    const [observaciones, setObservaciones] = useState('');

    useEffect(() => {
        setVinedos(getAllVinedos());
        const muestra = getMuestraById(sampleId);
        if (muestra) {
            setVinedoId(muestra.vinedo_id.toString());
            setVariedadUva(muestra.variedad_uva || '');
            setGradosBrix(muestra.grados_brix?.toString() || '');
            setTemperatura(muestra.temperatura?.toString() || '');
            setPh(muestra.ph?.toString() || '');
            setPesoMuestra(muestra.peso_muestra?.toString() || '');
            setObservaciones(muestra.observaciones || '');
        }
    }, [sampleId]);

    const handleSave = () => {
        updateMuestra(sampleId, {
            vinedo_id: parseInt(vinedoId),
            variedad_uva: variedadUva,
            grados_brix: parseFloat(gradosBrix),
            temperatura: parseFloat(temperatura),
            ph: parseFloat(ph),
            peso_muestra: parseFloat(pesoMuestra),
            observaciones,
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Editar Pequeña Muestra" />
                <Card.Content>
                    <Title>Viñedo</Title>
                    <Picker
                        selectedValue={vinedoId}
                        onValueChange={(itemValue) => setVinedoId(itemValue)}
                    >
                        {vinedos.map((v) => (
                            <Picker.Item key={v.id} label={`${v.localidad} (${v.sistema_conduccion})`} value={v.id.toString()} />
                        ))}
                    </Picker>

                    <TextInput label="Variedad de Uva" value={variedadUva} onChangeText={setVariedadUva} style={styles.input} />
                    <TextInput label="Grados Brix" value={gradosBrix} onChangeText={setGradosBrix} style={styles.input} keyboardType="numeric" />
                    <TextInput label="Temperatura (°C)" value={temperatura} onChangeText={setTemperatura} style={styles.input} keyboardType="numeric" />
                    <TextInput label="pH" value={ph} onChangeText={setPh} style={styles.input} keyboardType="numeric" />
                    <TextInput label="Peso Muestra (kg)" value={pesoMuestra} onChangeText={setPesoMuestra} style={styles.input} keyboardType="numeric" />
                    <TextInput label="Observaciones" value={observaciones} onChangeText={setObservaciones} style={styles.input} multiline numberOfLines={3} />
                    <Button mode="contained" onPress={handleSave} style={styles.button}>Guardar Cambios</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
    card: { padding: 8 },
    input: { marginBottom: 12 },
    button: { marginTop: 8 },
});

export default EditSampleScreen;
