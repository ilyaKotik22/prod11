// src/widgets/Immovables/navigation/Navigation.tsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './Navigation.module.scss';
import { useDispatch } from 'react-redux';
import { fetchApartments } from '../ImmMenu/store/store';
import { useDebounce } from '../../../shared/debounce/debounce';
import { useLocation } from 'react-router-dom';

const formatPrice = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} млрд`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)} млн`;
  return value.toLocaleString('ru-RU');
};

export const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const priceWrapperRef = useRef<HTMLDivElement>(null);

  const [buyOpen, setBuyOpen] = useState(false);
  const [realtyOpen, setRealtyOpen] = useState(false);
  const [bedroomsOpen, setBedroomsOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const [priceSliderOpen, setPriceSliderOpen] = useState(false);

  const [buyType, setBuyType] = useState<string | undefined>();
  const [realtyType, setRealtyType] = useState<string | undefined>();
  const [bedrooms, setBedrooms] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();

  const [minPriceRaw, setMinPriceRaw] = useState(1_00_000);
  const [maxPriceRaw, setMaxPriceRaw] = useState(100_000_000);
  const minPrice = useDebounce(minPriceRaw, 400);
  const maxPrice = useDebounce(maxPriceRaw, 400);

  const getLastUrlSegment = (): string => {
    const segments = pathname.split('/').filter(Boolean);
    return segments.length > 0 ? segments[segments.length - 1] : 'new-building-apartments';
  };

  const isCountryProperties = getLastUrlSegment() === 'country-properties';

  const getApiPath = (): string => {
    if (buyType === 'Купить') return 'new-building-apartments';
    if (buyType === 'Снять') return 'rental-apartments';
    if (realtyType && ['Коттедж', 'Таунхаус', 'Участок'].includes(realtyType)) {
      return 'country-properties';
    }
    const segment = getLastUrlSegment();
    const map: Record<string, string> = {
      'commercial-properties': 'commercial-properties',
      'ready-apartments': 'ready-apartments',
      'new-building-complexes': 'new-building-complexes',
      'new-building-apartments': 'new-building-apartments',
      'rental-apartments': 'rental-apartments',
      'country-properties': 'country-properties',
    };
    return map[segment] || 'new-building-apartments';
  };

  const buildUrl = () => {
    const params = new URLSearchParams();
    if (minPrice > 1_000_000) params.set('minPrice', minPrice.toString());
    if (maxPrice < 100_000_000) params.set('maxPrice', maxPrice.toString());
    if (bedrooms) {
      params.set('bedrooms', bedrooms === 'Студия' ? '0' : bedrooms);
    }
    if (realtyType) params.set('type', realtyType);
    if (buyType) params.set('action', buyType);
    if (city) params.set('city', city);

    const query = params.toString();
    const path = getApiPath();
    const base = import.meta.env.VITE_API_URL;
    console.log(query ? `${base}/${path}?${query}` : `${base}/${path}`)
    return query ? `${base}/${path}?${query}` : `${base}/${path}`;
  };

  useEffect(() => {
    dispatch(fetchApartments(buildUrl()) as any);
  }, [buyType, realtyType, bedrooms, city, minPrice, maxPrice]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (priceWrapperRef.current && !priceWrapperRef.current.contains(e.target as Node)) {
        setPriceSliderOpen(false);
      }
    };
    if (priceSliderOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [priceSliderOpen]);

  const ResetButton = ({ onClick }: { onClick: () => void }) => (
    <button className={styles.resetCross} onClick={onClick} title="Сбросить">
      x
    </button>
  );

  const titles: Record<string, string> = {
    'new-building-complexes': 'Новостройки',
    'ready-apartments': 'Готовая недвижимость',
    'rental-apartments': 'Аренда квартир',
    'country-properties': 'Загородная недвижимость',
    'commercial-properties': 'Коммерческая недвижимость',
  };

  const displayedBedroomsValue = isCountryProperties && bedrooms === 'Студия' ? 'Участок' : bedrooms;

  const bedroomsOptions = isCountryProperties
    ? ['Участок', '1', '2', '3', '4','5','6','7','8']
    : ['Студия', '1', '2', '3', '4','5','6','7','8'];

  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <h1>{titles[getLastUrlSegment()]}</h1>

        <div className={styles.filters}>
          {/* Купить / Снять */}
          <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={() => setBuyOpen(v => !v)}>
              <span>{buyType || 'Купить / Снять'}</span>
              {buyType && <ResetButton onClick={(e) => { e.stopPropagation(); setBuyType(undefined); }} />}
              <span className={styles.arrow}>▼</span>
            </button>
            {buyOpen && (
              <ul className={styles.menu}>
                <li onClick={() => { setBuyType('Купить'); setBuyOpen(false); }}>Купить</li>
                <li onClick={() => { setBuyType('Снять'); setBuyOpen(false); }}>Снять</li>
              </ul>
            )}
          </div>

          {/* Тип недвижимости */}
          <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={() => setRealtyOpen(v => !v)}>
              <span>{realtyType || 'Тип недвижимости'}</span>
              {realtyType && <ResetButton onClick={(e) => { e.stopPropagation(); setRealtyType(undefined); }} />}
              <span className={styles.arrow}>▼</span>
            </button>
            {realtyOpen && (
              <div className={styles.complexMenu}>
                <div className={styles.group}>
                  <h4>Городская</h4>
                  <ul>
                    <li onClick={() => { setRealtyType('Квартира в новостройке'); setRealtyOpen(false); }}>
                      Квартира в новостройке
                    </li>
                    <li onClick={() => { setRealtyType('Квартира во вторичке'); setRealtyOpen(false); }}>
                      Квартира во вторичке
                    </li>
                  </ul>
                </div>
                <div className={styles.group}>
                  <h4>Загородная</h4>
                  <ul>
                    {['Коттедж', 'Таунхаус', 'Участок'].map(item => (
                      <li key={item} onClick={() => { setRealtyType(item); setRealtyOpen(false); }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Спальни — Участок вместо Студия на загородке */}
          <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={() => setBedroomsOpen(v => !v)}>
              <span>{displayedBedroomsValue || 'Спальни'}</span>
              {bedrooms && <ResetButton onClick={(e) => { e.stopPropagation(); setBedrooms(undefined); }} />}
              <span className={styles.arrow}>▼</span>
            </button>
            {bedroomsOpen && (
              <ul className={styles.menu}>
                {bedroomsOptions.map(item => (
                  <li
                    key={item}
                    onClick={() => {
                      const valueToSave = item === 'Участок' ? 'Студия' : item;
                      setBedrooms(valueToSave);
                      setBedroomsOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ЦЕНА */}
          <div className={styles.priceSliderWrapper} ref={priceWrapperRef}>
            <button className={styles.trigger} onClick={() => setPriceSliderOpen(v => !v)}>
              <span>
                {minPrice === 5_000_000 && maxPrice === 100_000_000
                  ? 'Цена'
                  : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)} ₽`}
              </span>
              {(minPrice !== 5_000_000 || maxPrice !== 100_000_000) && (
                <ResetButton onClick={(e) => { e.stopPropagation(); setMinPriceRaw(5_000_000); setMaxPriceRaw(100_000_000); }} />
              )}
              <span className={styles.arrow}>▼</span>
            </button>
            <div className={`${styles.priceSlider} ${priceSliderOpen ? styles.open : ''}`}>
              <div className={styles.sliderRow}>
                <span className={styles.label}>От</span>
                <input
                  type="range"
                  min="100000"
                  max="100000000"
                  step="1000000"
                  value={minPriceRaw}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val < maxPriceRaw) setMinPriceRaw(val);
                  }}
                  className={styles.singleSlider}
                />
                <output className={styles.value}>{formatPrice(minPriceRaw)}</output>
              </div>
              <div className={styles.sliderRow}>
                <span className={styles.label}>До</span>
                <input
                  type="range"
                  min="5000000"
                  max="100000000"
                  step="1000000"
                  value={maxPriceRaw}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > minPriceRaw) setMaxPriceRaw(val);
                  }}
                  className={styles.singleSlider}
                />
                <output className={styles.value}>{formatPrice(maxPriceRaw)}</output>
              </div>
            </div>
          </div>

          {/* Город */}
          <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={() => setCityOpen(v => !v)}>
              <span>{city || 'Город'}</span>
              {city && <ResetButton onClick={(e) => { e.stopPropagation(); setCity(undefined); }} />}
              <span className={styles.arrow}>▼</span>
            </button>
            {cityOpen && (
              <ul className={styles.menu}>
                {['Казань', 'Москва', 'Рязань'].map(item => (
                  <li key={item} onClick={() => { setCity(item); setCityOpen(false); }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};