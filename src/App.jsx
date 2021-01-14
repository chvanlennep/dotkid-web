import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import AppWrapper from './components/AppWrapper';
import pages from './routes/pages.json';

const ChildDefault = lazy(() => import('./routes/child/ChildDefault'));
const Age = lazy(() => import('./routes/child/Age'));
const Bp = lazy(() => import('./routes/child/Bp'));
const Bsa = lazy(() => import('./routes/child/Bsa'));
const ChildCentile = lazy(() => import('./routes/child/ChildCentile'));
const Qtc = lazy(() => import('./routes/child/Qtc'));
const IvFluid = lazy(() => import('./routes/child/IvFluid'));
const WetFlag = lazy(() => import('./routes/child/WetFlag'));

const NeonateDefault = lazy(() => import('./routes/neonate/NeonateDefault'));
const Cga = lazy(() => import('./routes/neonate/Cga'));
const BirthCentile = lazy(() => import('./routes/neonate/BirthCentile'));
const PretermCentile = lazy(() => import('./routes/neonate/PretermCentile'));
const NeonateFluid = lazy(() => import('./routes/neonate/NeonateFluid'));
const Jaundice = lazy(() => import('./routes/neonate/Jaundice'));

const NotFound = lazy(() => import('./routes/NotFound'));

const App = () => {
  const child = pages.child;
  const neonate = pages.neonate;
  return (
    <AppWrapper>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path="/">
            <ChildDefault />
          </Route>
          <Route exact path="/child">
            <ChildDefault />
          </Route>
          <Route path={child[0].path}>
            <Age />
          </Route>
          <Route path={child[1].path}>
            <Bp />
          </Route>
          <Route path={child[2].path}>
            <Bsa />
          </Route>
          <Route path={child[3].path}>
            <ChildCentile />
          </Route>
          <Route path={child[4].path}>
            <Qtc />
          </Route>
          <Route path={child[5].path}>
            <IvFluid />
          </Route>
          <Route path={child[6].path}>
            <WetFlag />
          </Route>
          <Route exact path="/neonate">
            <NeonateDefault />
          </Route>
          <Route path={neonate[0].path}>
            <Cga />
          </Route>
          <Route path={neonate[1].path}>
            <BirthCentile />
          </Route>
          <Route path={neonate[2].path}>
            <PretermCentile />
          </Route>
          <Route path={neonate[3].path}>
            <NeonateFluid />
          </Route>
          <Route path={neonate[4].path}>
            <Jaundice />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </AppWrapper>
  );
};

export default App;
