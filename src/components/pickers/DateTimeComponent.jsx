import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonGeneric from '../ButtonGeneric';
import { ButtonText, colorsInJs, Div } from '../../config/sharedStyles';
import ConfirmCancel from '../ConfirmCancel';
import IconGeneric from '../IconGeneric';
import DateTimeBare from '../DateTimeBare';
import { formatDate, formatTime } from '../../brains/oddBits';
import useCombined from '../../hooks/useCombined';
import ErrorMessage from '../ErrorMessage';

const DateTimeComponent = ({
  kind = 'child',
  type = 'birth',
  renderTime = false,
}) => {
  const name = type === 'birth' ? 'dob' : 'dom';

  const {
    errorMessages,
    showErrorMessages,
    combinedSetter,
    buttonState,
    initialState,
  } = useCombined(kind, name);

  let labelText;

  if (type === 'birth') {
    if (renderTime) {
      labelText = buttonState.value
        ? `DOB: ${formatDate(buttonState.value)} at ${formatTime(
            buttonState.value
          )}`
        : 'Date and Time of Birth';
    } else {
      labelText = buttonState.value
        ? `Date of Birth: ${formatDate(buttonState.value)}`
        : 'Date of Birth';
    }
  } else if (type === 'measured') {
    if (renderTime) {
      labelText = buttonState.value
        ? `Measured on ${formatDate(buttonState.value)} at ${formatTime(
            buttonState.value
          )}`
        : 'Measured: Now';
    } else {
      labelText = buttonState.value
        ? `Measured on ${formatDate(buttonState.value)}`
        : 'Measured: Today';
    }
  }

  const chevron = buttonState.showPicker ? 'chevron-down' : 'chevron-right';

  const togglePicker = () => {
    if (!buttonState.showPicker) {
      combinedSetter({
        showPicker: true,
        date: buttonState.value || new Date(),
      });
    } else {
      let newValue = null;
      if (type === 'birth') {
        newValue = buttonState.date;
      } else if (type === 'measured') {
        if (
          formatDate(buttonState.date) !== formatDate(new Date()) &&
          formatTime(buttonState.date) !== formatTime(new Date())
        ) {
          if (
            (renderTime &&
              formatTime(buttonState.date) !== formatTime(new Date())) ||
            !renderTime
          ) {
            newValue = buttonState.date;
          }
        }
      }
      combinedSetter({ showPicker: false, value: newValue, date: null });
    }
  };

  const handleCancel = () => {
    combinedSetter({ showPicker: false, date: null });
  };

  const handleReset = () => {
    combinedSetter(initialState[kind][name]);
  };

  const setDate = (date) => {
    combinedSetter({ date: date });
  };

  return (
    <React.Fragment>
      <ButtonGeneric
        backgroundColor={colorsInJs.dark}
        hoverColor={colorsInJs.darkest}
        fade
      >
        <LabelContainer onClick={togglePicker}>
          <IconGeneric iconName="calendar-range" margin={10} hover={false} />
          <ButtonText>{labelText}</ButtonText>
          <IconGeneric iconName={chevron} margin={8} hover={false} />
        </LabelContainer>
        <IconGeneric
          iconName="delete-forever"
          onClick={handleReset}
          hide={!buttonState.value && true}
        />
      </ButtonGeneric>
      {buttonState.showPicker && (
        <ButtonGeneric hover={false} backgroundColor={colorsInJs.dark} fade>
          <DataEntryContainer>
            <DateTimeBare
              date={buttonState.date}
              setDate={setDate}
              renderTime={renderTime}
            />
            <ConfirmCancel
              handleConfirm={togglePicker}
              handleCancel={handleCancel}
            />
          </DataEntryContainer>
        </ButtonGeneric>
      )}
      <ErrorMessage
        specificErrorMessage={errorMessages[name]}
        showErrorMessages={showErrorMessages}
      />
    </React.Fragment>
  );
};

const LabelContainer = styled(Div)`
  width: calc(100% - 60px);
`;

const DataEntryContainer = styled(Div)`
  width: 100%;
  justify-content: space-evenly;
  padding-top: 10px;
  padding-bottom: 10px;
`;

DateTimeComponent.propTypes = {
  kind: PropTypes.string,
  type: PropTypes.string,
  renderTime: PropTypes.bool,
};

export default DateTimeComponent;
