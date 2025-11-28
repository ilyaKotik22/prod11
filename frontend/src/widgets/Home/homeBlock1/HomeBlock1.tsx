import React from 'react';
import fon from  '../../../../public/team_bg.png'
import styles from './HomeBlock1.module.scss'
export const HomeBlock1: React.FC = () => {
return (
    <section className={styles.hero}>
        <div className={styles.background}></div>
            <h1 style={{color: 'white'}} className={styles.title}>Агенство недвижимости <b>PLATINA</b></h1>
            <div className={styles.desc}>Помогаем людям купить квартиру и апартаменты в новых жилых комплексах центра Москвы, коммерческую недвижимость и особняки, а также дома в элитных посёлках Подмосковья.</div>
            <div className={styles.blocks}>
            <div className={styles.bot}>
                <div>Гарантия качества <br /><h1>5 лет</h1></div>
                <div>консультация <br /><h1>бесплатно</h1></div>
                <div> <h1>соблюдение технологий <br /> и нормативов</h1></div>
            </div>
            
    </div>
</section>
);
};