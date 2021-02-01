import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const usePath = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const initialState = {
    path: pathname,
    kind: pathname.charAt(1) === 'n' ? 'neonate' : '',
    previousOtherKindPath: null,
    changePath: false,
  };

  const [state, setState] = useState(initialState);

  const handleSwitchClick = (change = true) => {
    if (state.kind === 'child' || !state.kind) {
      setState((oldState) => {
        const mutableState = { ...oldState };
        mutableState.path = mutableState.previousOtherKindPath || '/neonate';
        mutableState.kind = 'neonate';
        mutableState.previousOtherKindPath = `${pathname}`;
        mutableState.changePath = change ? true : false;
        return mutableState;
      });
    } else if (state.kind === 'neonate') {
      setState((oldState) => {
        const mutableState = { ...oldState };
        mutableState.path = mutableState.previousOtherKindPath || '/child';
        mutableState.kind = 'child';
        mutableState.previousOtherKindPath = `${pathname}`;
        mutableState.changePath = change ? true : false;
        return mutableState;
      });
    }
  };

  useEffect(() => {
    if (state.changePath) {
      history.push(state.path);
      setState((oldState) => {
        const mutableState = { ...oldState, ...{ changePath: false } };
        return mutableState;
      });
    } else if (
      pathname.charAt(1) &&
      state.path.charAt(1) &&
      pathname.charAt(1) !== state.path.charAt(1)
    ) {
      handleSwitchClick(false);
    }
  }, [state, history, pathname]);

  return { handleSwitchClick, state };
};

export default usePath;
