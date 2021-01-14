import React from 'react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';

import ButtonGeneric from './ButtonGeneric';
import cssVar from '../brains/cssVar';

const NavButton = ({ path, name }) => {
  const location = useLocation();
  const history = useHistory();
  const handleButtonClick = () => {
    history.push(path);
  };
  const backgroundColor =
    location.pathname === path ? cssVar('--global-dark') : null;
  return (
    <ButtonGeneric
      backgroundColor={backgroundColor}
      fade={true}
      onClick={() => handleButtonClick()}
    >
      <NavText>{name}</NavText>
    </ButtonGeneric>
  );
};

const NavText = styled.h2`
  color: white;
  font-size: 1.2em;
  font-weight: 400;
`;

export default NavButton;
