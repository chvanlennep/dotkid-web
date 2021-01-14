export default (cssVariable) => {
  const style = getComputedStyle(document.getElementById('root'));
  return style.getPropertyValue(cssVariable);
};
