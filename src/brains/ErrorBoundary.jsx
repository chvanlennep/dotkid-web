import React from 'react';
import styled from 'styled-components';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch the error in any logging service
    console.log({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <Container>Oops something went wrong</Container>;
    }

    return this.props.children;
  }
}

const Container = styled.h1`
  text-align: center;
  width: 200px;
  height: 100px;
  color: red;
  background-color: black;
  border-radius: 10px;
`;

export default ErrorBoundary;
