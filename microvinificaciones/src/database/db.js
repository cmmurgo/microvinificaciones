import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('microvinificaciones.db');

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS vinedo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      remote_id INTEGER,
      sistema_conduccion TEXT,
      estado_sanitario TEXT,
      tipo_suelo TEXT,
      tipo_riego TEXT,
      provincia TEXT,
      localidad TEXT,
      latitud REAL,
      longitud REAL,
      observaciones TEXT,
      synced INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS muestra (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      remote_id INTEGER,
      vinedo_id INTEGER,
      variedad_uva TEXT,
      grados_brix REAL,
      temperatura REAL,
      ph REAL,
      fecha_hora_muestreo TEXT,
      peso_muestra REAL,
      observaciones TEXT,
      synced INTEGER DEFAULT 0,
      FOREIGN KEY (vinedo_id) REFERENCES vinedo (id)
    );
  `);
};

export const insertVinedo = (vinedo) => {
  return db.runSync(
    `INSERT INTO vinedo (sistema_conduccion, estado_sanitario, tipo_suelo, tipo_riego, provincia, localidad, latitud, longitud, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      vinedo.sistema_conduccion,
      vinedo.estado_sanitario,
      vinedo.tipo_suelo,
      vinedo.tipo_riego,
      vinedo.provincia,
      vinedo.localidad,
      vinedo.latitud,
      vinedo.longitud,
      vinedo.observaciones,
    ]
  );
};

export const insertMuestra = (muestra) => {
  return db.runSync(
    `INSERT INTO muestra (vinedo_id, variedad_uva, grados_brix, temperatura, ph, fecha_hora_muestreo, peso_muestra, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      muestra.vinedo_id,
      muestra.variedad_uva,
      muestra.grados_brix,
      muestra.temperatura,
      muestra.ph,
      muestra.fecha_hora_muestreo,
      muestra.peso_muestra,
      muestra.observaciones,
    ]
  );
};

export const getUnsyncedVinedos = () => {
  return db.getAllSync('SELECT * FROM vinedo WHERE synced = 0');
};

export const getUnsyncedMuestras = () => {
  return db.getAllSync('SELECT * FROM muestra WHERE synced = 0');
};

export const markVinedoSynced = (id, remote_id) => {
  db.runSync('UPDATE vinedo SET synced = 1, remote_id = ? WHERE id = ?', [remote_id, id]);
};

export const markMuestraSynced = (id, remote_id) => {
  db.runSync('UPDATE muestra SET synced = 1, remote_id = ? WHERE id = ?', [remote_id, id]);
};

export const getAllVinedos = () => {
  return db.getAllSync('SELECT * FROM vinedo ORDER BY id DESC');
};

export const getVinedoById = (id) => {
  return db.getFirstSync('SELECT * FROM vinedo WHERE id = ?', [id]);
};

export const updateVinedo = (id, vinedo) => {
  return db.runSync(
    `UPDATE vinedo SET sistema_conduccion = ?, estado_sanitario = ?, tipo_suelo = ?, tipo_riego = ?, provincia = ?, localidad = ?, latitud = ?, longitud = ?, observaciones = ?, synced = 0 WHERE id = ?`,
    [
      vinedo.sistema_conduccion,
      vinedo.estado_sanitario,
      vinedo.tipo_suelo,
      vinedo.tipo_riego,
      vinedo.provincia,
      vinedo.localidad,
      vinedo.latitud,
      vinedo.longitud,
      vinedo.observaciones,
      id
    ]
  );
};

export const getMuestrasByVinedoId = (vinedoId) => {
  return db.getAllSync('SELECT * FROM muestra WHERE vinedo_id = ? ORDER BY fecha_hora_muestreo DESC', [vinedoId]);
};

export const getMuestraById = (id) => {
  return db.getFirstSync('SELECT * FROM muestra WHERE id = ?', [id]);
};

export const updateMuestra = (id, muestra) => {
  return db.runSync(
    `UPDATE muestra SET vinedo_id = ?, variedad_uva = ?, grados_brix = ?, temperatura = ?, ph = ?, peso_muestra = ?, observaciones = ?, synced = 0 WHERE id = ?`,
    [
      muestra.vinedo_id,
      muestra.variedad_uva,
      muestra.grados_brix,
      muestra.temperatura,
      muestra.ph,
      muestra.peso_muestra,
      muestra.observaciones,
      id
    ]
  );
};
