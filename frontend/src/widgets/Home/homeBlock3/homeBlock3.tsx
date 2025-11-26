import React from 'react';
import styles from './homeBlock.module.scss';
import fon1 from '../../../../public/Group1394.png';


export const HomeBlock3: React.FC = () => {
  return (
    <section className={styles.block3}>
      {/* Текстовая часть */}
      <div className={styles.author}>
        <h1 className={styles.title}>Наша команда</h1>
        
        <div className={styles.desc}>
          Выберите и свяжитесь <br className={styles.brMobile} />
          с лучшими сотрудниками компании.
        </div>

        <button className={styles.btn}>
          <a href="/team">
            наша команда
          </a>
        </button>
      </div>

      {/* Картинка */}
      <div className={styles.imageWrapper}>
        <img src={fon1} alt="Наша команда" />
      </div>
    </section>
  );
};