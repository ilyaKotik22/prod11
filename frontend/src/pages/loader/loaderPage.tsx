// src/components/PageLoader.tsx
import React from 'react';
import styles from './loaderPage.module.scss';

export const LoaderPage: React.FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.neonSpinner}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p className={styles.text}>Загружаем космос...</p>
    </div>
  );
};