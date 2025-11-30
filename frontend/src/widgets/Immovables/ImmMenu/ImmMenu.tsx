// src/widgets/Immovables/ImmMenu/ImmMenu.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { fetchApartments } from './store/store';
import { ImmItem } from '../ImmItem/ImmItem';
import styles from './ImmMenu.module.scss';

const PAGE_SIZE = 9; // Сколько показываем за раз

export const ImmMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.complexes);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const observerRef = useRef<HTMLDivElement>(null);

  // Загружаем данные при монтировании
  useEffect(() => {
    dispatch(fetchApartments() as any);
  }, [dispatch]);

  // Intersection Observer — когда юзер долистал до "триггера" → подгружаем ещё"
  useEffect(() => {
    if (!observerRef.current || loading || !items?.data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < items.data.length) {
          setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.data.length));
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [items?.data, loading, visibleCount]);

  if (loading && visibleCount === PAGE_SIZE) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (!items?.data || items.data.length === 0) {
    return <div className={styles.empty}>Ничего не найдено</div>;
  }

  const visibleItems = items.data.slice(0, visibleCount);

  return (
    <div className={styles.menu}>
      <div className={styles.grid}>
        {visibleItems.map((apartment) => (
          <ImmItem 
        price={apartment.price && apartment.price}
        foto={apartment.images[0]?.url}
        id={apartment.id} 
        title={apartment.title ?? apartment.name} 
        address={apartment.address ?? apartment.complex.address} 
        pricePerMonth={apartment.pricePerMonth} 
        area={apartment.area} 
        bedrooms={apartment.bedrooms} 
        floor={apartment.floor} 
        totalFloors={apartment.totalFloors} metro={apartment.metro} key={apartment.id} 
        images={apartment.images}
        />
        ))}
      </div>

      {/* Триггер для подгрузки */}
      {visibleCount < items.data.length && (
        <div ref={observerRef} className={styles.loaderTrigger}>
          {loading ? 'Загружаем ещё...' : 'Прокрутите вниз'}
        </div>
      )}

      {/* Если всё подгрузили — показываем сообщение */}
      {visibleCount >= items.data.length && items.data.length > PAGE_SIZE && (
        <div className={styles.endMessage}>Больше объектов нет</div>
      )}
    </div>
  );
};


