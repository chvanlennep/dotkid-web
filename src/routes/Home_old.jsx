import React from 'react';
import styled from 'styled-components';

import mainLogo from '../assets/dotKid_logo.png';

const Home = () => {
  return (
    <React.Fragment>
      <ImageContainer>
        <img src={mainLogo} alt="dotKid logo" height="60" width="160" />
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

export default Home;
