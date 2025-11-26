import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import styles from './MapItem.module.scss'

// Исправленная иконка (стандартная синяя метка Leaflet)
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Применяем иконку по умолчанию ко всем маркерам
L.Marker.prototype.options.icon = DefaultIcon

interface MapItemProps {
  lat: number
  lng: number
  title?: string
  description?: string
  zoom?: number
  height?: string
}

const MapItem: React.FC<MapItemProps> = ({
  lat,
  lng,
  title = 'Метка',
  description,
  zoom = 15,
  height = '300px',
}) => {
  const center: [number, number] = [lat, lng]

  return (
    <div className="container">
        <h1>{title}</h1>
        <div className="">{description}</div>
        <br />
        <div className={styles.mapItem}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false} // удобно в карточках
        zoomControl={false}     // убираем лишние кнопки для минимализма
        style={{ height, width: '100%' }}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={center}>
          <Popup offset={[0, -10]}>
            <div className={styles.popup}>
              {title && <strong>{title}</strong>}
              {description && <div className={styles.popupDesc}>{description}</div>}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
    </div>
    
  )
}

export default MapItem