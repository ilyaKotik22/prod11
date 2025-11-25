// components/HeaderCallPopup.tsx
import React, { useState, FormEvent } from 'react';
import styles from './HeaderPopup.module.scss';
import { connectApi } from '../../../features/ConnectApi/ConnectApi';

interface HeaderCallPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeaderCallPopup: React.FC<HeaderCallPopupProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) return setError('Введите имя');
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      return setError('Введите корректный номер телефона');
    }

    setIsSubmitting(true);

    try {
      await connectApi({
        name: name.trim(),
        phone: phone.trim(),
        propertyType: 'продажа', // ← всегда "продажа", как ты просил
      });

      alert('Заявка отправлена! Скоро с вами свяжемся');
      setName('');
      setPhone('');
      onClose();
    } catch (err: any) {
      console.error('Ошибка отправки:', err);
      setError('Не удалось отправить заявку. Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose} disabled={isSubmitting}>
          ×
        </button>

        <h2>Заказать обратный звонок</h2>
        <p>Оставьте заявку — наш менеджер перезвонит вам в течение 5 минут</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <input
            type="tel"
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            disabled={isSubmitting}
          />

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Отправляем...' : 'Позвоните мне'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeaderCallPopup;