import React from 'react';
import fot1 from '../../../../public/new_building.png'
import fot2 from '../../../../public/secondary_real_estate.png'
import fot3 from '../../../../public/rental_real_estate.png'
import fot4 from '../../../../public/ddd.png'
import fot5 from '../../../../public/country_real_estate.png'
import fot6 from '../../../../public/mansion_real_estate.png'
import fot7 from '../../../../public/sell.png'
import fot8 from '../../../../public/rent.png'
import style from './HomeBlock2.module.scss'

export const HomeBlock2: React.FC = () => {
return (
    <section className={style.HomeBlock2}>
        <section className={style.sec1}>
            <article className={style.modArt}>
                <p>Новостройки</p>
                <img src={fot1} alt="" />
            </article>
            <article>
                <p>Новостройки</p>
                <img src={fot2} alt="" />
            </article>
            <article>
                <p>Новостройки</p>
                <img src={fot3} alt="" />
            </article>
        </section>

        <section className={style.sec2}>
            <article>
                <p>Новостройки</p>
                <img src={fot4} alt="" />
            </article>
            <article>
                <p>Новостройки</p>
                <img src={fot5} alt="" />
            </article>
            <article className={style.modArt}>
                <p>Новостройки</p>
                <img src={fot6} alt="" />
            </article>
        </section>

        <section className={style.sec3}>
            <article className={style.modArt}>
                <p>Новостройки</p>
                <img src={fot7} alt="" />
            </article>
            <article>
                <p>Новостройки</p>
                <img src={fot8} alt="" />
            </article>
        </section>
    </section>
);
};