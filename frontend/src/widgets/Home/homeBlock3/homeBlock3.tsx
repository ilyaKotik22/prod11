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
      <h1>Наша команда</h1>
      <div className={styles.desc}>Выберите и свяжитесь <br /> с лучшими сотрудниками компании.</div>
       <button>
        <a href="/team">
          наша команда
        </a>
      
    </button>
    </section>
  
    <section>
      <img src={fon1} alt="" />
    </section>
  </section>

);
};