import React from 'react';
import styles from './homeBlock4.module.scss';
import fon1 from '../../../../public/dizain-inter-era-komnaty.jpg';
import fon2 from '../../../../public/krasivye-i-sovremennye-rastenia-deko.jpg';
import fon3 from '../../../../public/3d-sovremennyi-inter-er-gostinoi-i-sovremennaa-mebel.jpg';
import fon4 from '../../../../public/Primavera.png';
import fon5 from '../../../../public/Shift.png';
import { useNavigate } from 'react-router-dom';

export const HomeBlock4: React.FC = () => {

  const navigate = useNavigate()

  return (
    <section className={styles.block4}>
      {/* Заголовок секции */}
      <header className={styles.header}>
        <h1>Лучшие предложения</h1>
        <p>
          Подборка лучших предложений этой недели — выбор<br />
          новостроек от ПИК и Capital Group, свежие старты продаж и<br />
          квартиры в аренду с готовой отделкой.
        </p>
      </header>

      <div className={styles.mainGrid}>
        {/* === ЛЕВАЯ КОЛОНКА (основная) === */}
        <div className={styles.leftColumn}>
          {/* 1. Большой комплекс — Republic */}
          <div className={styles.featuredComplex}>
            <div className={styles.complexInfo}>
              <span className={styles.tag}>Жилой комплекс</span>
              <h2><b>ЖК Адали</b></h2>
              <p className={styles.price}><b>Квартиры</b> от 5 900 000 ₽ от 42 м²</p>
              <p className={styles.desc}>Современный жилой комплекс бизнес-класса расположен в сердце Советского района, на улице Аделя Кутуя, которая превращается в оживленный городской хаб с бизнес-средой и развитой инфраструктурой.</p>
              <button onClick={()=> navigate('/new-building-complexes/13')} className={styles.btn}>На страницу комплекса</button>
            </div>
          </div>

          {/* 2. Квартира в аренду (горизонтальная) */}
          <div className={styles.rentalCard}>
            <img src={fon1} alt="Квартира в аренду" className={styles.rentalImg} />
            <div className={styles.rentalInfo}>
              <div className={styles.rentalTags}>
                <b>Квартира в аренду</b>
                <span>Номер лота: 701</span>
              </div>
              <h1>
                Уютная<br />
                студия с<br />
                ремонтом<br />
                под ключ
              </h1>
              <p className={styles.price}><b>Студия — 85 000 ₽/месяц</b></p>
              <button onClick={()=> navigate('/rental-apartments/38')} className={styles.btn}>На страницу лота</button>
            </div>
          </div>

          {/* 3. Две маленькие карточки */}
          <div className={styles.smallCards}>
            <div className={styles.smallCard}>
              <img src={fon2} alt="" />
              <div className={styles.smallInfo}>
                <h1>Квартира с отделкой в жилом комплексе у парка Горького</h1>
                <p><b>1 спальня</b> 22 500 000 ₽ 56 м²</p>
              </div>
            </div>
            <div className={styles.smallCard}>
              <img src={fon3} alt="" />
              <div className={styles.smallInfo}>
                <h1>Семейная квартира в районе ВДНХ с балконом и видами</h1>
                <p><b>2 спальни</b> 28 700 000 ₽ 72 м²</p>
              </div>
            </div>
          </div>
        </div>

        {/* === ПРАВАЯ КОЛОНКА (Shift) === */}
        <div className={styles.rightColumn}>
          <div className={styles.shiftCard}>
            <img src={fon4} alt="Shift" className={styles.shiftMainImg} />
            <div className={styles.shiftOverlay}>
              
              <div  className={styles.shiftInfo}>
                <span className={styles.tag}>Жилой комплекс</span>
                <h1><b>ЖК Яналиф</b></h1>
                <p className={styles.price}>Квартиры от 5 200 000 ₽ от 48 м²</p>
                <p className={styles.desc}>Жилой комплекс — это проект, объединяющий искусство и технологичность в многофункциональное пространство. Изысканная архитектура, премиальное лобби, консьерж-сервис и все возможности инфраструктуры центра столицы Татарстана</p>
                <button onClick={()=> navigate('/new-building-complexes/14')} className={styles.btn}>На страницу комплекса</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};