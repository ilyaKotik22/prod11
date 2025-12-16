import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../../app/store';
import { setTake } from './store/store';
import { ImmItem } from '../ImmItem/ImmItem';
import styles from './ImmMenu.module.scss';

export const ImmMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, take } = useSelector((state: RootState) => state.complexes);

  const observerRef = useRef<HTMLDivElement>(null);

  // === Определяем, есть ли ещё данные для подгрузки ===
  // Если take > 12, но длина массива меньше take — значит, сервер отдал всё, что осталось
  // Если take === 12 — это первый запрос, всегда считаем, что может быть больше
  const hasMore = !loading && items?.data
    ? take === 12 || items.data.length === take
    : true;

  // === Intersection Observer callback ===
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading && hasMore) {
        dispatch(setTake());
      }
    },
    [dispatch, loading, hasMore]
  );

  // === Подключаем observer только когда нужно ===
  useEffect(() => {
    const element = observerRef.current;
    if (!element || loading || !hasMore) return;

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '400px', // заранее срабатывает
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [handleIntersection, loading, hasMore]);

  // === Состояния загрузки и пустого результата ===
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
            price={apartment.price}
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

      {/* Триггер подгрузки — только если есть что грузить */}
      {hasMore && (
        <div ref={observerRef} className={styles.loaderTrigger}>
          {loading ? 'Загружаем ещё...' : 'Прокрутите вниз для загрузки'}
        </div>
      )}

      {/* Сообщение о конце списка */}
      {!hasMore && items.data.length > 0 && (
        <div className={styles.endMessage}>Больше объектов нет</div>
      )}
    </div>
  );
};