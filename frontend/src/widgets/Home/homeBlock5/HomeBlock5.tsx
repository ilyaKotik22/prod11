import React, { useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import styles from './HomeBlock5.module.scss'
import img1 from '../../../../public/team2-no.png'

type Office = {
  id: string
  name: string
  address: string
  lat: number
  lng: number
  phone?: string
}

interface OfficeMapProps {
  offices?: Office[]
  initialCenter?: [number, number]
  initialZoom?: number
  height?: string
}

// Фиксим иконку один раз
const DefaultIcon = L.icon({
  iconUrl: img1,
  iconRetinaUrl: img1,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

const sampleOffices: Office[] = [
  {
    id: '1',
    name: 'Главный офис',
    address: 'ул. Примерная, 10, Москва',
    lat: 55.7558,
    lng: 37.6173,
    phone: '+7 (495) 111-22-33',
  },
  {
    id: '2',
    name: 'Региональный офис',
    address: 'ул. Вторая, 5, Санкт-Петербург',
    lat: 59.9311,
    lng: 30.3609,
    phone: '+7 (812) 222-33-44',
  },
]

const MapController: React.FC<{
  center: [number, number]
  zoom: number
  target?: [number, number] | null
}> = ({ center, zoom, target }) => {
  const map = useMap()

  React.useEffect(() => {
    if (!map) return

    if (target) {
      map.flyTo(target, Math.max(zoom, 13), { duration: 1 })
    } else {
      map.setView(center, zoom)
    }
  }, [map, center, zoom, target])

  return null
}

export default function HomeBlock5({
  offices = sampleOffices,
  initialCenter,
  initialZoom = 6,
  height = '500px', // теперь фиксированная высота по умолчанию
}: OfficeMapProps) {
  const center = useMemo(
    () =>
      (initialCenter ?? [
        offices[0]?.lat ?? 55.7558,
        offices[0]?.lng ?? 37.6173,
      ]) as [number, number],
    [initialCenter, offices]
  )

  const [selected, setSelected] = useState<Office | null>(null)

  return (
    <div className={styles.officeMapSection}>
      {/* === ИЗОЛИРОВАННЫЙ БЛОК С КАРТОЙ === */}
      <div className={styles.mapBlock}>
        <MapContainer
          center={center}
          zoom={initialZoom}
          scrollWheelZoom={true}
          className={styles.mapContainer}
          style={{ height: '100%', width: '100%' }}
        >
          <MapController
            center={center}
            zoom={initialZoom}
            target={selected ? [selected.lat, selected.lng] : null}
          />

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {offices.map((office) => (
            <Marker
              key={office.id}
              position={[office.lat, office.lng]}
              eventHandlers={{ click: () => setSelected(office) }}
            >
              <Popup>
                <div className={styles.popupContent}>
                  <strong>{office.name}</strong>
                  <div>{office.address}</div>
                  {office.phone && <div>{office.phone}</div>}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* === Боковая панель с офисами (независима от карты) === */}
      <aside className={styles.officeList}>
        <h3>Наши офисы</h3>
        <ul>
          {offices.map((o) => (
            <li
              key={o.id}
              className={`${styles.officeItem} ${selected?.id === o.id ? styles.active : ''}`}
              onClick={() => setSelected(o)}
            >
              <div className={styles.officeName}>{o.name}</div>
              <div className={styles.officeAddress}>{o.address}</div>
              {o.phone && <div className={styles.officePhone}>{o.phone}</div>}
            </li>
          ))}
        </ul>
        <p className={styles.hint}>Кликните на офис — карта плавно переместится</p>
      </aside>
    </div>
  )
}