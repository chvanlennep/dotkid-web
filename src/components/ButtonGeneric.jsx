import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import cssVar from '../brains/cssVar';

const ButtonGeneric = ({
  backgroundColor,
  children,
  fade = false,
  onClick,
}) => {
  return (
    <ButtonContainer
      backgroundColor={backgroundColor}
      onClick={onClick}
      fade={fade}
    >
      {children}
    </ButtonContainer>
  );
};

const fadeIn = keyframes`
{
  0% {opacity:0;}
  100% {opacity:1;}
  }
`;

const animation = css`
  ${fadeIn} ease 0.5s
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 25px);
  height: 80px;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : cssVar('--global-medium')};
  border-radius: 8px;
  margin: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  animation: ${({ fade }) => (fade ? animation : 'none')};
  &:hover {
    background-color: ${({ backgroundColor }) =>
      backgroundColor ? backgroundColor : cssVar('--global-dark-medium')};
  }
`;

export default ButtonGeneric;
