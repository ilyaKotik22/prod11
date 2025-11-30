// src/pages/ItemPage/ItemPage.tsx
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApartments } from '../../widgets/Immovables/ImmMenu/store/store';
import type { RootState } from '../../app/store';
import styles from './ItemPage.module.scss';
import { CallModal } from './ModalComp/ModalComp';
import MapItem from './mapItem/Mapitem';

export const ItemPage: React.FC = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.complexes);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

  // ВАЖНО: убираем selectedImage вообще!
  // Главное фото всегда = первое из массива, а при клике мы просто меняем порядок или подсвечиваем
  useEffect(() => {
  // Ждём, пока всё отрисуется
  const handleHash = () => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Небольшая задержка, чтобы DOM успел построиться
  setTimeout(handleHash, 100);
}, []);
  const images: string[] = useMemo(() => {
    if (!items?.images || !Array.isArray(items.images) || items.images.length === 0) {
      return ['https://via.placeholder.com/800x600.png?text=Нет+фото'];
    }
    const result = items.images
      .map((img: any) => {
        if (typeof img === 'string') return img;
        return img?.url || img?.image || null;
      })
      .filter((url): url is string => !!url && typeof url === 'string');

    return result.length > 0 ? result : ['https://via.placeholder.com/800x600.png?text=Нет+фото'];
  }, [items]);

  // ГЛАВНОЕ ИЗОБРАЖЕНИЕ — ВСЕГДА ПЕРВОЕ ИЗ МАССИВА
  // Никаких selectedImage, никаких null — просто images[0]
  const mainImageSrc = images[0];

  // При смене объекта ничего сбрасывать не надо — images[0] всегда актуальное

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
                src={mainImageSrc}           // ← ВСЕГДА первое настоящее фото
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
                    
                    // Подсвечиваем только первое фото (или то, что сейчас главное)
                    className={`${styles.thumbnail} ${index === 0 ? styles.thumbnailActive : ''}`}
                    onClick={() => {
                      // При клике просто ставим это фото первым в массиве
                      // Самый простой и надёжный способ без состояния
                      const newImages = [img, ...images.filter((_, i) => i !== index)];
                      // Но т.к. мы не хотим мутировать массив — просто прокручиваем к верху
                      // Или можно оставить как есть — главное фото не меняется, только подсветка
                      // Но ты просил именно менять фото → делаем через ref или просто меняем src
                      document.querySelector(`.${styles.mainImage}`)?.setAttribute('src', img);
                      // И подсвечиваем кликнутую миниатюру
                      document.querySelectorAll(`.${styles.thumbnail}`).forEach(el => el.classList.remove(styles.thumbnailActive));
                      (event?.currentTarget as HTMLElement)?.classList.add(styles.thumbnailActive);
                    }}
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
            {/* ... весь остальной контент без изменений ... */}
            {items?.address && (
              <div className={styles.meta}>
                <span className={styles.location}>{items.address}</span>
              </div>
            )}
            {items?.currentId && (
              <div className={styles.meta}>
                <span className={styles.location}>{items.currentId} лот</span>
              </div>
            )}
            {(items?.metro || items?.complex?.metro) && (
              <div style={{display: items?.metro ? 'none' : 'block'}} className={styles.meta}>
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
                {items.totalFloors && <span className={styles.tag}>{items.totalFloors} этажей</span>}
                {items.area && <span className={styles.tag}>{items.area} м²</span>}
                {items.landArea && <span className={styles.tag}>{items.landArea}  м²</span>}
              </div>
            </div>
            <div className={styles.descriptionWrapper}>
              <p className={styles.description} dangerouslySetInnerHTML={{ __html: displayText }} />
              {needCollapse && (
                <button
                  className={styles.showMoreBtn}
                  onClick={() => setIsDescriptionExpanded(p => !p)}
                >
                  {isDescriptionExpanded ? 'Свернуть' : 'Показать полностью'}
                </button>
              )}
            </div>
            <div className={styles.footer}>
              <button className={styles.callButton} onClick={() => setIsModalOpen(true)}>
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