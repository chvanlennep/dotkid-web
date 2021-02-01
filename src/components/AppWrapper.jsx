import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import pages from '../routes/pages.json';
import KindSwitcher from './KindSwitcher';
import NavButton from './NavButton';
import usePath from '../hooks/usePath';
import ErrorBoundary from '../brains/ErrorBoundary';
import { Div } from '../config/sharedStyles';

const AppWrapper = ({ children }) => {
  const { state, handleSwitchClick } = usePath();
  const realKind = state.kind || 'child';
  const navigateButtons = pages[realKind].map((value) => {
    return <NavButton key={value.id} path={value.path} name={value.name} />;
  });

  return (
    <AppWindow>
      <AppContainer>
        <SelectorContainer>
          <KindSwitcher kind={state.kind} handleClick={handleSwitchClick} />
          <ButtonContainer>{navigateButtons}</ButtonContainer>
        </SelectorContainer>
        <CalculatorContainer>
          <ErrorBoundary>{children}</ErrorBoundary>
        </CalculatorContainer>
      </AppContainer>
    </AppWindow>
  );
};

const AppWindow = styled(Div)`
  flex-direction: column;
`;

const AppContainer = styled(Div)`
  overflow: hidden;
  border-radius: 15px;
`;

const SelectorContainer = styled(Div)`
  width: 395px;
  height: 98vh;
  max-height: 1000px;
  background-color: var(--global-light);
  flex-direction: column;
`;

const ButtonContainer = styled(Div)`
  width: 100%;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const CalculatorContainer = styled(Div)`
  width: calc(98vw - 395px);
  max-width: 1100px;
  height: 98vh;
  max-height: 1000px;
  background-color: var(--global-medium);
  color: var(--global-medium);
  flex-direction: column;
`;

AppWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppWrapper;
