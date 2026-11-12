import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import styles from './MapView.module.css';
import { dohvatiCentre } from '../../services/centriService'; // funkcija za dohvat s backenda

// centar Zagreba - početna lokacija
const ZAGREB = [45.81444, 15.97798];

const MapView = () => {
  const [centri, setCentri] = useState([]);

  // dohvat podataka s backenda
  useEffect(() => {
    const ucitajCentre = async () => {
      try {
        const podaci = await dohvatiCentre();
        setCentri(podaci);
      } catch (error) {
        console.error("Greška pri učitavanju centara za mapu:", error);
      }
    };

    ucitajCentre();
  }, []);

  return (
    <MapContainer
      className={styles.map}
      center={ZAGREB}
      zoom={15}
      maxZoom={18}
      minZoom={12}
      scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* dinamički prikaz markera za svaki centar s backenda */}
      {centri.map((centar) => (
        <Marker
          key={centar.id || centar._id}
          position={[centar.lat, centar.lng]}
        >
          <Popup>
            <div className={styles.popupContent}>
              <h3>{centar.naziv}</h3>
              <p><strong>Adresa:</strong> {centar.adresa}</p>
              <p><strong>Radno vrijeme:</strong> {centar.radnoVrijeme}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
