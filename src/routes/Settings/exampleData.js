// @flow
import type { Settings } from './SettingsContext';

const exampleData: Settings = {
  birthDate: new Date('20 may 2018'),
  points: [
    {
      value: 3000,
      measurementDate: new Date('21 may 2018'),
    }, {
      value: 3100,
      measurementDate: new Date('28 may 2018'),
    }, {
      value: 3200,
      measurementDate: new Date('05 june 2018'),
    }, {
      value: 3300,
      measurementDate: new Date('21 may 2018'),
    }, {
      value: 3400,
      measurementDate: new Date('21 may 2018'),
    }, {
      value: 3500,
      measurementDate: new Date('21 may 2018'),
    },
  ],
};

export default exampleData;
