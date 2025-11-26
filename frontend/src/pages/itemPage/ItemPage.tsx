// src/pages/ItemPage/ItemPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments } from '../../widgets/Immovables/ImmMenu/store/store';
import type { RootState } from '../../app/store';
import styles from './ItemPage.module.scss';
import { CallModal } from './ModalComp/ModalComp';
import MapItem from './mapItem/Mapitem';

export const ItemPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.complexes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');

  // === КОРРЕКТНОЕ ИЗВЛЕЧЕНИЕ КАРТИНОК ИЗ ЛЮБОЙ СТРУКТУРЫ ===
  const images: string[] = useMemo(() => {
    // Возможные пути к массиву картинок
    const possibleImages = 
      items?.images ||                     // обычный объект
      items?.complex?.images ||            // если объект внутри complex
      items?.gallery ||                    // если есть отдельная галерея
      items?.photos || 
      [];

    // Если это массив строк — возвращаем как есть
    if (Array.isArray(possibleImages) && possibleImages.length > 0) {
      return possibleImages.filter((img): img is string => typeof img === 'string' && img.includes('http'));
    }

    // Если ничего нет — возвращаем заглушки
    return [
      'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
      'https://i.pinimg.com/1200x/70/56/85/70568566427083968c4a628c1c5f38de.jpg',
      'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
    ];
  }, [items]);

  // Устанавливаем первое фото как главное
  useEffect(() => {
    if (images.length > 0 && !mainImage) {
      setMainImage(images[0]);
    }
  }, [images, mainImage]);

  // === Запрос данных по URL ===
  const buildApiUrlFromLocation = () => {
    const parts = window.location.href.split('/').filter(Boolean);
    const last = parts[parts.length - 1];      // ID
    const prev = parts[parts.length - 2];      // тип (rental-apartments, new-building-apartments и т.д.)
    return `${import.meta.env.VITE_API_URL}/${prev}/${last}`;
  };

  useEffect(() => {
    const apiUrl = buildApiUrlFromLocation();
    dispatch(fetchApartments(apiUrl) as any);
  }, [dispatch]);

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (error || !items) return <div className={styles.error}>Объект не найден</div>;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* ====================== ГАЛЕРЕЯ ====================== */}
          <div className={styles.galleryWrapper}>
            {/* Главное фото */}
            <div className={styles.mainImageWrapper}>
              <img
                src={mainImage}
                alt="Основное фото"
                className={styles.mainImage}
              />
              {images.length > 1 && (
                <div className={styles.photoCounter}>
                  ЕЩЁ <br />
                  {images.length - 1} ФОТО
                </div>
              )}
            </div>

            {/* Миниатюры */}
            {images.length > 1 && (
              <div className={styles.thumbnails}>
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${mainImage === img ? styles.thumbnailActive : ''}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img src={img} alt={`Фото ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ====================== КОНТЕНТ ====================== */}
          <div className={styles.content}>
            <h1 className={styles.title}>
              {items?.complex?.name || items?.title || 'Объект без названия'}
            </h1>

            {items?.address && (
              <div className={styles.meta}>
                <span className={styles.location}>{items.address}</span>
              </div>
            )}

            {(items?.metro || items?.complex?.metro) && (
              <div className={styles.meta}>
                <span className={styles.location}>
                  {items.metro || items.complex?.metro},{' '}
                  {items.metroDistance || items.complex?.metroDistance} мин.
                </span>
              </div>
            )}

            <div className={styles.priceAndTags}>
              <div className={styles.price}>
                {items.price
                  ? `${Number(items.price).toLocaleString('ru-RU')} ₽`
                  : items.pricePerMonth
                  ? `${Number(items.pricePerMonth).toLocaleString('ru-RU')} ₽/мес`
                  : 'Цена не указана'}
              </div>

              <div className={styles.tags}>
                {items.bedrooms !== undefined && (
                  <span className={styles.tag}>
                    {items.bedrooms === 0 ? 'Студия' : `${items.bedrooms} сп.`}
                  </span>
                )}
                {items.floor && (
                  <span className={styles.tag}>{items.floor} этаж</span>
                )}
                {(items.area || items.landArea) && (
                  <span className={styles.tag}>
                    {items.area ? `${items.area} м²` : `${items.landArea} соток`}
                  </span>
                )}
              </div>
            </div>

            <p className={styles.description}>
              {items?.complex?.description || items?.description || 'Описание временно отсутствует.'}
            </p>

            <div className={styles.footer}>
              <button
                className={styles.callButton}
                onClick={() => setIsModalOpen(true)}
              >
                ЗАКАЗАТЬ ЗВОНОК
              </button>
            </div>
          </div>
        </div>
      </div>
      <MapItem
  lat={55.7558}
  lng={37.6173}
  title="Главный офис"
  description="Москва, ул. Примерная, 10"
/>
      <CallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};