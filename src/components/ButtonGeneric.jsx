import React from 'react';
import styles from './ButtonGeneric.module.css';

const GenericButton = ({ children, onClick }) => {
  return (
    <div className={styles.genericButton} onClick={onClick}>
      {children}
    </div>
  );
};

export default GenericButton;
