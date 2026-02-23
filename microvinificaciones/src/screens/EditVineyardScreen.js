import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { getVinedoById, updateVinedo } from '../database/db';
import * as Location from 'expo-location';

const EditVineyardScreen = ({ route, navigation }) => {
    const { vineyardId } = route.params;
    const [sistemaConduccion, setSistemaConduccion] = useState('');
    const [estadoSanitario, setEstadoSanitario] = useState('');
    const [tipoSuelo, setTipoSuelo] = useState('');
    const [tipoRiego, setTipoRiego] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [observaciones, setObservaciones] = useState('');

    useEffect(() => {
        const vineyard = getVinedoById(vineyardId);
        if (vineyard) {
            setSistemaConduccion(vineyard.sistema_conduccion || '');
            setEstadoSanitario(vineyard.estado_sanitario || '');
            setTipoSuelo(vineyard.tipo_suelo || '');
            setTipoRiego(vineyard.tipo_riego || '');
            setProvincia(vineyard.provincia || '');
            setLocalidad(vineyard.localidad || '');
            setLatitud(vineyard.latitud?.toString() || '');
            setLongitud(vineyard.longitud?.toString() || '');
            setObservaciones(vineyard.observaciones || '');
        }
    }, [vineyardId]);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        let location = await Location.getCurrentPositionAsync({});
        setLatitud(location.coords.latitude.toString());
        setLongitud(location.coords.longitude.toString());
    };

    const handleSave = () => {
        updateVinedo(vineyardId, {
            sistema_conduccion: sistemaConduccion,
            estado_sanitario: estadoSanitario,
            tipo_suelo: tipoSuelo,
            tipo_riego: tipoRiego,
            provincia,
            localidad,
            latitud: parseFloat(latitud),
            longitud: parseFloat(longitud),
            observaciones,
        });
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Title>Editar Viñedo</Title>
                    <TextInput label="Sistema de Conducción" value={sistemaConduccion} onChangeText={setSistemaConduccion} style={styles.input} />
                    <TextInput label="Estado Sanitario" value={estadoSanitario} onChangeText={setEstadoSanitario} style={styles.input} />
                    <TextInput label="Tipo de Suelo" value={tipoSuelo} onChangeText={setTipoSuelo} style={styles.input} />
                    <TextInput label="Tipo de Riego" value={tipoRiego} onChangeText={setTipoRiego} style={styles.input} />
                    <TextInput label="Provincia" value={provincia} onChangeText={setProvincia} style={styles.input} />
                    <TextInput label="Localidad" value={localidad} onChangeText={setLocalidad} style={styles.input} />
                    <View style={styles.locationContainer}>
                        <TextInput label="Latitud" value={latitud} onChangeText={setLatitud} style={[styles.input, { flex: 1, marginRight: 8 }]} keyboardType="numeric" />
                        <TextInput label="Longitud" value={longitud} onChangeText={setLongitud} style={[styles.input, { flex: 1 }]} keyboardType="numeric" />
                    </View>
                    <Button mode="outlined" onPress={getLocation} style={styles.button}>Obtener GPS</Button>
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
    locationContainer: { flexDirection: 'row', marginBottom: 12 },
    button: { marginTop: 8 },
});

export default EditVineyardScreen;
