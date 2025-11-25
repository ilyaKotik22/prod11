import React, { useEffect, useState } from 'react';
import styles from './Navigation.module.scss'

export const NNavi: React.FC = () => {

    const url = window.location.href; // полный URL
    const parts = url.split('/').filter(Boolean); // разобьём на части и уберём пустые
    const lastPart = parts[parts.length - 1]; // последняя часть

    const [buyOpen, setBuyOpen] = useState(false);
    const [realtyOpen, setRealtyOpen] = useState(false);
    const [priceOpen, setPriceOpen] = useState(false);
    const [bedroomsOpen, setBedroomsOpen] = useState(false);


    const [buyType, setBuyType] = useState<string>();
    const [realtyType, setRealtyType] = useState<string>();
    const [price, setPrice] = useState<string>();
    const [bedrooms, setBedrooms] = useState<string>();

    const getFilterUrl = () => {
const params = new URLSearchParams();


// Преобразование цены в число для запроса
if (price === 'До 22 млн') params.set('maxPrice', '22000000');
else if (price === '22–29 млн') params.set('maxPrice', '29000000');
else if (price === '29–40 млн') params.set('maxPrice', '40000000');


// Спальни
if (bedrooms) {
const b = bedrooms === 'Студия' ? '0' : bedrooms;
params.set('bedrooms', b);
}


// Тип недвижимости (можно добавить mapping, если нужно)
if (realtyType ) params.set('type', realtyType);


// Купить/Снять
if (buyType ) params.set('action', buyType);

console.log(`${import.meta.env.BASE_URL}/${lastPart}/?${params.toString()}`)

return `${import.meta.env.BASE_URL}/${lastPart}/?${params.toString()}`;
};




useEffect(()=>{
    getFilterUrl()
},[buyType,realtyType,price,bedrooms])

return (
    <section className={styles.immovables}>
        <h1>Строительная компания</h1>
        <br />
        <div className={styles.filter}>
{/* Купить / Снять */}
<div className={styles.choise}>
<div onClick={() => setBuyOpen(!buyOpen)}>{buyType}</div>
{buyOpen && (
<ul>
{['Купить', 'Снять'].map((item) => (
<li key={item} onClick={() => { setBuyType(item); setBuyOpen(false); }}>
{item}
</li>
))}
</ul>
)}
</div>


{/* Тип недвижимости */}
<div className={styles.choise}>
<div onClick={() => setRealtyOpen(!realtyOpen)}>{realtyType}</div>
{realtyOpen && (
<div className={styles.cc}>
    <section>
        <div>Городская</div>
    <div>
        {['Квартира в новостройке', 'Квартира во вторичке'].map((item) => (
    <li key={item} onClick={() => { setRealtyType(item); setRealtyOpen(false); }}>
    {item}
    </li>
    ))}
    </div>
    </section>



<section>
    <div>Загородная</div>
    <div>
        {['Коттедж', 'Таунхаус', 'Квартира', 'Участок'].map((item) => (
    <li key={item} onClick={() => { setRealtyType(item); setRealtyOpen(false); }}>
    {item}
    </li>
    ))}
    </div>
</section>


</div>
)}
</div>


{/* Спальни */}
<div className={styles.choise}>
<div onClick={() => setBedroomsOpen(!bedroomsOpen)}>{bedrooms}</div>
{bedroomsOpen && (
<ul>
{['Студия', '1', '2', '3', '4+'].map((item) => (
<li key={item} onClick={() => { setBedrooms(item); setBedroomsOpen(false); }}>
{item}
</li>
))}
</ul>
)}
</div>


{/* Цена */}
<div className={styles.choise}>
<div onClick={() => setPriceOpen(!priceOpen)}>{price}</div>
{priceOpen && (
<ul>
{['До 22 млн', '22–29 млн', '29–40 млн'].map((item) => (
<li key={item} onClick={() => { setPrice(item); setPriceOpen(false); }}>
{item}
</li>
))}
</ul>
)}
</div>
</div>
    </section>
);
};