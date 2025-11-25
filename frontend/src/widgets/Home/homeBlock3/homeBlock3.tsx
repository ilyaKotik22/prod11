import React from 'react';
import styles from './homeBlock.module.scss'
import fon1 from '../../../../public/Group1394.png'
export interface MyComponentProps {
  any: string
}
export const HomeBlock3: React.FC = () => {
return (
  <section className={styles.block3}>
    <section className={styles.author}>
      <h1>Авторские каталоги недвижимости</h1>
      <div className={styles.desc}>Выберите и скачайте pdf-каталог <br /> с лучшими предложениями компании.</div>
       <button>
      Скачать каталог
    </button>
    </section>
  
    <section>
      <img src={fon1} alt="" />
    </section>
  </section>

);
};