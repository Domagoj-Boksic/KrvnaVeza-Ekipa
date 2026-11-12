import api from './api';

export const dohvatiCentre = async () => {
  try {
    const response = await api.get('/api/centri'); // Prilagodit rutu prema backendu
    return response.data;
  } catch (error) {
    console.error("Greška pri dohvatu centara za doniranje:", error);
    throw error;
  }
};
