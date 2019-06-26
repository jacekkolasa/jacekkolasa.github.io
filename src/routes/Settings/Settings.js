// @flow
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

// there's some react-static bug preventing import without assigning to value
// eslint-disable-next-line no-unused-vars
import stylesDatePicker from 'react-datepicker/dist/react-datepicker-cssmodules.css';

import PointsForm from 'components/PointsForm';

import styles from './Settings.css';

const Settings = () => {
  const [birthDate, setBirthDate] = useState();

  const yearsDiff = moment().diff(birthDate, 'years');
  const monthsDiff = moment().diff(birthDate, 'months') - yearsDiff * 12;

  let yearsString;
  if (yearsDiff > 1) {
    yearsString = `${yearsDiff} years, `;
  } else if (yearsDiff === 1) {
    yearsString = '1 year, ';
  }
  const monthsString = `${monthsDiff} months old`;

  return (
    <div className={styles.container}>
      Please provide neccessary data
      <div className={styles.birthDate}>
        Birth date:
        <DatePicker
          selected={birthDate}
          onChange={(newDate) => {
            // remove the second argument from onChange callback
            setBirthDate(newDate);
          }}
          maxDate={new Date()}
          showYearDropdown
          className={styles.datePicker}
        />
        {birthDate && (
          <div>
            Age:
            {' '}
            {yearsString}
            {monthsString}
          </div>
        )}
      </div>
      <div className={styles.pointsForm}>
        <PointsForm />
      </div>
    </div>
  );
};

export default Settings;
