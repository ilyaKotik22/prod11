import React from 'react';
import foto1 from '../../../public/team1-no.png';
import foto2 from '../../../public/team2-no.png';
import foto3 from '../../../public/team3-no.png';
import foto4 from '../../../public/team4-no.png';
import foto5 from '../../../public/team5-no.png';
import foto6 from '../../../public/team6-no.png';
import foto7 from '../../../public/team7-no.png';
import foto8 from '../../../public/team8-no.png';
import foto9 from '../../../public/team9-no.png';
import foto10 from '../../../public/team10-no.png';
import foto11 from '../../../public/team11-no.png';
import foto12 from '../../../public/team12-no.png';
import foto13 from '../../../public/team13-no.png';
import foto14 from '../../../public/team14-no.png';
import styles from './Team.module.scss';

export const TeamMenu: React.FC = () => {
  const mas = [
    { name: 'Хузятова Алия Ильфатовна',      phone: '89093084011', foto: foto1 },
    { name: 'Шафиков Айнур Раифович',       phone: '89061129611', foto: foto2 },
    { name: 'Пермякова Анна Сергеевна',     phone: '89625563411', foto: foto3 },
    { name: 'Попцова Алия Ленаровна',       phone: '89061147911', foto: foto4 },
    { name: 'Климов Борис Александрович',   phone: '89033143811', foto: foto5 },
    { name: 'Зуева Кристина Дмитриевна',    phone: '89033871811', foto: foto6 },
    { name: 'Аитов Илнар Илдарович',        phone: '89033186311', foto: foto7 },
    { name: 'Чеченина Юлия Васильевна',     phone: '89625564111', foto: foto8 },
    { name: 'Ахметзянова Виктория Юрьевна', phone: '89061137911', foto: foto9 },
    { name: 'Тумашилова Юлия Сергеевна',    phone: '89600799087', foto: foto10 },

    { name: 'Ахмедзянова Гульназ Азатовна', phone: '89061163611', foto: foto11 },
    { name: 'Якименко Георгий Алексеевич ', phone: '89061168011', foto: foto12 },
    { name: 'Попцов Артём Игоревич', phone: '89053191511', foto: foto13 },
    { name: 'Салахутдинов Риналь Генарович', phone: '89656116911', foto: foto14 },
  ];

  // Форматирование телефона: +7 (XXX) XXX-XX-XX
  const formatPhone = (num: string) => {
    const cleaned = num.replace(/\D/g, '');
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9)}`;
  };

  return (
    <main>
      <div className="container">
        <ul className={styles.teamGrid}>
          {mas.map((el, index) => (
            <li key={index} className={styles.teamCard}>
              <div className={styles.photoWrapper}>
                <img src={el.foto} alt={el.name} />
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{el.name}</h3>
                <a href={`tel:${el.phone}`} className={styles.phone}>
                  {formatPhone(el.phone)}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};