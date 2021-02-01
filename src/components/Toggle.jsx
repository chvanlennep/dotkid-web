import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import PropTypes from 'prop-types';

import cssVar from '../brains/cssVar';

const Toggle = ({
  animated = true,
  handleClick,
  onColors,
  offColors,
  scaleFactor = 1,
  toggle,
}) => {
  if (onColors) {
    onDark = onColors[0];
    onLight = onColors[1];
  }
  if (offColors) {
    offDark = offColors[0];
    offLight = offColors[1];
  }

  return (
    <div>
      <Holder
        animated={animated}
        onClick={handleClick}
        toggle={toggle}
        sf={scaleFactor}
        onDark={onDark}
        offDark={offDark}
      >
        <ToggleButton
          animated={animated}
          onClick={handleClick}
          toggle={toggle}
          sf={scaleFactor}
          onLight={onLight}
          offLight={offLight}
        />
      </Holder>
    </div>
  );
};

let onDark = cssVar('--global-color-secondary-dark');
let onLight = cssVar('--global-color-secondary');
let offDark = cssVar('--global-color-primary-dark');
let offLight = cssVar('--global-color-primary');

const Holder = styled.div`
  position: relative;
  height: calc(33px * ${({ sf }) => sf});
  width: calc(67px * ${({ sf }) => sf});
  margin: calc(33px * ${({ sf }) => sf});
  border-radius: calc(17px * ${({ sf }) => sf});
  background: ${(props) =>
    props.toggle === 'on' ? props.onDark : props.offDark};
  transition: ${({ animated }) =>
    animated ? '0.15s background ease-out' : '0s background ease-out'};
`;

const toggleOn = (sf, off, on) => keyframes`
  0% {
    height: calc(40px * ${sf});
    left: calc(-3px * ${sf});
    top: calc(-4px * ${sf});
    border-radius: calc(20px * ${sf});
    background: ${off};
  }
  15% {
    height: calc(33px * ${sf});
    left: calc(13px * ${sf});
    top: 0px;
    border-radius: calc(33px * ${sf});
  }
  100% {
    height: calc(40px * ${sf});
    left: calc(30px * ${sf});
    top: calc(-4px * ${sf});
    border-radius: calc(20px * ${sf});
    background: ${on};
  }
`;

const toggleOff = (sf, off, on) => keyframes`
  0% {
    height: calc(40px * ${sf});
    left: calc(30px * ${sf});
    top: calc(-4px * ${sf});
    border-radius: calc(20px * ${sf});
    background: ${on};
  }
  15% {
    height: calc(33px * ${sf});
    left: calc(13px / ${sf});
    top: 0px;
    border-radius: calc(33px / ${sf});
  }
  100% {
    height: calc(40px * ${sf});
    left: calc(-3px * ${sf});
    top: calc(-4px * ${sf});
    border-radius: calc(20px * ${sf});
    background: ${off};
  }
`;

const animation = (props) => {
  if (props.toggle === 'default' || !props.animated) {
    return 'none';
  } else if (props.toggle === 'on') {
    return css`
      ${toggleOn(props.sf, props.offLight, props.onLight)} 0.15s ease-out
    `;
  } else {
    return css`
      ${toggleOff(props.sf, props.offLight, props.onLight)} 0.15s ease-out
    `;
  }
};

const ToggleButton = styled.div`
  position: absolute;
  top: calc(-4px * ${({ sf }) => sf});
  left: ${(props) =>
    props.toggle === 'on' ? `${30 * props.sf}px` : `${-3 * props.sf}px`};
  width: calc(40px * ${({ sf }) => sf});
  height: calc(40px * ${({ sf }) => sf});
  border-radius: calc(20px * ${({ sf }) => sf});
  background: ${(props) =>
    props.toggle === 'on' ? props.onLight : props.offLight};
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.25);
  animation: ${(props) => animation(props)};
`;

Toggle.propTypes = {
  animated: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  onColors: PropTypes.array,
  offColors: PropTypes.array,
  scaleFactor: PropTypes.number,
  toggle: PropTypes.string,
};

export default Toggle;
