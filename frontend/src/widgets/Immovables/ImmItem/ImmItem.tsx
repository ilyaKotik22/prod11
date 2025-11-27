import React from 'react';
import style from './ImmItem.module.scss';
import fon1 from '../../../../public/1730058264-671e981802758_1.jpg.png';
import fon2 from '../../../../public/Group 1395.png';

export interface ImmItemProps {
  id: number;
  title: string;
  address?: string;
  area?: number;
  pricePerMonth?: number;   // аренда
  bedrooms?: number;
  price?: number;           // продажа — приоритет выше
  floor?: number;
  metro?: string;
  metroDistance?: number;
  foto?: string;
  string;
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
  partUrl: customPartUrl,
}) => {
  const currentPart = customPartUrl 
    || window.location.pathname.split('/').filter(Boolean).pop() 
    || 'objects';

  // Правильная логика отображения цены
  const displayPrice = React.useMemo(() => {
    if (price !== undefined && price > 0) {
      return `${price.toLocaleString('ru-RU')} ₽`;
    }
    if (pricePerMonth !== undefined && pricePerMonth > 0) {
      return `${pricePerMonth.toLocaleString('ru-RU')} ₽ / месяц`;
    }
    return 'Цена по запросу';
  }, [price, pricePerMonth]);

  // Определяем тип сделки для стилизации (по желанию)
  const isSale = price !== undefined && price > 0;

  return (
    <li className={style.card}>
      <a href={`/${currentPart}/${id}`}>
        <img
          src={foto || fon1}
          alt={title}
          className={style.image}
          loading="lazy"
        />

        <div className={style.content}>
          <h3 className={style.head}>{title}</h3>

          {/* Адрес */}
          {address && <div className={style.address}>{address}</div>}

          {/* Метро */}
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
            {/* Цена с правильным приоритетом и стилями */}
            <div className={`${style.price} ${isSale ? style.salePrice : ''}`}>
              {displayPrice}
            </div>

            {/* Параметры — только те, что переданы */}
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
      </a>
    </li>
  );
};