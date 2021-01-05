import React from 'react';

import styles from './App.module.css';
import mainLogo from './assets/dotKid_logo.png';
import IconGeneric from './components/IconGeneric';
import ButtonGeneric from './components/ButtonGeneric';

const App = () => {
  const testButtons = [1, 2, 3, 4, 5, 6];
  const reactButtons = testButtons.map((value) => (
    <ButtonGeneric key={value} onClick={() => handleClick(value)} />
  ));
  const handleClick = (no) => {
    alert(`Button number ${no} clicked`);
  };
  return (
    <div className={styles.appBackground}>
      <img
        src={mainLogo}
        height="50"
        length="133"
        alt="Main Logo"
        className={styles.appLogo}
      />
      <div className={styles.appWindow}>
        <div className={styles.appContainer}>
          <div className={styles.selectorContainer}>{reactButtons}</div>
          <div className={styles.calculatorContainer}>
            <IconGeneric iconName="water-outline" size="50px" fill="grey" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
