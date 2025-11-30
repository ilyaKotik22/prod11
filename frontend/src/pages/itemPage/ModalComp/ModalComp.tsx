// components/CallModal.tsx
import React, { useState } from 'react';
import styles from './Modal.module.scss';
import fon1 from '../../../../public/vertikal-nyi-snimok-belogo-zdania-pod-cistym-nebom-no-bg-preview (carve.photos) 1.png';
import { sendLead } from '../../../features/LeadApi/LeadApi';
import { useNavigate } from 'react-router-dom';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  // Состояния инпутов
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Определяем ID и ссылку из текущего URL
  const getPropertyData = () => {
    const parts = window.location.href.split('/').filter(Boolean);
    const lastSegment = parts[parts.length - 2];
    const propertyId = parts[parts.length - 1];
    const link = window.location.href;

    return { propertyId, lastSegment,link };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Простая валидация
    if (!name.trim()) {
      setErrorMessage('Введите ваше имя');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMessage('Введите корректный номер телефона');
      return;
    }

    setIsSubmitting(true);

    const { propertyId, lastSegment,link } = getPropertyData();
    console.log({
      
    })
    try {
      await sendLead({
        name: name.trim(),
        phone: phone.trim(),
        link,
        propertyType: lastSegment, // можно сделать динамическим, если нужно
        propertyId,
      });

      
      setName('');
      setPhone('');
      onClose();
    } catch (err: any) {
      console.error('Ошибка отправки лида:', err);
      setErrorMessage(err.message || 'Не удалось отправить заявку. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
    navigate('/buy');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Крестик */}
        <button className={styles.closeButton} onClick={onClose} disabled={isSubmitting}>
          ×
        </button>

        {/* Фото дома */}
        <div className={styles.buildingImage}>
          <img src={fon1} alt="Жилой комплекс" />
        </div>

        {/* Контент */}
        <div className={styles.content}>
          <h2 className={styles.title}>
            ЗАКАЖИТЕ ЗВОНОК <br />
            ЭКСПЕРТА
          </h2>
          <p className={styles.subtitle}>
            Укажите свои контакты и эксперт проекта свяжется с вами в первую свободную минуту
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="tel"
              placeholder="+7 999 999 99 99"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={styles.input}
              required
              disabled={isSubmitting}
            />

            <input
              type="text"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
              disabled={isSubmitting}
            />

            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !name || !phone}
            >
              {isSubmitting ? 'Отправляем...' : 'ЗАКАЗАТЬ ЗВОНОК'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
