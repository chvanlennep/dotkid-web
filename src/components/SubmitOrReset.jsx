import React from 'react';
import PropTypes from 'prop-types';

import ButtonGeneric from './ButtonGeneric';
import { ButtonText, colorsInJs } from '../config/sharedStyles';
import useCombined from '../hooks/useCombined';

const SubmitOrReset = ({ title, kind, type }) => {
  const { handleSubmit, combinedReset } = useCombined(kind);
  const handleClick = () => {
    type === 'submit' ? handleSubmit() : combinedReset();
  };
  let backgroundColor =
    kind === 'child' ? colorsInJs.primary : colorsInJs.secondary;
  let hoverColor =
    kind === 'child' ? colorsInJs.primaryDark : colorsInJs.secondaryDark;
  if (type === 'reset') {
    backgroundColor = colorsInJs.medium;
    hoverColor = colorsInJs.darkMedium;
  }
  return (
    <ButtonGeneric
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      onClick={handleClick}
    >
      <ButtonText>{title}</ButtonText>
    </ButtonGeneric>
  );
};

SubmitOrReset.propTypes = {
  title: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default SubmitOrReset;
