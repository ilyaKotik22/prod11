import React from 'react';
import style from './ImmItem.module.scss';
import fon1 from '../../../../public/1730058264-671e981802758_1.jpg.png';
import fon2 from '../../../../public/Group 1395.png';

export interface ImmItemProps {
  id: number;
  title: string;
  address?: string;
  area?: number;           // теперь опционально
  pricePerMonth?: number;
  bedrooms?: number;       // опционально
  floor?: number;
  // опционально
  metro?: string;          // опционально
  metroDistance?: number;
  foto?: string;
  partUrl?: string;
}

export const ImmItem: React.FC<ImmItemProps> = ({
  id,
  title,
  address,
  area,
  pricePerMonth,
  bedrooms,
  floor,
  metro,
  metroDistance,
  foto,
  partUrl: customPartUrl,
}) => {
  const currentPart = customPartUrl || window.location.pathname.split('/').filter(Boolean).pop() || 'objects';

  const displayPrice = pricePerMonth
    ? `${pricePerMonth.toLocaleString('ru-RU')} ₽ / месяц`
    : 'Цена по запросу';

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
              <div>{metro}</div>
              {metroDistance !== undefined && metroDistance > 0 && (
                <div>{metroDistance} мин.</div>
              )}
            </div>
          )}

          <div className={style.footer}>
            <div className={style.price}>{displayPrice}</div>

            {/* Параметры — только те, что есть */}
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