// NBCcomponent.tsx
import React, { useEffect, useRef, useState } from 'react';
import { getPathSegments } from '../../../shared/getParams/getParams';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { fetchApartments } from '../ImmMenu/store/store';
import styles from './NBCcomponent.module.scss';
import { ItemNBC } from './itemNBC/ItemNBC';
import { NavNBC } from './navigationNBC/NavNBC';

const PAGE_SIZE = 9; // сколько показывать за раз

const getPropertySlug = (type?: string): string => {
  if (!type) return 'properties';
  switch (type) {
    case 'commercialProperty': return 'commercial-properties';
    case 'readyApartment': return 'new-building-apartments';
    case 'newBuilding': return 'new-buildings';
    case 'land': return 'lands';
    default: return 'properties';
  }
};

export const NBCcomponent: React.FC = () => {
  const [Category, setCategory] = useState<string[]>([]);
  const [chooseCategory, setChooseCategory] = useState<string | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.complexes);
  const filter = useSelector((state: RootState) => state.filterNBC);

  const observerRef = useRef<HTMLDivElement>(null);

  // Загрузка данных по URL
  useEffect(() => {
    const params = getPathSegments();
    const finalUrl = `${import.meta.env.VITE_API_URL}/${params.type}/${params.id}`;
    dispatch(fetchApartments(finalUrl) as any);
  }, [dispatch]);

  // Автовыбор первой категории
  useEffect(() => {
    const types = [...new Set(items?.apartments?.map(el => el.type).filter(Boolean))];
    setCategory(types);
    if (types.length > 0 && !chooseCategory) {
      setChooseCategory(types[0]);
    }
  }, [items?.apartments, chooseCategory]);

  // Фильтрация (твоя оригинальная логика — не тронута)
  const filteredApartments = items?.apartments
    ?.filter(apartment => {
      if (filter.buyType && apartment.action !== filter.buyType) return false;
      if (filter.bedrooms) {
        const beds = apartment.bedrooms;
        if (filter.bedrooms === 'Студия' && beds !== 0) return false;
        if (filter.bedrooms === '4+' && beds < 4) return false;
        if (filter.bedrooms !== 'Студия' && filter.bedrooms !== '4+' && beds.toString() !== filter.bedrooms) {
          return false;
        }
      }
      if (filter.minPrice !== undefined && apartment.price < filter.minPrice) return false;
      if (filter.maxPrice !== undefined && apartment.price > filter.maxPrice) return false;
      if (chooseCategory && apartment.type !== chooseCategory) return false;
      return true;
    }) || [];

  // Подгрузка при скролле до конца
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < filteredApartments.length) {
          setVisibleCount(prev => Math.min(prev + PAGE_SIZE, filteredApartments.length));
        }
      },
      { rootMargin: '150px' }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [filteredApartments.length, visibleCount]);

  // Сброс подгрузки при смене фильтров
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter, chooseCategory]);

  // Только видимые элементы
  const visibleApartments = filteredApartments.slice(0, visibleCount);

  return (
    <div className="container">
      <section className={styles.NBCc}>
        <h1>{items?.name || 'Загрузка...'}</h1>

        <NavNBC />

        <ul className={styles.grid}>
          {visibleApartments.map(apartment => (
            <ItemNBC
              key={apartment.id}
              price={apartment.price}
              path={getPropertySlug(apartment.type)}
              id={apartment.id}
              title={apartment.title ?? apartment.name}
              foto={apartment.images?.[0]?.url}
              pricePerMonth={apartment.pricePerMonth}
              area={apartment.area}
              bedrooms={apartment.bedrooms}
              floor={apartment.floor}
              totalFloors={apartment.totalFloors}
              metro={apartment.metro}
            />
          ))}
        </ul>

        {/* Триггер подгрузки */}
        {visibleCount < filteredApartments.length && (
          <div ref={observerRef} style={{ height: '100px' }} />
        )}

        {/* Конец списка */}
        {visibleCount >= filteredApartments.length && filteredApartments.length > 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
            Больше объектов нет
          </div>
        )}
      </section>
    </div>
  );
};