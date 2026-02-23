import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';
import { getMuestraById, getVinedoById } from '../database/db';

const SampleDetailScreen = ({ route, navigation }) => {
    const { sampleId } = route.params;
    const [muestra, setMuestra] = useState(null);
    const [vineyard, setVineyard] = useState(null);

    useEffect(() => {
        const m = getMuestraById(sampleId);
        if (m) {
            setMuestra(m);
            const v = getVinedoById(m.vinedo_id);
            setVineyard(v);
        }
    }, [sampleId]);

    if (!muestra) return <Text>Cargando...</Text>;

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Title title="Detalle de la Muestra" subtitle={muestra.variedad_uva} />
                <Card.Content>
                    <Text style={styles.label}>Fecha: <Text style={styles.value}>{muestra.fecha_hora_muestreo}</Text></Text>
                    <Divider style={styles.divider} />
                    <Text style={styles.label}>Grados Brix: <Text style={styles.value}>{muestra.grados_brix}°</Text></Text>
                    <Text style={styles.label}>Temperatura: <Text style={styles.value}>{muestra.temperatura}°C</Text></Text>
                    <Text style={styles.label}>pH: <Text style={styles.value}>{muestra.ph}</Text></Text>
                    <Text style={styles.label}>Peso: <Text style={styles.value}>{muestra.peso_muestra} kg</Text></Text>
                    <Divider style={styles.divider} />
                    {vineyard && (
                        <Text style={styles.label}>Viñedo: <Text style={styles.value}>{vineyard.localidad} ({vineyard.sistema_conduccion})</Text></Text>
                    )}
                    {muestra.observaciones ? (
                        <Text style={styles.label}>Obs: <Text style={styles.value}>{muestra.observaciones}</Text></Text>
                    ) : null}
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => navigation.navigate('EditSample', { sampleId: muestra.id })}>Editar</Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    card: { marginBottom: 16 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
    value: { fontWeight: 'normal' },
    divider: { marginVertical: 12 },
});

export default SampleDetailScreen;
