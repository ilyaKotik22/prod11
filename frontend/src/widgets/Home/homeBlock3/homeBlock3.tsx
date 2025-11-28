import React from 'react';
import styles from './homeBlock.module.scss';
import fon1 from '../../../../public/team15.jpg'
import { useNavigate } from 'react-router-dom';


export const HomeBlock3: React.FC = () => {
  const navigate = useNavigate()
  return (
    <section className={styles.block3}>
      {/* Текстовая часть */}
      <div className={styles.author}>
        <h1 className={styles.title}>Наша команда</h1>
        
        <div className={styles.desc}>
          Выберите и свяжитесь <br className={styles.brMobile} />
          с лучшими сотрудниками компании.
        </div>

        <button onClick={()=> navigate("/team")} className={styles.btn}>
          
            наша команда
          
        </button>
      </div>

      {/* Картинка */}
      <div className={styles.imageWrapper}>
        <img src={fon1} alt="Наша команда" />
      </div>
    </section>
  );
};