// Checking for ES6 support

function isES6() {
  try {
    Function('() => {};');
    return true;
  } catch (exception) {
    return false;
  }
}

if (isES6()) {
  var rootDiv = document.getElementById('root');
  rootDiv.style.display = 'contents';
} else {
  var errorDiv = document.getElementById('errorMessageContainer');
  errorDiv.style.display = 'flex';
  document.getElementById('errorMessage').innerHTML =
    'Internet explorer and other legacy browsers are not supported by dotKid';
}
