import React from 'react';
import info from '../assets/svgInfo.json';

const IconGeneric = ({ iconName, size, fill }) => {
  if (!info[iconName]) {
    console.log(
      'Icon name not found, have you remembered to run the svg parser?'
    );
    return null;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={size}
      width={size}
    >
      <path d={info[iconName]} fill={fill} />
    </svg>
  );
};

export default IconGeneric;
