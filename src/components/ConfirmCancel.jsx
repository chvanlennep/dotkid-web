import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Div } from '../config/sharedStyles';
import IconGeneric from './IconGeneric';

const ConfirmCancel = ({ handleConfirm, handleCancel }) => {
  return (
    <Container>
      <IconGeneric iconName="close-circle" onClick={handleCancel} size={30} />
      <IconGeneric iconName="check-circle" onClick={handleConfirm} size={30} />
    </Container>
  );
};

const Container = styled(Div)`
  width: 70px;
  justify-content: space-evenly;
  background-color: var(--global-dark-medium);
  border-radius: 5px;
  height: 42px;
`;

ConfirmCancel.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ConfirmCancel;
