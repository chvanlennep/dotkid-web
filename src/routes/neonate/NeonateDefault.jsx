import React from 'react';
import styled from 'styled-components';
import cssVar from '../../brains/cssVar';

import IconGeneric from '../../components/IconGeneric';

const NeonateDefault = () => {
  return (
    <React.Fragment>
      <ImageContainer>
        <IconGeneric
          iconName="baby-face-outline"
          size="100"
          fill={cssVar('--global-color-secondary')}
        />
      </ImageContainer>
      <Text>←Select a calculator from the left to start</Text>
    </React.Fragment>
  );
};

const ImageContainer = styled.div`
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 1.2em;
`;

export default NeonateDefault;
