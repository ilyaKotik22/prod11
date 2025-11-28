import React from 'react';
import style from './ImmItem.module.scss';
import fon1 from '../../../../public/1730058264-671e981802758_1.jpg.png';
import fon2 from '../../../../public/Group 1395.png';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export interface ImmItemProps {
  id: number;
  title: string;
  address?: string;
  area?: number;
  pricePerMonth?: number;
  bedrooms?: number;
  price?: number;
  floor?: number;
  metro?: string;
  metroDistance?: number;
  foto?: string;
  images?: string[];           // теперь просто массив строк
  partUrl?: string;
}

export const ImmItem: React.FC<ImmItemProps> = ({
  id,
  title,
  address,
  price,
  area,
  pricePerMonth,
  bedrooms,
  floor,
  metro,
  metroDistance,
  foto,
  images = [],
  partUrl: customPartUrl,
}) => {
  const navigate = useNavigate();

  const currentPart = customPartUrl
    || window.location.pathname.split('/').filter(Boolean).pop()
    || 'objects';

  const displayPrice = React.useMemo(() => {
    if (price !== undefined && price > 0) return `${price.toLocaleString('ru-RU')} ₽`;
    if (pricePerMonth !== undefined && pricePerMonth > 0) return `${pricePerMonth.toLocaleString('ru-RU')} ₽ / месяц`;
    return '';
  }, [price, pricePerMonth]);

  const isSale = price !== undefined && price > 0;

  // Исправлено: теперь images — просто массив строк, а не объектов с .url
  const photos: string[] = images.length > 0 ? images : (foto ? [foto] : [fon1]);

  const sliderSettings = {
    dots: true,
    infinite: photos.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    swipe: true,
    lazyLoad: 'ondemand' as const,
  };

  // Обработчик клика по карточке
  const handleCardClick = (e: React.MouseEvent<HTMLLIElement>) => {
    // Если клик был внутри слайдера — не переходим
    const clickedOnSlider = (e.target as HTMLElement).closest(`.${style.imageWrapper}`);
    if (clickedOnSlider) return;

    navigate(`/${currentPart}/${id}`);
  };

  return (
    <li onClick={handleCardClick} className={style.card}>
      {/* ==================== СЛАЙДЕР (с остановкой перехода) ==================== */}
      <div
        className={style.imageWrapper}
        onClick={(e) => e.stopPropagation()}        // КЛЮЧЕВАЯ СТРОКА
        onTouchStart={(e) => e.stopPropagation()}   // для мобильных свайпов
        onTouchMove={(e) => e.stopPropagation()}
      >
        {photos.length === 1 ? (
          <img
            src={photos[0].url}
            alt={title}
            className={style.image}
            loading="lazy"
          />
        ) : (
          <Slider {...sliderSettings}>
            {photos.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img.url}
                  alt={`${title} — фото ${idx + 1}`}
                  className={style.image}
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        )}

        {/* Бейдж с количеством фото */}
        {photos.length > 1 && (
          <div className={style.photoBadge}>
            {photos.length}
          </div>
        )}
      </div>

      {/* ==================== КОНТЕНТ ==================== */}
      <div className={style.content}>
        <h3 className={style.head}>{title}</h3>

        {address && <div className={style.address}>{address}</div>}

        {metro && (
          <div className={style.metro}>
            <img src={fon2} alt="метро" />
            <span>{metro}</span>
            {metroDistance !== undefined && metroDistance > 0 && (
              <span className={style.metroDistance}>{metroDistance} мин.</span>
            )}
          </div>
        )}

        <div className={style.footer}>
          <div className={`${style.price} ${isSale ? style.salePrice : ''}`}>
            {displayPrice}
          </div>

          {(area !== undefined || bedrooms !== undefined || floor !== undefined) && (
            <div className={style.params}>
              {area !== undefined && area > 0 && (
                <div className={style.param}>
                  <p>Площадь</p>
                  <span>{area} м²</span>
                </div>
              )}
              {bedrooms !== undefined && (
                <div className={style.param}>
                  <p>Спальни</p>
                  <span>{bedrooms === 0 ? 'Студия' : `${bedrooms}-комн.`}</span>
                </div>
              )}
              {floor !== undefined && (
                <div className={style.param}>
                  <p>Этаж</p>
                  <span>{floor > 0 ? floor : 'Цоколь'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};