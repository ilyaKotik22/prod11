import React from 'react';
import style from '../../ImmItem/ImmItem.module.scss';

import fon2 from '../../../../../public/Group 1395.png';
import { useNavigate } from 'react-router-dom';

export interface ImmItemProps {
  partUrl: number
  id: number;
  title: string;
  address?: string;
  area: number;
  pricePerMonth?: number;
  bedrooms: number;
  floor?: number;
  metro: string;
  metroDistance?: number;
  path: string
  foto:string
  price: number
}

export const ItemNBC: React.FC<ImmItemProps> = ({
  price,
  id,
  foto,
  title,
  address,
  pricePerMonth,
  area,
  bedrooms,
  floor,
  metro,
  metroDistance,
  path

}) => {
  
  const navigate = useNavigate()
  return (
    <li onClick={()=> navigate(`/${path}/${id}`)} className={style.card}>
     
        <img src={foto} alt={title} className={style.image} />

        <div className={style.content}>
          <h3 className={style.head}>{title}</h3>
          <div className={style.address}>{address && address}</div>

          <div className={style.metro}>
            <img src={fon2} alt="метро" />
            <div>{metro}</div>
            {metroDistance && <div>{metroDistance} мин.</div>}
          </div>

          <div className={style.footer}>
            <div className={style.price}>
              {
                 `${price} ₽`
                }
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
      
    </li>
  );
};