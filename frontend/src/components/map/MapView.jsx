import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import styles from './MapView.module.css'

// kasnije ce ići dinamički prema lokaciji korisnika
const ZAGREB = [45.81444, 15.97798];

/* 
  Transfuzijske centre ćemo prikazivati pomoću Marker i Popup
  ako ne postoji bolji način  
*/

const MapView = () => {
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
    </MapContainer>
  )
}

export default MapView