import React from 'react';

import proformaTemplate from '../../brains/proformaTemplate';
import DateTimeComponent from '../../components/pickers/DateTimeComponent';
import SexComponent from '../../components/pickers/SexComponent';
import TextComponent from '../../components/pickers/TextComponent';
import SubmitOrReset from '../../components/SubmitOrReset';
import { ValidatorProvider } from '../../components/Validator';
import { CalcHolder, CalcSideBox } from '../../config/sharedStyles';

const proforma = {
  weight: proformaTemplate.child.weight,
  height: proformaTemplate.child.height,
  hc: proformaTemplate.child.hc,
  dob: proformaTemplate.child.dob,
  dom: proformaTemplate.child.dom,
  sex: proformaTemplate.child.sex,
};

const ChildCentile = () => {
  return (
    <ValidatorProvider
      validationProforma={proforma}
      customSubmitFunction={(values) => alert(JSON.stringify(values))}
    >
      <CalcHolder>
        <CalcSideBox>
          <DateTimeComponent kind="child" type="birth" />
          <SexComponent kind="child" />
          <TextComponent
            name="weight"
            userLabel="Weight"
            units="kg"
            kind="child"
            iconName="chart-bar"
          />
          <TextComponent
            name="height"
            userLabel="Height"
            units="cm"
            kind="child"
            iconName="arrow-up-down"
          />
          <TextComponent
            name="hc"
            userLabel="Head Circumference"
            units="cm"
            kind="child"
            iconName="emoticon-outline"
          />
          <DateTimeComponent kind="child" type="measured" />
          <SubmitOrReset title="Reset" kind="child" type="reset" />
          <SubmitOrReset title="Submit" kind="child" type="submit" />
        </CalcSideBox>
      </CalcHolder>
    </ValidatorProvider>
  );
};

export default ChildCentile;
