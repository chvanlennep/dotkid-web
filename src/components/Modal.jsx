import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Div, fadeAnimation } from '../config/sharedStyles';

const Modal = ({ children }) => {
  const [visible, setVisible] = useState(false);
  return (
    <React.Fragment>
      <button onClick={() => setVisible(!visible)}>Open</button>
      <ModalBackground visible={visible}>
        <ModalBox visible={visible}>
          <button onClick={() => setVisible(!visible)}>Close</button>
        </ModalBox>
      </ModalBackground>
    </React.Fragment>
  );
};

const ModalBackground = styled.div`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const ModalBox = styled(Div)`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  animation: ${fadeAnimation};
  background: var(--global-light);
  border-radius: 10px;
  transition: 1s ease-in-out;
  box-shadow: -2rem 2rem 2rem rgba(black, 0.2);
  opacity: 1;
  position: fixed;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

Modal.propTypes = {};

export default Modal;
export { ModalBackground, ModalBox };
