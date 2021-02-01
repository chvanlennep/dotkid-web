import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ValidatorContext = React.createContext({});

const getType = (obj, fullClass) => {
  // get toPrototypeString() of obj (handles all types)
  // Early JS environments return '[object Object]' for null, so it's best to directly check for it.
  if (fullClass) {
    return obj === null ? '[object Null]' : Object.prototype.toString.call(obj);
  }
  if (obj == null) {
    return (obj + '').toLowerCase();
  } // implicit toString() conversion

  const deepType = Object.prototype.toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();
  if (deepType === 'generatorfunction') {
    return 'function';
  }

  // Prevent overspecificity (for example, [object HTMLDivElement], etc).
  // Account for functionish Regexp (Android <=2.3), functionish <object> element (Chrome <=57, Firefox <=52), etc.
  // String.prototype.match is universally supported.

  return deepType.match(
    /^(array|bigint|date|error|function|generator|regexp|symbol)$/
  )
    ? deepType
    : typeof obj === 'object' || typeof obj === 'function'
    ? 'object'
    : typeof obj;
};

class Validator {
  constructor(proformaObject) {
    if (typeof proformaObject !== 'object' || !proformaObject) {
      console.log('No valid proforma object given to validator');
      return null;
    }
    const {
      type,
      isRequired,
      min,
      max,
      nullable,
      countCumulative,
    } = proformaObject;
    if (type) {
      if (!type.param) {
        console.log('A type must be specified');
        return null;
      }
    }
    if (!type) {
      console.log('A type must be specified');
      return null;
    }
    this.type = type;
    this.isRequired = isRequired;
    this.min = min;
    this.max = max;
    this.nullable = nullable;
    this.countCumulative = countCumulative;
  }
  validate(value) {
    const outputObject = {
      errors: false,
      isRequiredError: '',
      minError: '',
      maxError: '',
      typeError: '',
      count: this.countCumulative ? 1 : 0,
    };
    let internalType = '';
    switch (getType(value)) {
      case 'number':
        internalType = 'number';
        break;
      case 'string':
        if (!Number.isNaN(Number(value))) {
          internalType = 'number';
        } else {
          internalType = 'string';
        }
        break;
      case 'object':
        internalType = 'object';
        break;
      case 'date':
        internalType = 'dateObject';
        break;
      case 'null':
        if (this.nullable) {
          internalType = this.type.param;
        } else {
          internalType = 'null';
        }
        break;
      default:
        outputObject.errors = true;
        outputObject.typeError = 'Type entered not recognised by validator';
        return outputObject;
    }
    if (internalType !== this.type.param) {
      if (!(value === '' && this.type.param === 'string')) {
        outputObject.errors = true;
        if (this.type.message) {
          outputObject.typeError = this.type.message;
        } else {
          outputObject.typeError = `Invalid type entered. Should be ${this.type.param} and it was ${internalType}`;
        }
        return outputObject;
      }
    }
    if (this.isRequired) {
      if (this.isRequired.param) {
        if (!value) {
          outputObject.errors = true;
          if (this.isRequired.message) {
            outputObject.isRequiredError = this.isRequired.message;
          } else {
            outputObject.isRequiredError = 'No entry found.';
          }
          return outputObject;
        }
      }
    }
    if (this.countCumulative) {
      if (this.countCumulative.param) {
        if (!value) {
          outputObject.count = 0;
          return outputObject;
        }
      }
    }
    if (this.min) {
      if (this.min.param) {
        if (Number(value) < this.min.param) {
          outputObject.errors = true;
          if (this.min.message) {
            outputObject.minError = this.min.message;
          } else {
            outputObject.minError = 'Value too low.';
          }
          return outputObject;
        }
      }
    }
    if (this.max) {
      if (this.max.param) {
        if (Number(value) > this.max.param) {
          outputObject.errors = true;
          if (this.max.message) {
            outputObject.maxError = this.max.message;
          } else {
            outputObject.maxError = 'Value too high.';
          }
          return outputObject;
        }
      }
    }
    return outputObject;
  }
}

// const proforma = {
//   type: { param: 'dateObject', message: 'Please enter a date' },
//   isRequired: { param: true },
//   countCumulative: {
//     param: true,
//     minCount: 1,
//     message: 'Minimum threshold of entries not reached for specified fields',
//   },
// };

const ValidatorProvider = ({
  children,
  validationProforma,
  customSubmitFunction,
}) => {
  class ValidatorState {
    constructor(proforma) {
      this.cumulative = {};
      this.errorMessages = {};
      this.proforma = proforma;
      this.untouched = [];
      this.showErrorMessages = false;
      for (const [key, value] of Object.entries(proforma)) {
        this.errorMessages[key] = '';
        this.untouched.push(key);
        if (value.countCumulative) {
          this.cumulative[key] = 0;
        }
      }
    }
  }

  const [validation, setValidation] = useState(
    new ValidatorState(validationProforma)
  );

  const handleValidationReset = () =>
    setValidation(new ValidatorState(validationProforma));

  return (
    <ValidatorContext.Provider
      value={{
        customSubmitFunction,
        validation,
        handleValidationReset,
        setValidation,
      }}
    >
      {children}
    </ValidatorContext.Provider>
  );
};

ValidatorProvider.propTypes = {
  children: PropTypes.node.isRequired,
  customSubmitFunction: PropTypes.func.isRequired,
  validationProforma: PropTypes.object,
};

export { ValidatorContext, ValidatorProvider, Validator };
