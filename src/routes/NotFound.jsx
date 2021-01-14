import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <Container>
      <Heading>Error 404</Heading>
      <Para>Calculator page not found. Is the URL correct?</Para>
    </Container>
  );
};

const Heading = styled.h2`
  color: var(--global-dark);
`;

const Para = styled.p``;

const Container = styled.div`
  text-align: center;
`;

export default NotFound;
