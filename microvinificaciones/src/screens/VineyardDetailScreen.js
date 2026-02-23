import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, List, Divider, FAB } from 'react-native-paper';
import { getVinedoById, getMuestrasByVinedoId } from '../database/db';

const VineyardDetailScreen = ({ route, navigation }) => {
    const { vineyardId } = route.params;
    const [vineyard, setVineyard] = useState(null);
    const [muestras, setMuestras] = useState([]);

    const fetchData = () => {
        const v = getVinedoById(vineyardId);
        setVineyard(v);
        const m = getMuestrasByVinedoId(vineyardId);
        setMuestras(m);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [navigation]);

    if (!vineyard) return <Text>Cargando...</Text>;

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={styles.card}>
                    <Card.Title title="Información del Viñedo" subtitle={vineyard.localidad} />
                    <Card.Content>
                        <Text style={styles.label}>Sistema: <Text style={styles.value}>{vineyard.sistema_conduccion}</Text></Text>
                        <Text style={styles.label}>Estado Sanitario: <Text style={styles.value}>{vineyard.estado_sanitario}</Text></Text>
                        <Text style={styles.label}>Suelo: <Text style={styles.value}>{vineyard.tipo_suelo}</Text></Text>
                        <Text style={styles.label}>Riego: <Text style={styles.value}>{vineyard.tipo_riego}</Text></Text>
                        <Text style={styles.label}>Provincia: <Text style={styles.value}>{vineyard.provincia}</Text></Text>
                        <Text style={styles.label}>GPS: <Text style={styles.value}>{vineyard.latitud}, {vineyard.longitud}</Text></Text>
                        {vineyard.observaciones ? (
                            <Text style={styles.label}>Obs: <Text style={styles.value}>{vineyard.observaciones}</Text></Text>
                        ) : null}
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={() => navigation.navigate('EditVineyard', { vineyardId: vineyard.id })}>Editar</Button>
                    </Card.Actions>
                </Card>

                <Text style={styles.sectionTitle}>Muestras</Text>
                {muestras.length === 0 ? (
                    <Text style={styles.emptyText}>No hay muestras registradas para este viñedo.</Text>
                ) : (
                    muestras.map((m) => (
                        <List.Item
                            key={m.id}
                            title={`${m.variedad_uva} - ${m.grados_brix}° Brix`}
                            description={`${m.fecha_hora_muestreo} - pH: ${m.ph}`}
                            onPress={() => navigation.navigate('SampleDetail', { sampleId: m.id })}
                            left={props => <List.Icon {...props} icon="flask" />}
                            right={props => <List.Icon {...props} icon="chevron-right" />}
                        />
                    ))
                )}
            </ScrollView>
            <FAB
                style={styles.fab}
                icon="plus"
                label="Nueva Muestra"
                onPress={() => navigation.navigate('AddSample', { vineyardId: vineyard.id })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: { margin: 16 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
    value: { fontWeight: 'normal' },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', marginHorizontal: 16, marginTop: 16, marginBottom: 8 },
    emptyText: { marginHorizontal: 16, color: '#666', fontStyle: 'italic' },
    fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});

export default VineyardDetailScreen;
