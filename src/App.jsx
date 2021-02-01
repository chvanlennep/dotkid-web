import React from 'react';
import { GlobalStatsProvider } from './components/GlobalContext';

import AppWrapper from './components/AppWrapper';
import RouteComponent from './routes/RouteComponent';

const App = () => {
  return (
    <GlobalStatsProvider>
      <AppWrapper>
        <RouteComponent />
      </AppWrapper>
    </GlobalStatsProvider>
  );
};

export default App;
