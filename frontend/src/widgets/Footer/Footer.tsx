// components/Footer/Footer.tsx
import React from 'react';
import styles from './Footer.module.scss';
import logo from '../../../public/Bez44ona3.png'; // замени на свой путь
import { useNavigate } from 'react-router-dom';

export const Footer: React.FC = () => {
  const navigation = useNavigate()
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.mainRow}>
          {/* Левая часть — логотип + меню */}
          <div className={styles.left}>
            <div className={styles.logo}>
              <img src={logo} alt="PLATINA" />
            </div>

            <nav className={styles.nav}>
              <ul>
                <li onClick={()=>navigation("/")}>Агентство</li>
                <li onClick={()=>navigation("/")}><a href="/">Застройщикам</a></li>
                <li onClick={()=>navigation("/")}><a href="/">Партнёры и клиенты</a></li>
                <li onClick={()=>navigation("/")}><a href="/">Вакансии</a></li>
                <li onClick={()=>navigation("/")}><a href="/">Партнёрам</a></li>
                <li onClick={()=>navigation("/")}> <a href="/">Команда</a></li>
              </ul>
            </nav>
          </div>

          {/* Правая часть — телефон + кнопка */}
          <div className={styles.right}>
            <div className={styles.phoneBlock}>
              <a href="tel:+74952550161" className={styles.phone}>
                +7 (495) 255-01-61
              </a>
              <button className={styles.callbackBtn}>
                Заказать звонок
              </button>
            </div>

            <div className={styles.legal}>
              <p>
                ИНН 9715376092, ОГРН 1197746674544<br />
                Политика конфиденциальности · Пользовательское соглашение
              </p>
              <p className={styles.copyright}>
                © 2025 PLATINA. Все права защищены.
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className={styles.bottom}>
          <p>
            Мы используем файлы cookie. Продолжая работу с сайтом, Вы подтверждаете, что ознакомлены с политикой в отношении обработки персональных данных.
          </p>
          <button className={styles.acceptBtn}>Принять</button>
        </div>
      </div>
    </footer>
  );
};