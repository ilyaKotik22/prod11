import React from 'react';
import style from './ImmItem.module.scss';
import fon1 from '../../../../public/1730058264-671e981802758_1.jpg.png';
import fon2 from '../../../../public/Group 1395.png';

export interface ImmItemProps {
  id: number;
  title: string;
  address: string;
  area: number;
  pricePerMonth?: number;
  bedrooms: number;
  floor?: number;
  metro: string;
  metroDistance?: number;
}

export const ImmItem: React.FC<ImmItemProps> = ({
  id,
  title,
  address,
  pricePerMonth,
  area,
  bedrooms,
  floor,
  metro,
  metroDistance,
}) => {
  const url = window.location.href;
  const parts = url.split('/').filter(Boolean);
  const lastPart = parts[parts.length - 1];

  return (
    <li className={style.card}>
      <a href={`/${lastPart}/${id}`}>
        <img src={fon1} alt={title} className={style.image} />

        <div className={style.content}>
          <h3 className={style.head}>{title}</h3>
          <div className={style.address}>{address}</div>

          <div className={style.metro}>
            <img src={fon2} alt="метро" />
            <div>{metro}</div>
            {metroDistance && <div>{metroDistance} мин.</div>}
          </div>

          <div className={style.footer}>
            <div className={style.price}>
              {pricePerMonth
                ? `${pricePerMonth.toLocaleString('ru-RU')} ₽ / месяц`
                : '360 000 ₽ / месяц'}
            </div>

            <div className={style.params}>
              <div className={style.param}>
                <p>Площадь</p>
                <span>{area} м²</span>
              </div>
              <div className={style.param}>
                <p>Спальни</p>
                <span>{bedrooms === 0 ? 'Студия' : bedrooms}</span>
              </div>
              <div className={style.param}>
                <p>Этаж</p>
                <span>{floor || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
};