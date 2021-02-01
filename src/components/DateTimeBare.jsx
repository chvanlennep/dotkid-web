import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Div, Select, SelectRight, SelectLeft } from '../config/sharedStyles';

const makeDateObject = (year, month, day, hour, minute) => {
  let dateObject = {};
  try {
    if (!hour || !minute) {
      dateObject = new Date(year, month - 1, day);
    } else {
      dateObject = new Date(year, month - 1, day, hour, minute);
    }
    return dateObject;
  } catch (error) {
    console.log(error);
  }
};

const customDateObject = (dateObject = new Date()) => {
  try {
    const day = `${dateObject.getDate()}`;
    const month = `${dateObject.getMonth() + 1}`;
    const year = `${dateObject.getFullYear()}`;
    const intHour = dateObject.getHours();
    const intMinute = dateObject.getMinutes();
    const hour =
      intHour < 10 ? `0${dateObject.getHours()}` : `${dateObject.getHours()}`;
    const minute = `${Math.floor(intMinute / 15) * 15}`;
    return {
      day: day,
      month: month,
      year: year,
      hour: hour,
      minute: minute,
    };
  } catch (error) {
    console.log(error);
  }
};

const monthDays = (year = '2000', month = '1') => {
  const lengths = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  let monthLength = lengths[month];
  if (year % 4 === 0 && month === '2') {
    monthLength = 29;
  }
  const workingArray = [];
  let i = 1;
  while (i <= monthLength) {
    workingArray.push(`${i}`);
    i += 1;
  }
  return workingArray;
};

const monthArray = [
  { value: '1', string: 'January' },
  { value: '2', string: 'February' },
  { value: '3', string: 'March' },
  { value: '4', string: 'April' },
  { value: '5', string: 'May' },
  { value: '6', string: 'June' },
  { value: '7', string: 'July' },
  { value: '8', string: 'August' },
  { value: '9', string: 'September' },
  { value: '10', string: 'October' },
  { value: '11', string: 'November' },
  { value: '12', string: 'December' },
];

const relevantYears = () => {
  const now = new Date();
  const year = now.getFullYear();
  let workingYear = year - 20;
  const workingArray = [];
  while (workingYear <= year) {
    workingArray.push(`${workingYear}`);
    workingYear += 1;
  }
  return workingArray;
};

const makeHourArray = () => {
  const workingArray = [];
  let i = 0;
  while (i < 24) {
    workingArray.push(i < 10 ? `0${i}` : `${i}`);
    i += 1;
  }
  return workingArray;
};

const minuteArray = ['00', '15', '30', '45'];

const DateTimeBare = ({ date, setDate, renderTime }) => {
  if (!date) {
    console.log('No date given to DateTimePicker');
    return null;
  }
  const custom = customDateObject(date);
  const dayArray = monthDays(custom.year, custom.month);
  const yearArray = relevantYears();
  const hourArray = makeHourArray();
  const initialValues = {
    yearList: yearArray,
    monthList: monthArray,
    dayList: dayArray,
    hourList: hourArray,
    minuteList: minuteArray,
    year: custom.year,
    month: custom.month,
    day: custom.day,
    hour: custom.hour,
    minute: custom.minute,
  };
  const [values, setValues] = useState(initialValues);

  const handleChange = (event, measurement) => {
    const newValue = event.currentTarget.value;
    const newState = { ...values, ...{ [measurement]: newValue } };
    const dayArrayForNewMonth = monthDays(newState.year, newState.month);
    if (values.dayList.length !== dayArrayForNewMonth.length) {
      newState.dayList = dayArrayForNewMonth;
      const newLastDay = dayArrayForNewMonth[dayArrayForNewMonth.length - 1];
      if (newState.day > newLastDay) {
        newState.day = newLastDay;
      }
    }
    const { year, month, day, hour, minute } = newState;
    setValues(newState);
    setDate(makeDateObject(year, month, day, hour, minute));
  };

  const selectDay = values.dayList.map((element) => (
    <option value={element} key={element}>
      {element}
    </option>
  ));
  const selectMonth = values.monthList.map((element) => (
    <option value={element.value} key={element.value}>
      {element.string}
    </option>
  ));
  const selectYear = values.yearList.map((element) => (
    <option value={element} key={element}>
      {element}
    </option>
  ));

  let selectHour, selectMinute;

  if (renderTime) {
    selectHour = values.hourList.map((element) => (
      <option value={element} key={element}>
        {element}
      </option>
    ));
    selectMinute = values.minuteList.map((element) => (
      <option value={element} key={element}>
        {element}
      </option>
    ));
  }

  return (
    <PickerWrapper>
      <Div>
        <SelectLeft
          name="day"
          id="day"
          value={values.day}
          onChange={(event) => handleChange(event, 'day')}
        >
          {selectDay}
        </SelectLeft>
        <Select
          name="month"
          id="month"
          value={values.month}
          onChange={(event) => handleChange(event, 'month')}
        >
          {selectMonth}
        </Select>
        <SelectRight
          name="year"
          id="year"
          value={values.year}
          onChange={(event) => handleChange(event, 'year')}
        >
          {selectYear}
        </SelectRight>
      </Div>
      {renderTime && (
        <TimePickerSpacer>
          <SelectLeft
            name="hour"
            id="hour"
            value={values.hour}
            onChange={(event) => handleChange(event, 'hour')}
          >
            {selectHour}
          </SelectLeft>
          <SelectRight
            name="minute"
            id="minute"
            value={values.minute}
            onChange={(event) => handleChange(event, 'minute')}
          >
            {selectMinute}
          </SelectRight>
        </TimePickerSpacer>
      )}
    </PickerWrapper>
  );
};

const TimePickerSpacer = styled(Div)`
  margin-top: 10px;
`;

const PickerWrapper = styled(Div)`
  flex-direction: column;
`;

DateTimeBare.propTypes = {
  date: PropTypes.object.isRequired,
  renderTime: PropTypes.bool,
  setDate: PropTypes.func.isRequired,
};

export default DateTimeBare;
