import React, { useState } from 'react';
import PropTypes from 'prop-types';

const GlobalStatsContext = React.createContext({});

const textListChild = [
  { height: '' },
  { weight: '' },
  { hc: '' },
  { systolic: '' },
  { diastolic: '' },
  { rrinterval: '' },
  { qtinterval: '' },
  { correction: '100' },
];
const textListNeonate = [
  { length: '' },
  { weight: '' },
  { hc: '' },
  { correction: '100' },
  { sbr: '' },
  { t1: '60' },
  { t2: '80' },
  { t3: '100' },
  { t4: '120' },
  { t5: '150' },
  { p1: '60' },
  { p2: '80' },
  { p3: '100' },
  { p4: '120' },
  { p5: '150' },
];
const blanksBoth = {
  text: {
    showPicker: false,
    timeStamp: null,
  },
  gestationInDays: {
    showPicker: false,
    timeStamp: null,
    days: 0,
    value: 0,
  },
  sex: {
    showPicker: false,
    timeStamp: null,
    value: '',
    sex: 'Female',
  },
  date: {
    showPicker: false,
    value: null,
    timeStamp: null,
    date: null,
  },
};
const gestChild = {
  weeks: 40,
  value: 280,
};
const gestNeonate = {
  weeks: 0,
  value: 0,
};
const generateInitialState = () => {
  const mutableObject = { child: {}, neonate: {} };
  for (let i = 0; i < textListChild.length; i++) {
    const [key] = Object.keys(textListChild[i]);
    const value = textListChild[i][key];
    mutableObject.child[key] = {
      ...blanksBoth.text,
      ...{ value: value, text: value },
    };
  }
  for (let i = 0; i < textListNeonate.length; i++) {
    const [key] = Object.keys(textListNeonate[i]);
    const value = textListNeonate[i][key];
    mutableObject.neonate[key] = {
      ...blanksBoth.text,
      ...{ value: value, text: value },
    };
  }
  for (const [key, value] of Object.entries(blanksBoth)) {
    if (key === 'gestationInDays') {
      mutableObject.child[key] = { ...value, ...gestChild };
      mutableObject.neonate[key] = { ...value, ...gestNeonate };
    } else if (key === 'date') {
      mutableObject.child.dob = { ...value };
      mutableObject.child.dom = { ...value };
      mutableObject.neonate.dob = { ...value };
      mutableObject.neonate.dom = { ...value };
    } else if (key !== 'text') {
      mutableObject.child[key] = value;
      mutableObject.neonate[key] = value;
    }
  }
  return mutableObject;
};
const initialState = generateInitialState();

const GlobalStatsProvider = ({ children }) => {
  const [globalStats, setGlobalStats] = useState(generateInitialState());

  const moveDataAcrossGlobal = (movingTo, proforma) => {
    const swapParts = (oldMeasurements, newMeasurements) => {
      const mutableObject = { ...newMeasurements };
      for (const [key, value] of Object.entries(oldMeasurements)) {
        let newKey = '';
        let newValue = {};
        for (const k of Object.keys(proforma)) {
          if (k === key) {
            newKey = key;
            newValue = value;
            break;
          }
        }
        if (movingTo === 'neonate') {
          if (key === 'height') {
            newKey = 'length';
          }
        } else if (movingTo === 'child') {
          if (key === 'length') {
            newKey = 'height';
          }
        }
        if (newKey) {
          mutableObject[newKey] = newValue;
        }
      }
      return mutableObject;
    };
    setGlobalStats((state) => {
      let oldMeasurements = { ...state.child };
      let newMeasurements = { ...state.neonate };
      if (movingTo === 'child') {
        oldMeasurements = { ...state.neonate };
        newMeasurements = { ...state.child };
      }
      newMeasurements = swapParts(oldMeasurements, newMeasurements);
      let child;
      let neonate;
      if (movingTo === 'neonate') {
        child = oldMeasurements;
        neonate = newMeasurements;
      } else if (movingTo === 'child') {
        child = newMeasurements;
        neonate = oldMeasurements;
      }

      return { child, neonate };
    });
  };

  const setSingleGlobalStats = (kind, name, value, timeStamp = 'add') => {
    setGlobalStats((oldState) => {
      const mutableState = { ...oldState };
      mutableState[kind][name].value = value;
      if (timeStamp === 'add') {
        mutableState[kind][name].timeStamp = new Date();
      } else if (timeStamp === 'remove') {
        mutableState[kind][name].timeStamp = null;
      }
      return mutableState;
    });
  };

  return (
    <GlobalStatsContext.Provider
      value={{
        globalStats,
        setGlobalStats,
        setSingleGlobalStats,
        moveDataAcrossGlobal,
      }}
    >
      {children}
    </GlobalStatsContext.Provider>
  );
};

GlobalStatsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GlobalStatsContext, GlobalStatsProvider, initialState };
