import axios from 'axios';

// Replace with your local IP if testing on a physical device
const API_BASE_URL = 'http://192.168.100.19:8080'; 
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const syncVinedo = async (vinedo) => {
  const { id, ...data } = vinedo;
  const response = await api.post('/vinedo', data);
  return response.data;
};

export const syncMuestra = async (muestra) => {
  const { id, ...data } = muestra;
  const response = await api.post('/muestra', data);
  return response.data;
};
