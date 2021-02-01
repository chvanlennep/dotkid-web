import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ButtonGeneric from '../ButtonGeneric';
import { ButtonText, colorsInJs, Div } from '../../config/sharedStyles';
import ConfirmCancel from '../ConfirmCancel';
import IconGeneric from '../IconGeneric';
import useCombined from '../../hooks/useCombined';
import ErrorMessage from '../ErrorMessage';

const TextComponent = ({
  kind = 'child',
  name,
  iconName,
  userLabel,
  units,
}) => {
  const {
    errorMessages,
    showErrorMessages,
    combinedSetter,
    buttonState,
    initialState,
  } = useCombined(kind, name);

  let labelText = userLabel;

  if (buttonState.value) {
    labelText = `${userLabel}: ${buttonState.value}${units}`;
  }

  const firstTextValue = initialState[kind][name].text;

  const chevron = buttonState.showPicker ? 'chevron-down' : 'chevron-right';

  const togglePicker = () => {
    if (!buttonState.showPicker) {
      combinedSetter({
        showPicker: true,
      });
    } else {
      combinedSetter({
        showPicker: false,
        value: buttonState.text,
      });
    }
  };

  const handleCancel = () => {
    combinedSetter({ showPicker: false, text: buttonState.value });
  };

  const handleChange = (event) => {
    combinedSetter({ text: event.target.value });
  };

  const handleReset = () => {
    combinedSetter(initialState[kind][name]);
  };

  const handleKeyPress = (event) => {
    const key = event.keyCode || event.which;
    if (key === 13) {
      combinedSetter({
        showPicker: false,
        value: buttonState.text,
      });
    }
  };

  return (
    <React.Fragment>
      <ButtonGeneric
        backgroundColor={colorsInJs.dark}
        hoverColor={colorsInJs.darkest}
        fade
      >
        <LabelContainer onClick={togglePicker}>
          <IconGeneric iconName={iconName} margin={10} hover={false} />
          <ButtonText>{labelText}</ButtonText>
          <IconGeneric iconName={chevron} margin={8} hover={false} />
        </LabelContainer>
        <IconGeneric
          iconName={firstTextValue ? 'refresh' : 'delete-forever'}
          onClick={handleReset}
          hide={buttonState.value === firstTextValue && true}
        />
      </ButtonGeneric>
      {buttonState.showPicker && (
        <ButtonGeneric hover={false} backgroundColor={colorsInJs.dark} fade>
          <DataEntryContainer>
            <TextInput
              autoFocus
              type="text"
              value={buttonState.text}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder={`Enter here (in ${units})`}
            ></TextInput>
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

const TextInput = styled.input`
  width: 200px;
  height: 34px;
  font-size: 18px;
  background-color: var(--global-medium);
  color: white;
  border-radius: 5px;
  border: none;
  padding: 4px;
  padding-left: 20px;
  padding-right: 20px;
  &:focus {
    outline: black;
  }
  &::placeholder {
    color: var(--global-darkest);
  }
`;

TextComponent.propTypes = {
  kind: PropTypes.string,
  name: PropTypes.string,
  iconName: PropTypes.string,
  userLabel: PropTypes.string,
  units: PropTypes.string,
};

export default TextComponent;
