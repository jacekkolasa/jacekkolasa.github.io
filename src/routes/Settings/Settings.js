// @flow
import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button } from 'react-bootstrap';

// there's some react-static bug preventing import without assigning to value
// eslint-disable-next-line no-unused-vars
import stylesDatePicker from 'react-datepicker/dist/react-datepicker-cssmodules.css';

import PointsForm from 'components/PointsForm';

import { useSettings } from './SettingsContext';
import exampleData from './exampleData';
import styles from './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useSettings();
  const { birthDate } = settings;

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
            setSettings({ ...settings, birthDate: newDate });
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
        <PointsForm
          points={settings.points}
          onChange={(newPoints) => {
            setSettings({ ...settings, points: newPoints });
          }}
        />
      </div>
      <div>
        <Button
          variant="success"
          onClick={() => {
            setSettings(exampleData);
          }}
        >
          Load example data
        </Button>
      </div>
    </div>
  );
};

export default Settings;
