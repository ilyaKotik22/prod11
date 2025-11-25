import React from 'react';
import style from './ImmItem.module.scss'
import fon1 from '../../../../public/1730058264-671e981802758_1.jpg.png'
import fon2 from '../../../../public/Group 1395.png'
export interface ImmItem {
            id: 10,
            title: string,
            address: string,
            area: number,
            pricePerMonth: number,
            bedrooms: number,
            floor: number,
            totalFloors: number,
            metro: string,
            metroDistance?: number,
            description?: string,
            createdAt?: "2025-11-24T19:00:55.528Z",
            updatedAt?: "2025-11-24T19:00:55.528Z",
            images?: []
}
export const ImmItem: React.FC<ImmItem> = ({id,title,address,pricePerMonth,area,metroDistance, bedrooms,floor,metro}) => {
    const url = window.location.href; // полный URL
    const parts = url.split('/').filter(Boolean); // разобьём на части и уберём пустые
    const lastPart = parts[parts.length - 1]; // последняя часть
return (
<li >
    <a href={`/${lastPart}/${id}`}>
        <img src={fon1} alt="" />
    <div className={style.address}>{address}</div>
    <div className={style.head}>{title}</div>
    <div className={style.met}> <img src={fon2}  alt="" /> <div className="">{metro}</div> <div>{metroDistance}</div></div>
    <div className={style.allInf}>
        <div className="">{pricePerMonth ?? "360 000₽ / месяц"}</div>
        <div className={style.ccost}>
            <div className={style.sect}>
                <div className=""><p>Площадь</p></div>
                <div className="">{area}</div>
            </div>
            <div className={style.sect}>
                <div className=""><p>Спальни</p></div>
                <div className="">{bedrooms ? '2' : '2'}</div>
            </div>
            <div className={style.sect}>
                <div className=""><p>Этаж</p></div>
                <div className=""></div>
            </div>
        </div>

    </div>  
    </a>
    
 </li>
);
};