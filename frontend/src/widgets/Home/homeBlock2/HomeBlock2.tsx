// HomeBlock2.tsx
import React from 'react';
import style from './HomeBlock2.module.scss';

import fot1 from '../../../../public/new_building.png';
import fot2 from '../../../../public/mena1.png';
import fot3 from '../../../../public/mena2.png';
import fot4 from '../../../../public/mena5.png';
import fot5 from '../../../../public/country_real_estate.png';
import fot6 from '../../../../public/mansion_real_estate.png';
import fot7 from '../../../../public/mena3.png';
import fot8 from '../../../../public/mena6.png';

const items = [
  { img: fot1, title: 'Новостройки', accent: true },
  { img: fot2, title: 'Вторичная недвижимость', accent: false },
  { img: fot3, title: 'Аренда недвижимости', accent: false },
  { img: fot4, title: 'Коммерческая недвижимость', accent: false },
  { img: fot5, title: 'Загородная недвижимость', accent: false },
  { img: fot6, title: 'Элитные апартаменты', accent: true },
  { img: fot7, title: 'Продать недвижимость', accent: true },
  { img: fot8, title: 'Сдать в аренду', accent: false },
];

export const HomeBlock2: React.FC = () => {
  return (
    <section className={style.HomeBlock2}>
      <div className={style.container}>
        {/* Строка 1 */}
        <div className={style.row}>
          {items.slice(0, 3).map((item, i) => (
            <article key={i} className={`${style.card} ${item.accent ? style.accent : ''}`}>
              <img src={item.img} alt={item.title} className={style.bgImage} />
              <div className={style.overlay}>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* Строка 2 */}
        <div className={style.row}>
          {items.slice(3, 6).map((item, i) => (
            <article key={i} className={`${style.card} ${item.accent ? style.accent : ''}`}>
              <img src={item.img} alt={item.title} className={style.bgImage} />
              <div className={style.overlay}>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* Строка 3 */}
        <div className={style.row}>
          {items.slice(6, 8).map((item, i) => (
            <article key={i} className={`${style.card} ${item.accent ? style.accent : ''}`}>
              <img src={item.img} alt={item.title} className={style.bgImage} />
              <div className={style.overlay}>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};