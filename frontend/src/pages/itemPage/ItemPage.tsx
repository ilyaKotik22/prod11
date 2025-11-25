// src/pages/ItemPage/ItemPage.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments } from '../../widgets/Immovables/ImmMenu/store/store';
import type { RootState } from '../../app/store';

import styles from './ItemPage.module.scss';
import { sendLead } from '../../features/LeadApi/LeadApi';
import { CallModal } from './ModalComp/ModalComp';

export const ItemPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.complexes);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string>('');

  // === Формируем массив фото из данных ===
  const images: string[] = React.useMemo(() => {
    if (!items?.images || !Array.isArray(items.images)) {
      // Заглушка на случай отсутствия фото
      return [
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
      ];
    }
    return items.images;
  }, [items?.images]);
  const imgFake = [
    'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://i.pinimg.com/1200x/70/56/85/70568566427083968c4a628c1c5f38de.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
        'https://9c9a241d-11ea-4f71-8a89-7a1d2f462630.selstorage.ru/images/0c9479d4-fba0-4899-8881-944532826423.jpg',
  ]
  console.log(images)
  // Устанавливаем первое фото как главное
  useEffect(() => {
    if (images.length > 0 && !mainImage) {
      setMainImage(images[0]);
    }
  }, [images, mainImage]);

  // === Запрос данных по URL ===
  const buildApiUrlFromLocation = () => {
    const parts = window.location.href.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    const prev = parts[parts.length - 2];
    return `http://localhost:4000/${prev}/${last}`;
  };
  
  useEffect(() => {
    const apiUrl = buildApiUrlFromLocation();
    dispatch(fetchApartments(apiUrl) as any);
  }, [dispatch]);

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (error) return <div className={styles.error}>Ошибка загрузки</div>;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* ====================== ГАЛЕРЕЯ ====================== */}
          <div className={styles.galleryWrapper}>
            {/* Главное фото */}
            <div className={styles.mainImageWrapper}>
              <img
                src={mainImage || images[0]}
                alt="Основное фото объекта"
                className={styles.mainImage}
              />
              <div className={styles.photoCounter}>
                ЕЩЁ <br />
                {images.length > 1 ? images.length - 1 : 0} ФОТО
              </div>
            </div>

            {/* Миниатюры справа */}
            {imgFake.length > 1 && (
              <div className={styles.thumbnails}>
                {imgFake.map((img, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${
                      mainImage === img ? styles.thumbnailActive : ''
                    }`}
                    onClick={() => setMainImage(img)}
                    aria-label={`Перейти к фото ${index + 1}`}
                  >
                    <img src={img} alt={`Миниатюра ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ====================== КОНТЕНТ ====================== */}
          <div className={styles.content}>
            <h1 className={styles.title}>
              {items?.complex?.name || items?.title || 'Без названия'}
            </h1>

            {/* Адрес */}
            {items?.address && (
              <div className={styles.meta}>
                <span className={styles.location}>{items.address}</span>
              </div>
            )}

            {/* Метро */}
            {(items?.metro || items?.complex?.metro) && (
              <div className={styles.meta}>
                <span className={styles.location}>
                  {items?.metro || items?.complex?.metro},{' '}
                  {items?.metroDistance || items?.complex?.metroDistance} минут
                </span>
              </div>
            )}

            {/* Цена и теги */}
            <div className={styles.priceAndTags}>
              <div className={styles.price}>
                {items?.price
                  ? `${items.price.toLocaleString('ru-RU')} ₽`
                  : items?.pricePerMonth
                  ? `${items.pricePerMonth.toLocaleString('ru-RU')} ₽ в месяц`
                  : '—'}
              </div>

              <div className={styles.tags}>
                { (
                  <span className={styles.tag}>{items.bedrooms} спальни</span>
                )}
                {(
                  <span className={styles.tag}>
                    {items?.floor || items?.totalFloors} этаж
                  </span>
                )}
                {(items?.area || items?.landArea) && (
                  <span className={styles.tag}>
                    {items?.area ? `${items.area} м²` : `${items.landArea} соток`}
                  </span>
                )}
              </div>
            </div>

            {/* Описание */}
            <p className={styles.description}>
              {items?.complex?.description || items?.description || 'Описание отсутствует.'}
            </p>

            {/* Кнопка */}
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

      {/* Модальное окно */}
      <CallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};