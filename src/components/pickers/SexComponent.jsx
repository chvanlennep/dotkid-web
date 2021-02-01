import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonGeneric from '../ButtonGeneric';
import { ButtonText, colorsInJs, Div, Select } from '../../config/sharedStyles';
import ConfirmCancel from '../ConfirmCancel';
import IconGeneric from '../IconGeneric';
import useCombined from '../../hooks/useCombined';
import ErrorMessage from '../ErrorMessage';

const SexComponent = ({ kind = 'child' }) => {
  const name = 'sex';
  const {
    errorMessages,
    showErrorMessages,
    combinedSetter,
    buttonState,
    initialState,
  } = useCombined(kind, name);

  let labelText = 'Sex';

  if (buttonState.value) {
    labelText = `Sex: ${buttonState.value}`;
  }

  const chevron = buttonState.showPicker ? 'chevron-down' : 'chevron-right';

  const togglePicker = () => {
    if (!buttonState.showPicker) {
      combinedSetter({
        showPicker: true,
      });
    } else {
      combinedSetter({
        showPicker: false,
        value: buttonState.sex,
      });
    }
  };

  const handleCancel = () => {
    combinedSetter({ showPicker: false, sex: buttonState.value });
  };

  const handleChange = (event) => {
    combinedSetter({ sex: event.target.value });
  };

  const handleReset = () => {
    combinedSetter(initialState[kind][name]);
  };

  return (
    <React.Fragment>
      <ButtonGeneric
        backgroundColor={colorsInJs.dark}
        hoverColor={colorsInJs.darkest}
        fade
      >
        <LabelContainer onClick={togglePicker}>
          <IconGeneric iconName="all-inclusive" margin={10} hover={false} />
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
            <SelectContainer>
              <Select
                name="Sex"
                id="sex"
                onChange={handleChange}
                value={buttonState.sex}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </Select>
            </SelectContainer>
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

const SelectContainer = styled(Div)`
  height: 32px;
  width: 150px;
  border-radius: 5px;
  background-color: var(--global-dark-medium);
  padding: 5px;
  padding-right: 10px;
  justify-content: space-evenly;
`;

SexComponent.propTypes = {
  kind: PropTypes.string,
};

export default SexComponent;
