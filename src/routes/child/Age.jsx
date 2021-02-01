import React from 'react';
import DateTimeComponent from '../../components/pickers/DateTimeComponent';
import { ValidatorProvider } from '../../components/Validator';

import { CalcHolder, CalcSideBox } from '../../config/sharedStyles';

const Age = () => {
  const proforma = {
    dob: {
      type: {
        param: 'dateObject',
        message: 'Please enter a valid Date of Birth',
      },
      isRequired: {
        param: true,
        message: 'Please enter a valid Date of Birth',
      },
      nullable: {
        param: true,
      },
    },
  };
  return (
    <ValidatorProvider
      customSubmitFunction={() => alert('submitted')}
      validationProforma={proforma}
    >
      <CalcHolder>
        <CalcSideBox fullScreen>
          <DateTimeComponent kind="child" type="birth" />
        </CalcSideBox>
      </CalcHolder>
    </ValidatorProvider>
  );
};

export default Age;
