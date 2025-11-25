import React from 'react';
import styles from './homeBlock4.module.scss'
import fon1 from '../../../../public/fawa.png'
import fon2 from '../../../../public/ggfre.png'
import fon3 from '../../../../public/htggr4.png'
import fon4 from '../../../../public/Primavera.png'
import fon5 from '../../../../public/Shift.png'
export interface MyComponentProps {
  any: string
}
export const HomeBlock4: React.FC = () => {
return (
  <section className={styles.block4}>
    <section>
        <div className="">
            <h1>Лучшие предложения</h1>
            <div className="">Подборка лучших предложений этой недели — выбор<br />
                новостроек от Whitewill, новые старты продаж и квартиры <br />
                в аренду.</div>
        </div>
        <div className={styles.blockInfo}>
            <div className={styles.spliteItem}>
                <div className="">Жилой квартал</div>
                <h1><b>Republic</b></h1>
                <div className=""><b>Квартиры</b> от 19 850 000 ₽ от 26 м</div>
                <div className="">Квартал, где история встречается с современностью.</div>
                <button>На страницу комплекса</button>
                </div>
            
        </div>
        <div className={styles.blockInfo}>
            <div className={styles.splite}>
                <div className="">
                    <img src={fon1} alt="" />
                </div>
                <div className={styles.spliteItem}>
                    <div className={styles.splite}>
                        <div className=""><b>Квартира в аренду</b></div>
                        <div className="">Номер лота: 4216</div>
                    </div>
                    <h1>Светлая <br /> квартира с  <br />дизайнерской <br />отделкой</h1>
                    <div className=""><b>1 спальня - 600 000 ₽/месяц</b></div>
                    <button>На страницу лота</button>
                </div>
            </div>
            
        </div>
        <section className={styles.drob}>
            <div className={styles.blockInfoMod}>
                <img src={fon2} alt="" />
                <div className={styles.spliteItem}>
                    <div className="">Квартира с готовой отделкой рядом с парком «Усадьба Трубецких»</div>
                <div className="">2 спальни 190 000 000 ₽ 107 м</div>
                </div>
                
            </div>
            <div className={styles.blockInfoMod}>
                <img src={fon3} alt="" />
                <div className={styles.spliteItem}>
                    <div className="">Видовая квартира с панорамными окнами на берегу Москвы-реки</div>
                    <div className="">4 спальни  157 000 000 ₽  153 м</div>
                </div>
                
            </div>
        </section>
        
    </section>
    <section>
        <div>
            <img src={fon4} alt="" />
        </div>
        <div className={styles.blockInfo}>
            <img src={fon5} alt="" />
            <div className={styles.spliteItem} >
                <div className="">Жилой комплекс</div>
                <div className=""><h1>Shift</h1></div>
                <div className="">Квартиры от 40 820 000 ₽ от 45 м</div>
                <div className="">Жилой комплекс премиум-класса в Донском районе.</div>
                <button>На страницу комплекса</button>
            </div>
            
        </div>
    </section>
  </section>

);
};