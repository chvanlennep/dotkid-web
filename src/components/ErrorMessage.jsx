import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = ({ specificErrorMessage, showErrorMessages }) => {
  if (specificErrorMessage && showErrorMessages) {
    return <Container>{specificErrorMessage}</Container>;
  } else {
    return null;
  }
};

const Container = styled.p`
  text-align: center;
  color: var(--global-color-primary-dark);
  margin-top: 0px;
  margin-bottom: 0px;
  width: 370px;
`;

ErrorMessage.propTypes = {
  specificErrorMessage: PropTypes.string,
  showErrorMessages: PropTypes.bool.isRequired,
};

export default ErrorMessage;
