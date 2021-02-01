import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';

import ButtonGeneric from './ButtonGeneric';
import cssVar from '../brains/cssVar';
import { ButtonText } from '../config/sharedStyles';

const NavButton = ({ path, name }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const handleButtonClick = () => {
    history.push(path);
  };
  const backgroundColor = pathname === path ? cssVar('--global-dark') : null;
  return (
    <ButtonGeneric
      backgroundColor={backgroundColor}
      fade={true}
      onClick={() => handleButtonClick()}
    >
      <ButtonText>{name}</ButtonText>
    </ButtonGeneric>
  );
};

NavButton.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default NavButton;
