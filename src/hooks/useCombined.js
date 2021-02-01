import { useContext } from 'react';
import { GlobalStatsContext, initialState } from '../components/GlobalContext';
import { Validator, ValidatorContext } from '../components/Validator';

const useCombined = (kind, name) => {
  const { globalStats, setGlobalStats } = useContext(GlobalStatsContext);
  const {
    validation,
    setValidation,
    handleValidationReset,
    customSubmitFunction,
  } = useContext(ValidatorContext);

  const buttonState = name ? globalStats[kind][name] : null;
  const relevantHalf = globalStats[kind];
  const { errorMessages, showErrorMessages } = validation;

  const cumulativeThresholdReached = (validationObjectToCheck) => {
    let cumulativeCount = 0;
    let minCountToCheck = null;
    for (const subValue of Object.values(validationObjectToCheck.cumulative)) {
      cumulativeCount += subValue;
    }
    for (const subValue of Object.values(validationObjectToCheck.proforma)) {
      if (subValue.countCumulative) {
        if (subValue.countCumulative.minCount) {
          if (minCountToCheck === null) {
            minCountToCheck = subValue.countCumulative.minCount;
          } else if (minCountToCheck !== subValue.countCumulative.minCount) {
            console.log(
              'Error: for cumulative entry checking, each minCount should be identical in proforma'
            );
            return false;
          }
        }
      }
    }
    if (minCountToCheck === null) {
      console.log('Error: no valid minCount found in proforma');
      return false;
    }
    if (cumulativeCount < minCountToCheck) {
      return false;
    }
    return true;
  };

  const updateValidationObjectBeforeSetState = (
    oldValidation,
    currentName,
    newValue
  ) => {
    const specific = new Validator(oldValidation.proforma[currentName]);
    const evaluation = specific.validate(newValue);
    const mutable = { ...oldValidation };
    if (evaluation.count) {
      mutable.cumulative[currentName] = evaluation.count;
    } else if (
      !evaluation.count &&
      mutable.cumulative[currentName] !== undefined
    ) {
      mutable.cumulative[currentName] = 0;
    }
    if (evaluation.errors) {
      for (const [key, subValue] of Object.entries(evaluation)) {
        if (key !== 'errors' && key !== 'count' && subValue) {
          mutable.errorMessages[currentName] = subValue;
          break;
        }
      }
    } else {
      mutable.errorMessages[currentName] = '';
    }
    const newUntouchedArray = mutable.untouched.filter(
      (item) => item !== currentName
    );
    mutable.untouched = newUntouchedArray;
    return mutable;
  };

  const checkForCumulative = (validatorState) => {
    const mutableState = { ...validatorState };
    if (JSON.stringify(mutableState.cumulative) !== JSON.stringify({})) {
      const genericCumulativeErrorMessage =
        'Minimum threshold of entries not reached for specified fields';
      if (!cumulativeThresholdReached(mutableState)) {
        for (const [key, subValue] of Object.entries(mutableState.proforma)) {
          if (subValue.countCumulative) {
            mutableState.errorMessages[key] =
              subValue.countCumulative.message || genericCumulativeErrorMessage;
          }
        }
      } else {
        for (const [key, subValue] of Object.entries(mutableState.proforma)) {
          if (subValue.countCumulative) {
            const cumulativeErrorMessage =
              subValue.countCumulative.message || genericCumulativeErrorMessage;
            if (mutableState.errorMessages[key] === cumulativeErrorMessage) {
              mutableState.errorMessages[key] = '';
            }
          }
        }
      }
    }
    return mutableState;
  };

  const combinedSetter = (localState) => {
    if (localState.value !== undefined) {
      let newValidation = updateValidationObjectBeforeSetState(
        validation,
        name,
        localState.value
      );
      if (newValidation.showErrorMessages) {
        newValidation = checkForCumulative(newValidation);
      }
      setValidation(newValidation);
    }
    setGlobalStats((state) => {
      const merge = { ...state[kind][name], ...localState };
      let changedValue = false;
      if (merge.value) {
        changedValue =
          initialState[kind][name].value === merge.value ? false : true;
      }
      merge.timeStamp = changedValue ? new Date() : null;
      const mutableState = { ...state };
      mutableState[kind][name] = merge;
      return mutableState;
    });
  };

  const handleSubmit = () => {
    let mutableState = { ...validation };
    //validate untouched values:
    if (mutableState.untouched.length > 0) {
      const workingArray = validation.untouched;
      for (let i = 0; i < workingArray.length; i++) {
        const tempState = updateValidationObjectBeforeSetState(
          mutableState,
          workingArray[i],
          globalStats[kind][workingArray[i]].value
        );
        mutableState = { ...mutableState, ...tempState };
      }
    }
    // check if any cumulative entry errors:
    mutableState = checkForCumulative(mutableState);
    //Show errors if errors present:
    for (const subValue of Object.values(mutableState.errorMessages)) {
      if (subValue) {
        mutableState.showErrorMessages = true;
      }
    }
    if (mutableState.showErrorMessages) {
      setValidation(mutableState);
    } else {
      const submitObject = {};
      for (const key of Object.keys(validation.proforma)) {
        submitObject[key] = relevantHalf[key].value;
      }
      setValidation((old) => {
        return { ...old, ...{ showErrorMessages: false } };
      });
      customSubmitFunction(submitObject);
      setValidation({
        ...mutableState,
        ...{ showErrorMessages: false },
      });
    }
  };

  const combinedReset = () => {
    setGlobalStats((state) => {
      const mutableState = { ...state };
      for (const validationKey of Object.keys(validation.proforma)) {
        for (const globalKey of Object.keys(relevantHalf)) {
          if (validationKey === globalKey) {
            mutableState[kind][globalKey] = initialState[kind][globalKey];
            break;
          }
        }
      }
      return mutableState;
    });
    handleValidationReset();
  };

  //console.log(validation);

  if (name) {
    return {
      handleSubmit,
      combinedSetter,
      combinedReset,
      buttonState,
      initialState,
      errorMessages,
      showErrorMessages,
    };
  } else {
    return { handleSubmit, combinedReset, initialState };
  }
};

export default useCombined;
