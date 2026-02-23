import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Title, Card, Text, FAB } from 'react-native-paper';
import { getUnsyncedVinedos, getUnsyncedMuestras, markVinedoSynced, markMuestraSynced, getAllVinedos } from '../database/db';
import { syncVinedo, syncMuestra } from '../services/api';

const HomeScreen = ({ navigation }) => {
  const [vinedos, setVinedos] = useState([]);
  const [syncing, setSyncing] = useState(false);

  const loadData = () => {
    setVinedos(getAllVinedos());
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [navigation]);

  const handleSync = async () => {
    setSyncing(true);
    try {
      // 1. Sync Vineyards first
      const unsyncedVinedos = getUnsyncedVinedos();
      for (const v of unsyncedVinedos) {
        const result = await syncVinedo(v);
        markVinedoSynced(v.id, result.id);
      }

      // 2. Sync Samples
      const allVinedos = getAllVinedos(); // Get updated list with remote_ids
      const unsyncedMuestras = getUnsyncedMuestras();

      for (const m of unsyncedMuestras) {
        const localVinedo = allVinedos.find(v => v.id === m.vinedo_id);
        if (localVinedo && localVinedo.synced) {
          const sampleData = { ...m, vinedo_id: localVinedo.remote_id };
          const result = await syncMuestra(sampleData);
          markMuestraSynced(m.id, result.id);
        } else {
          console.warn(`Muestra ${m.id} skip: Vinedo not synced or not found`);
        }
      }
      alert('Sincronización completada');
      loadData();
    } catch (error) {
      alert('Error de sincronización: ' + (error.response?.data?.message || error.message));
    } finally {
      setSyncing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Microvinificaciones</Title>
      <Button mode="contained" icon="sync" loading={!!syncing} onPress={handleSync} style={styles.syncButton}>
        Sincronizar Datos
      </Button>

      <FlatList
        data={vinedos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Card
            style={styles.card}
            onPress={() => navigation.navigate('VineyardDetail', { vineyardId: item.id })}
          >
            <Card.Title title={item.localidad} subtitle={item.sistema_conduccion} />
            <Card.Content>
              <Text>{item.observaciones}</Text>
            </Card.Content>
          </Card>
        )}
      />

      <FAB
        icon="plus"
        style={styles.fabVineyard}
        label="Viñedo"
        onPress={() => navigation.navigate('AddVineyard')}
      />
      <FAB
        icon="plus"
        style={styles.fabSample}
        label="Muestra"
        onPress={() => navigation.navigate('AddSample')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { textAlign: 'center', marginBottom: 16 },
  syncButton: { marginBottom: 16 },
  card: { marginBottom: 8 },
  fabVineyard: { position: 'absolute', margin: 16, right: 0, bottom: 80 },
  fabSample: { position: 'absolute', margin: 16, right: 0, bottom: 10 },
});

export default HomeScreen;
