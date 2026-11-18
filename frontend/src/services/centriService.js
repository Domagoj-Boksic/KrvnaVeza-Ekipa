import apiRequest from './api';

export const dohvatiCentre = async () => {
  try {
    const data = await apiRequest('/api/centri'); // Prilagodit rutu prema backendu
    return data;
  } catch (error) {
    console.error("Greška pri dohvatu centara za doniranje:", error);
    throw error;
  }
};
