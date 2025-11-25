// Navigation.tsx
import React, { useEffect, useState } from 'react';
import styles from './Navigation.module.scss';
import { useDispatch } from 'react-redux';
import { fetchApartments } from '../ImmMenu/store/store';
import { useNavigate } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = window.location.href;
  const parts = url.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1];

  const [buyOpen, setBuyOpen] = useState(false);
  const [realtyOpen, setRealtyOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [bedroomsOpen, setBedroomsOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const [buyType, setBuyType] = useState<string>();
  const [realtyType, setRealtyType] = useState<string>();
  const [price, setPrice] = useState<string>();
  const [bedrooms, setBedrooms] = useState<string>();
  const [city, setCity] = useState<string>();

  const goToCorrectPage = (newBuyType: string | undefined, newRealty: string | undefined) => {
    if (newBuyType === "Купить") {
      navigate("/new-building-apartments");
      return "new-building-apartments";
    }
    if (newBuyType === "Снять") {
      navigate("/rental-apartments");
      return "rental-apartments";
    }
    const countryList = ["Коттедж", "Таунхаус", "Квартира", "Участок"];
    if (newRealty && countryList.includes(newRealty)) {
      navigate("/country-properties");
      return "country-properties";
    }
    return lastPart;
  };

  const getFilterUrl = () => {
  const params = new URLSearchParams();

  if (price === 'До 22 млн') params.set('maxPrice', '22000000');
  else if (price === '22–29 млн') params.set('maxPrice', '29000000');
  else if (price === '29–40 млн') params.set('maxPrice', '40000000');

  if (bedrooms) {
    const b = bedrooms === 'Студия' ? '0' : bedrooms;
    params.set('bedrooms', b);
  }
  if (realtyType) params.set('type', realtyType);
  if (buyType) params.set('action', buyType);
  if (city) params.set('city', city);

  const query = params.toString();
  const correctPath = goToCorrectPage(buyType, realtyType);

  // ← ИСПРАВЛЕНО: используем VITE_API_URL, а не BASE_URL
  const API_URL = import.meta.env.VITE_API_URL;

  const finalUrl = query
    ? `${API_URL}/${correctPath}?${query}`
    : `${API_URL}/${correctPath}`;

  console.log('Запрос на бэкенд:', finalUrl);
  return finalUrl;
};

  useEffect(() => {
    const finalUrl = getFilterUrl();
    dispatch(fetchApartments(finalUrl) as any);
    console.log(finalUrl)
  }, [buyType, realtyType, price, bedrooms, city, dispatch]);

  return (
    <section className={styles.navigation}>
      <div className={styles.container}>
        <h1 className={styles.title}>Строительная компания</h1>

        <div className={styles.filters}>
          {/* Купить / Снять */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setBuyOpen(!buyOpen)}
            >
              {buyType || 'Купить / Снять'}
              <span className={styles.arrow}>▼</span>
            </button>
            {buyOpen && (
              <ul className={styles.menu}>
                {['Купить', 'Снять'].map(item => (
                  <li
                    key={item}
                    onClick={() => {
                      setBuyType(item);
                      goToCorrectPage(item, realtyType);
                      setBuyOpen(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Тип недвижимости */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setRealtyOpen(!realtyOpen)}
            >
              {realtyType || 'Тип недвижимости'}
              <span className={styles.arrow}>▼</span>
            </button>
            {realtyOpen && (
              <div className={styles.complexMenu}>
                <div className={styles.group}>
                  <h4>Городская</h4>
                  <ul>
                    {['Квартира в новостройке', 'Квартира во вторичке'].map(item => (
                      <li
                        key={item}
                        onClick={() => {
                          setRealtyType(item);
                          goToCorrectPage(buyType, item);
                          setRealtyOpen(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.group}>
                  <h4>Загородная</h4>
                  <ul>
                    {['Коттедж', 'Таунхаус', 'Квартира', 'Участок'].map(item => (
                      <li
                        key={item}
                        onClick={() => {
                          setRealtyType(item);
                          goToCorrectPage(buyType, item);
                          setRealtyOpen(false);
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Спальни */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setBedroomsOpen(!bedroomsOpen)}
            >
              {bedrooms || 'Спальни'}
              <span className={styles.arrow}>▼</span>
            </button>
            {bedroomsOpen && (
              <ul className={styles.menu}>
                {['Студия', '1', '2', '3', '4+'].map(item => (
                  <li key={item} onClick={() => { setBedrooms(item); setBedroomsOpen(false); }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Цена */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setPriceOpen(!priceOpen)}
            >
              {price || 'Цена'}
              <span className={styles.arrow}>▼</span>
            </button>
            {priceOpen && (
              <ul className={styles.menu}>
                {['До 22 млн', '22–29 млн', '29–40 млн'].map(item => (
                  <li key={item} onClick={() => { setPrice(item); setPriceOpen(false); }}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Город */}
          <div className={styles.dropdown}>
            <button
              className={styles.trigger}
              onClick={() => setCityOpen(!cityOpen)}
            >
              {city || 'Город'}
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
    </section>
  );
};