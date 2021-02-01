import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import cssVar from '../brains/cssVar';
import IconGeneric from './IconGeneric';
import Toggle from './Toggle';

const KindSwitcher = ({ kind, handleClick }) => {
  let toggle;
  if (!kind) {
    toggle = 'default';
  } else {
    kind === 'child' ? (toggle = 'off') : (toggle = 'on');
  }

  const iconColor = (iconName) => {
    if (toggle === 'off' || toggle === 'default') {
      return iconName === 'face' ? 'black' : cssVar('--global-medium');
    } else {
      return iconName === 'face' ? cssVar('--global-medium') : 'black';
    }
  };

  const handleIconClick = (iconName) => {
    if (
      (iconName === 'face' && toggle === 'on') ||
      (iconName === 'baby-face-outline' && toggle !== 'on')
    ) {
      handleClick();
    }
  };

  return (
    <Container>
      <div onClick={() => handleIconClick('face')}>
        <IconGeneric
          iconName="face"
          size={40}
          fill={iconColor('face')}
          hover={false}
        />
      </div>
      <Toggle handleClick={handleClick} toggle={toggle} />
      <div onClick={() => handleIconClick('baby-face-outline')}>
        <IconGeneric
          iconName="baby-face-outline"
          size={40}
          fill={iconColor('baby-face-outline')}
          hover={false}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

KindSwitcher.propTypes = {
  kind: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default KindSwitcher;
