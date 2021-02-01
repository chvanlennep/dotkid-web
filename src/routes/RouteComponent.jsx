import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import pages from './pages.json';

const DefaultComponent = lazy(() => import('./DefaultComponent'));

const Age = lazy(() => import('./child/Age'));
const Bp = lazy(() => import('./child/Bp'));
const Bsa = lazy(() => import('./child/Bsa'));
const ChildCentile = lazy(() => import('./child/ChildCentile'));
const Qtc = lazy(() => import('./child/Qtc'));
const IvFluid = lazy(() => import('./child/IvFluid'));
const WetFlag = lazy(() => import('./child/WetFlag'));

const Cga = lazy(() => import('./neonate/Cga'));
const BirthCentile = lazy(() => import('./neonate/BirthCentile'));
const PretermCentile = lazy(() => import('./neonate/PretermCentile'));
const NeonateFluid = lazy(() => import('./neonate/NeonateFluid'));
const Jaundice = lazy(() => import('./neonate/Jaundice'));

const NotFound = lazy(() => import('./NotFound'));

const RouteComponent = () => {
  const child = pages.child;
  const neonate = pages.neonate;
  return (
    <Suspense fallback={<div></div>}>
      <Switch>
        <Route exact path="/">
          <DefaultComponent kind="child" />
        </Route>
        <Route exact path="/child">
          <DefaultComponent kind="child" />
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
          <DefaultComponent kind="neonate" />
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
  );
};

export default RouteComponent;
