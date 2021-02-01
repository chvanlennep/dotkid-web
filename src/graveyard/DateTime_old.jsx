import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';
import ButtonGeneric from '../ButtonGeneric';

const DateTime = () => {
  const [startDate, setStartDate] = useState(new Date());
  const ExampleCustomInput = ({ value, onClick }) => (
    <ButtonGeneric onClick={onClick}>
      <Text>{value}</Text>
    </ButtonGeneric>
  );
  ExampleCustomInput.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  return (
    <DatePicker
      selected={startDate}
      dateFormat="dd/MM/yyyy"
      onChange={(date) => setStartDate(date)}
      customInput={<ExampleCustomInput />}
    />
  );
};

const Text = styled.h2`
  color: white;
  font-size: 1.2em;
  font-weight: 400;
`;

export default DateTime;
