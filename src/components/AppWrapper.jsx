import React from 'react';
import styled from 'styled-components';

import pages from '../routes/pages.json';
import KindSwitcher from './KindSwitcher';
import NavButton from './NavButton';
import usePath from '../hooks/usePath';

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
        <CalculatorContainer>{children}</CalculatorContainer>
      </AppContainer>
    </AppWindow>
  );
};

const AppWindow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AppContainer = styled.div`
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
  overflow: hidden;
  border-radius: 10px;
`;

const SelectorContainer = styled.div`
  width: 30vw;
  height: 98vh;
  background-color: var(--global-light);
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const CalculatorContainer = styled.div`
  width: 68vw;
  height: 98vh;
  background-color: var(--global-calc-background);
  color: var(--global-medium);
  display: inherit;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default AppWrapper;
