// src/widgets/Immovables/ImmMenu/ImmMenu.tsx
import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { setTake } from './store/store';
import { ImmItem } from '../ImmItem/ImmItem';
import styles from './ImmMenu.module.scss';

export const ImmMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state: RootState) => state.complexes);

  const observerRef = useRef<HTMLDivElement>(null);
  const prevItemsCountRef = useRef<number>(0); // запоминаем предыдущее количество
  const hasMoreRef = useRef<boolean>(true);    // флаг: есть ли ещё данные

  // Отслеживаем изменение items.data и определяем, есть ли ещё данные
  useEffect(() => {
    if (!items?.data) return;

    const currentCount = items.data.length;

    // Если загрузка закончилась и количество элементов не выросло — значит больше нет
    if (!loading && prevItemsCountRef.current > 0 && currentCount === prevItemsCountRef.current) {
      hasMoreRef.current = false;
    }

    // Обновляем счётчик только после успешной подгрузки
    if (!loading) {
      prevItemsCountRef.current = currentCount;
    }
  }, [items?.data, loading]);

  // Intersection Observer — диспатчим setTake только если есть что грузить
  useEffect(() => {
    if (!observerRef.current || loading || !hasMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMoreRef.current && !loading) {
          dispatch(setTake()); // +12
        }
      },
      { rootMargin: '200px' } // можно чуть больше, чтобы срабатывало заранее
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [dispatch, loading]);

  if (loading && (!items?.data || items.data.length === 0)) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (!items?.data || items.data.length === 0) {
    return <div className={styles.empty}>Ничего не найдено</div>;
  }

  return (
    <div className={styles.menu}>
      <div className={styles.grid}>
        {items.data.map((apartment) => (
          <ImmItem
            key={apartment.id}
            price={apartment.price && apartment.price}
            foto={apartment.images[0]?.url}
            id={apartment.id}
            title={apartment.title ?? apartment.name}
            address={apartment.address ?? apartment.complex?.address}
            pricePerMonth={apartment.pricePerMonth}
            area={apartment.area}
            bedrooms={apartment.bedrooms}
            floor={apartment.floor}
            totalFloors={apartment.totalFloors}
            metro={apartment.metro}
            images={apartment.images}
          />
        ))}
      </div>

      {/* Триггер — показываем только если ещё есть что грузить */}
      {hasMoreRef.current && (
        <div ref={observerRef} className={styles.loaderTrigger}>
          {loading ? 'Загружаем ещё...' : 'Прокрутите для загрузки'}
        </div>
      )}

      {/* Сообщение, когда всё загружено */}
      {!hasMoreRef.current && items.data.length > 0 && (
        <div className={styles.endMessage}>Больше объектов нет</div>
      )}
    </div>
  );
};