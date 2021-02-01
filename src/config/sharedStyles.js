import styled, { keyframes, css } from 'styled-components';
import cssVar from '../brains/cssVar';

const colorsInJs = {
  primary: cssVar('--global-color-primary'),
  primaryLight: cssVar('--global-color-primary-light'),
  secondary: cssVar('--global-color-secondary'),
  secondaryLight: cssVar('--global-color-secondary-light'),
  primaryDark: cssVar('--global-color-primary-dark'),
  secondaryDark: cssVar(' --global-color-secondary-dark'),
  darkest: cssVar('--global-darkest'),
  dark: cssVar('--global-dark'),
  darkMedium: cssVar('--global-dark-medium'),
  medium: cssVar('--global-medium'),
  light: cssVar('--global-light'),
  background: cssVar('--global-background'),
  calcBackground: cssVar('--global-calc-background'),
};

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.h2`
  color: white;
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  padding-bottom: 1px;
`;

const fadeIn = keyframes`
{
  0% {opacity:0;}
  100% {opacity:1;}
}
`;

const fadeAnimation = css`
  ${fadeIn} ease 0.5s
`;

const CalcHolder = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  animation: ${fadeAnimation};
`;

const CalcSideBox = styled(Div)`
  width: calc(${({ fullScreen }) => (fullScreen ? '100%' : '50%')} - 30px);
  height: calc(100% - 30px);
  background-color: var(--global-light);
  overflow: scroll;
  border-radius: 15px;
  flex-direction: column;
`;

const Select = styled.select`
  appearance: none;
  font-size: 18px;
  padding: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: var(--global-dark-medium);
  color: white;
  border: 1px solid var(--global-dark-medium);
  outline: none;
  border-radius: 0px;
  overflow: hidden;
  margin: 0px;
  background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2018%2018%20%22%20height%3D%2240%22%20width%3D%2240%22%20%3E%20%3Cpath%20d%3D%22M7.41%2C8.58L12%2C13.17L16.59%2C8.58L18%2C10L12%2C16L6%2C10L7.41%2C8.58Z%22%20fill%3D%22white%22%20%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 5px top 45%, 0 0;
  background-size: 12px auto, 100%;
  &:hover {
    color: var(--global-light);
  }
`;

const SelectLeft = styled(Select)`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const SelectRight = styled(Select)`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background-position: right 8px top 45%, 0 0;
  padding-right: 21px;
`;

export {
  ButtonText,
  CalcHolder,
  CalcSideBox,
  colorsInJs,
  Div,
  fadeAnimation,
  Select,
  SelectRight,
  SelectLeft,
};
