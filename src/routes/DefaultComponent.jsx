import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import cssVar from '../brains/cssVar';
import IconGeneric from '../components/IconGeneric';
import { fadeAnimation } from '../config/sharedStyles';

const DefaultComponent = ({ kind }) => {
  const iconName = kind === 'child' ? 'face' : 'baby-face-outline';
  const iconColor =
    kind === 'child'
      ? cssVar('--global-color-primary')
      : cssVar('--global-color-secondary');

  return (
    <Overall>
      <IconGeneric
        iconName={iconName}
        size="100"
        fill={iconColor}
        hover={false}
      />
      <StartingText>←Select a calculator from the left to start</StartingText>
    </Overall>
  );
};

const Overall = styled.div`
  background-color: var(--global-light);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  flex-direction: column;
  padding: 50px;
  animation: ${fadeAnimation};
`;

const StartingText = styled.p`
  font-size: 1.2em;
  color: var(--global-dark);
  margin-top: 20px;
`;

DefaultComponent.propTypes = {
  kind: PropTypes.string.isRequired,
};

export default DefaultComponent;
