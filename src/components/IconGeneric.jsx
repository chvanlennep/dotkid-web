import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import info from '../assets/svgInfo.json';
import { Div } from '../config/sharedStyles';
import cssVar from '../brains/cssVar';

const IconGeneric = ({
  iconName,
  margin,
  onClick,
  size = 20,
  fill = 'white',
  hover = true,
  hoverFill = cssVar('--global-light'),
  hide,
}) => {
  if (!info[iconName]) {
    alert('Icon name not found, have you remembered to run the svg parser?');
    return null;
  }
  return (
    <IconContainer
      onClick={onClick}
      margin={margin}
      hide={hide}
      hover={hover}
      hoverFill={hoverFill}
      fill={fill}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={size}
        width={size}
      >
        <path d={info[iconName]} />
      </svg>
    </IconContainer>
  );
};

const IconContainer = styled(Div)`
  visibility: ${({ hide }) => hide && 'hidden'};
  margin: ${({ margin }) => (margin ? `${margin}px` : '0px')};
  fill: ${({ fill }) => fill};
  &:hover {
    fill: ${({ hover, hoverFill }) => hover && hoverFill};
  }
`;

IconGeneric.propTypes = {
  iconName: PropTypes.string.isRequired,
  margin: PropTypes.number,
  onClick: PropTypes.func,
  size: PropTypes.number,
  fill: PropTypes.string,
  hover: PropTypes.bool,
  hoverFill: PropTypes.string,
  hide: PropTypes.bool,
};

export default IconGeneric;
