import React, { useEffect, useRef, useState } from 'react';
import styles from './Navigation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments, setDefaultTake } from '../ImmMenu/store/store';
import { useDebounce } from '../../../shared/debounce/debounce';
import { useLocation } from 'react-router-dom';
import type { RootState } from '../../../app/store';

const formatPrice = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} млрд`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)} млн`;
  return value.toLocaleString('ru-RU');
};

export const Navigation: React.FC = () => {
  const dispatch = useDispatch();
  const takeSelector = useSelector((state: RootState) => state.complexes.take);
  const { pathname } = useLocation();
  const priceWrapperRef = useRef<HTMLDivElement>(null);

  // Единое состояние для открытого дропдауна
  type DropdownKey = 'buy' | 'bedrooms' | 'price' | 'city' | 'sort' | null;
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);

  const [buyType, setBuyType] = useState<string | undefined>();
  const [bedrooms, setBedrooms] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [minPriceRaw, setMinPriceRaw] = useState(10_000);
  const [maxPriceRaw, setMaxPriceRaw] = useState(100_000_000);

  // Состояния сортировки (только по цене)
  const [orderBy, setOrderBy] = useState<string | undefined>(undefined); // 'price' или 'pricePerMonth'
  const [orderDir, setOrderDir] = useState<'asc' | 'desc' | undefined>(undefined);

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
    params.set('take', takeSelector.toString());

    if (minPrice > 1_000_000) params.set('minPrice', minPrice.toString());
    if (maxPrice < 100_000_000) params.set('maxPrice', maxPrice.toString());
    if (bedrooms) params.set('bedrooms', bedrooms === 'Студия' ? '0' : bedrooms);
    if (buyType) params.set('action', buyType);
    if (city) params.set('city', city);

    // Сортировка
    if (orderBy) params.set('orderBy', orderBy);
    if (orderDir) params.set('order', orderDir);

    const query = params.toString();
    const path = getApiPath();
    const base = import.meta.env.VITE_API_URL;
    return query ? `${base}/${path}?${query}` : `${base}/${path}`;
  };

  useEffect(() => {
    dispatch(setDefaultTake());
  }, [buyType, bedrooms, city, minPrice, maxPrice, orderBy, orderDir]);

  useEffect(() => {
    dispatch(fetchApartments(buildUrl()) as any);
  }, [buyType, bedrooms, city, minPrice, maxPrice, orderBy, orderDir, takeSelector]);

  // Закрытие слайдера цены при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (priceWrapperRef.current && !priceWrapperRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown === 'price') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openDropdown]);

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
    ? ['Участок', '1', '2', '3', '4', '5', '6', '7', '8']
    : ['Студия', '1', '2', '3', '4', '5', '6', '7', '8'];

  const isRental = pathname.slice(1) === 'rental-apartments';
  const priceField = isRental ? 'pricePerMonth' : 'price';

  return (
    <div className={styles.navigation}>
      <div className={styles.container}>
        <h1>{titles[getLastUrlSegment()]}</h1>

        <div className={styles.filters}>
          {/* Купить / Снять */}
        

          {/* Спальни */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setOpenDropdown(openDropdown === 'bedrooms' ? null : 'bedrooms')}
            >
              <span>{displayedBedroomsValue || 'Спальни'}</span>
              {bedrooms && <ResetButton onClick={(e) => { e.stopPropagation(); setBedrooms(undefined); }} />}
              <span className={styles.arrow}>▼</span>
            </button>
            {openDropdown === 'bedrooms' && (
              <ul className={styles.menu}>
                {bedroomsOptions.map(item => (
                  <li
                    key={item}
                    onClick={() => {
                      const valueToSave = item === 'Участок' ? 'Студия' : item;
                      setBedrooms(valueToSave);
                      setOpenDropdown(null);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Цена */}
          <div className={styles.priceSliderWrapper} ref={priceWrapperRef}>
            <button
              className={styles.trigger}
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
            >
              <span>
                {minPrice === 5_000_000 && maxPrice === 100_000_000
                  ? 'Цена'
                  : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)} ₽`}
              </span>
              {(minPrice !== 5_000_000 || maxPrice !== 100_000_000) && (
                <ResetButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setMinPriceRaw(5_000_000);
                    setMaxPriceRaw(100_000_000);
                  }}
                />
              )}
              <span className={styles.arrow}>▼</span>
            </button>

            <div className={`${styles.priceSlider} ${openDropdown === 'price' ? styles.open : ''}`}>
              <div className={styles.sliderRow}>
                <span className={styles.label}>От</span>
                <input
                  type="range"
                  min="10000"
                  max="100000000"
                  step="100000"
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
                  min="100000"
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

         

          {/* Сортировка (только по цене) */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setOpenDropdown(openDropdown === 'sort' ? null : 'sort')}
            >
              <span>
                
                {orderBy ? 'Цена' : 'Сортировать по'}
                {orderDir && (
                  <small style={{ marginLeft: '6px', opacity: 0.8 }}>
                    
                    {orderDir === 'asc' ? '↑ по возрастанию' : '↓ по убыванию'}
                  </small>
                )}
              </span>
              {orderBy && (
                <ResetButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setOrderBy(undefined);
                    setOrderDir(undefined);
                  }}
                />
              )}
              <span className={styles.arrow}>▼</span>
            </button>

            {openDropdown === 'sort' && (
              
              <ul className={styles.menu}>
                <li
                  onClick={() => {
                    setOrderBy(priceField);
                    setOrderDir('desc');
                    setOpenDropdown(null);
                  }}
                >
                  цена ↓ 
                </li>
                <li
                  onClick={() => {
                    setOrderBy(priceField);
                    setOrderDir('asc');
                    setOpenDropdown(null);
                  }}
                >
                  цена ↑ 
                </li>
              </ul>
            )}
          </div>
           {/* Город */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setOpenDropdown(openDropdown === 'city' ? null : 'city')}
            >
              <span>{city || 'Город'}</span>
              {city && <ResetButton onClick={(e) => { e.stopPropagation(); setCity(undefined); }} />}
              <span className={styles.arrow}>▼</span>
            </button>
            {openDropdown === 'city' && (
              <ul className={styles.menu}>
                {['Казань', 'Москва', 'Рязань'].map(item => (
                  <li key={item} onClick={() => { setCity(item); setOpenDropdown(null); }}>
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