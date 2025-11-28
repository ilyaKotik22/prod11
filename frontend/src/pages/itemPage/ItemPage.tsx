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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const images: string[] = useMemo(() => {
    if (!items?.images || !Array.isArray(items.images) || items.images.length === 0) {
      return ['https://via.placeholder.com/800x600.png?text=Нет+фото'];
    }
    return items.images
      .map((img: any) => {
        // Исправлено: добавлена закрывающая кавычка
        return typeof img === 'string' ? img : img?.url || img?.image || null;
      })
      .filter((url): url is string => !!url && typeof url === 'string');
  }, [items]);

  useEffect(() => {
    if (images.length > 0 && !mainImage) {
      setMainImage(images[0]);
    }
  }, [images, mainImage]);

  const buildApiUrlFromLocation = () => {
    const parts = window.location.href.split('/').filter(Boolean);
    const last = parts[parts.length - 1];
    const prev = parts[parts.length - 2];
    return `${import.meta.env.VITE_API_URL}/${prev}/${last}`;
  };

  useEffect(() => {
    const apiUrl = buildApiUrlFromLocation();
    dispatch(fetchApartments(apiUrl) as any);
  }, [dispatch]);

  if (loading) return <div className={styles.loader}>Загрузка...</div>;
  if (error || !items) return <div className={styles.error}>Объект не найден</div>;

  const rawDescription = items?.description || items?.complex?.description || 'Описание отсутствует.';
  const formattedDescription = rawDescription.replace(/\/n\//g, '<br/>');

  const needCollapse = rawDescription.length > 200;

  const previewText = needCollapse && !isDescriptionExpanded
    ? rawDescription.slice(0, 200) + '...'
    : rawDescription;

  const displayText = previewText.replace(/\/n\//g, '<br/>');

  

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.card}>
          {/* ГАЛЕРЕЯ */}
          <div className={styles.galleryWrapper}>
            <div className={styles.mainImageWrapper}>
              <img
                src={images[0]}
                alt="Основное фото объекта"
                className={styles.mainImage}
              />
              {images.length > 1 && (
                <div className={styles.photoCounter}>
                  ЕЩЁ <br />
                  {images.length - 1} ФОТО
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className={styles.thumbnails}>
                {images.map((img, index) => (
                  <button
                    key={index}
                    className={`${styles.thumbnail} ${mainImage === img ? styles.thumbnailActive : ''}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img src={img} alt={`Фото ${index + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* КОНТЕНТ */}
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
                  {items.metroDistance || items.complex?.metroDistance} мин. пешком
                </span>
              </div>
            )}

            <div className={styles.priceAndTags}>
              <div className={styles.price}>
                {items.price
                  ? `${Number(items.price).toLocaleString('ru-RU')} ₽`
                  : items.pricePerMonth
                  ? `${Number(items.pricePerMonth).toLocaleString('ru-RU')} ₽/мес`
                  : ''}
              </div>

              <div className={styles.tags}>
                {items.bedrooms !== undefined && (
                  <span className={styles.tag}>
                    {items.bedrooms === 0 ? 'Студия' : `${items.bedrooms}-комн.`}
                  </span>
                )}
                {items.floor && <span className={styles.tag}>{items.floor} этаж</span>}
                {items.area && <span className={styles.tag}>{items.area} м²</span>}
                {items.landArea && <span className={styles.tag}>{items.landArea} соток</span>}
              </div>
            </div>

            {/* Описание с кнопкой "Показать полностью" */}
            <div className={styles.descriptionWrapper}>
              <p
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: displayText }}
              />

              {needCollapse && (
                <button
                  className={styles.showMoreBtn}
                  onClick={() => setIsDescriptionExpanded(prev => !prev)}
                >
                  {isDescriptionExpanded ? 'Свернуть' : 'Показать полностью'}
                </button>
              )}
            </div>

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
        lat={items.lat || 55.7558}
        lng={items.lng || 37.6173}
        title={items.title || items.complex?.name || 'Объект'}
        description={items.address || 'Адрес не указан'}
        height="420px"
      />

      <CallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
};