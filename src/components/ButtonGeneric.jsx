import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colorsInJs, Div, fadeAnimation } from '../config/sharedStyles';

const ButtonGeneric = ({
  backgroundColor,
  children,
  hover = true,
  hoverColor,
  fade = false,
  onClick,
}) => {
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      hover={hover}
      hoverColor={hoverColor}
      onClick={onClick}
      fade={fade}
    >
      {children}
    </ButtonContainer>
  );
};

const ButtonContainer = styled(Div)`
  width: 370px;
  min-height: 76px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : colorsInJs.medium};
  border-radius: 8px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  animation: ${({ fade }) => (fade ? fadeAnimation : 'none')};
  &:hover {
    background-color: ${({ hoverColor, hover }) =>
      hoverColor ? hoverColor : hover && colorsInJs.darkMedium};
  }
`;

ButtonGeneric.propTypes = {
  children: PropTypes.node,
  backgroundColor: PropTypes.string,
  hover: PropTypes.bool,
  hoverColor: PropTypes.string,
  fade: PropTypes.bool,
  onClick: PropTypes.func,
};

export default ButtonGeneric;
