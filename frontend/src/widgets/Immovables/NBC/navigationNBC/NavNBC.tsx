// src/widgets/Immovables/navigation/NavNBC.tsx
import React, { useRef, useState } from 'react';
import styles from '../../navigation/Navigation.module.scss';
import { useDebounce } from '../../../../shared/debounce/debounce';
import { useDispatch, useSelector } from 'react-redux';
import { clearFilter, setBedrooms, setBuyType, setPriceRange } from '../store/store';
import type { RootState } from '../../../../app/store';



const formatPrice = (value: number): string => {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} млрд`;
  if (value >= 1_000_000) return `${Math.round(value / 1_000_000)} млн`;
  return value.toLocaleString('ru-RU');
};

export const NavNBC: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filterNBC);

  const priceWrapperRef = useRef<HTMLDivElement>(null);

  const [buyOpen, setBuyOpen] = useState(false);
  const [bedroomsOpen, setBedroomsOpen] = useState(false);
  const [priceSliderOpen, setPriceSliderOpen] = useState(false);

  // Локальные значения для плавности слайдера
  const [minPriceRaw, setMinPriceRaw] = useState(filters.minPrice ?? 1_000_000);
  const [maxPriceRaw, setMaxPriceRaw] = useState(filters.maxPrice ?? 100_000_000);

  const minPrice = useDebounce(minPriceRaw, 400);
  const maxPrice = useDebounce(maxPriceRaw, 400);

  // Синхронизация с глобальным стейтом
  React.useEffect(() => {
    dispatch(setPriceRange({ min: minPrice, max: maxPrice }));
  }, [minPrice, maxPrice, dispatch]);

  // Закрытие по клику вне
  React.useEffect(() => {
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

  const ResetButton = ({ filter }: { filter: keyof RootState['filters'] }) => (
    <button
      className={styles.resetCross}
      onClick={(e) => {
        e.stopPropagation();
        dispatch(clearFilter(filter));
        if (filter === 'minPrice' || filter === 'maxPrice') {
          setMinPriceRaw(1_000_000);
          setMaxPriceRaw(100_000_000);
        }
      }}
      title="Сбросить"
    >
      отмена
    </button>
  );

  return (
    <div style={{marginBottom: '50px'}} className={styles.navNBC}>
      <div className={styles.container}>
        <div className={styles.filters}>

          {/* Купить / Снять */}
          <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={() => setBuyOpen(v => !v)}>
              <span>{filters.buyType || 'Купить / Снять'}</span>
              {filters.buyType && <ResetButton filter="buyType" />}
              <span className={styles.arrow}>▼</span>
            </button>
            {buyOpen && (
              <ul className={styles.menu}>
                <li onClick={() => { dispatch(setBuyType('Купить')); setBuyOpen(false); }}>
                  Купить
                </li>
                <li onClick={() => { dispatch(setBuyType('Снять')); setBuyOpen(false); }}>
                  Снять
                </li>
              </ul>
            )}
          </div>

          {/* Спальни */}
          <div className={styles.dropdown}>
            <button className={styles.trigger} onClick={() => setBedroomsOpen(v => !v)}>
              <span>{filters.bedrooms || 'Спальни'}</span>
              {filters.bedrooms && <ResetButton filter="bedrooms" />}
              <span className={styles.arrow}>▼</span>
            </button>
            {bedroomsOpen && (
              <ul className={styles.menu}>
                {['Студия', '1', '2', '3', '4','5','6','7','8'].map(item => (
                  <li key={item} onClick={() => { dispatch(setBedrooms(item)); setBedroomsOpen(false); }}>
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
                {(!filters.minPrice && !filters.maxPrice) || (filters.minPrice === 5_000_000 && filters.maxPrice === 100_000_000)
                  ? 'Цена'
                  : `${formatPrice(filters.minPrice ?? minPrice)} – ${formatPrice(filters.maxPrice ?? maxPrice)} ₽`}
              </span>
              {(filters.minPrice || filters.maxPrice) && (
                <ResetButton filter="minPrice" />
              )}
              <span className={styles.arrow}>▼</span>
            </button>

            <div className={`${styles.priceSlider} ${priceSliderOpen ? styles.open : ''}`}>
              <div className={styles.sliderRow}>
                <span className={styles.label}>От</span>
                <input
                  type="range"
                  min="1000000"
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

        </div>
      </div>
    </div>
  );
};