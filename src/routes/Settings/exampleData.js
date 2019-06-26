// @flow
import type { Settings } from './SettingsContext';

const exampleData: Settings = {
  birthDate: new Date('20 may 2015'),
  points: [
    {
      value: 3000,
      measurementDate: new Date('21 may 2015'),
    }, {
      value: 4400,
      measurementDate: new Date('28 july 2015'),
    }, {
      value: 5500,
      measurementDate: new Date('05 september 2015'),
    }, {
      value: 8000,
      measurementDate: new Date('21 february 2016'),
    }, {
      value: 10000,
      measurementDate: new Date('21 december 2017'),
    }, {
      value: 12000,
      measurementDate: new Date('21 may 2018'),
    },
  ],
};

export default exampleData;
