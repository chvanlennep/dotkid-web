import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ModalBackground, Modal } from './Modal';

const Alert = () => {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <ModalBackground visible={visible}>
        <Modal visible={visible}></Modal>
      </ModalBackground>
    </React.Fragment>
  );
};

Alert.propTypes = {};

export default Alert;
