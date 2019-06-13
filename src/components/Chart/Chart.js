// @flow
import React from 'react';
import Papa from 'papaparse';

// https://www.who.int/childgrowth/standards/tab_wfa_boys_p_0_5.txt
// $ExpectError
import whoData from '../../data/tab_wfa_boys_p_0_5.txt';

type Point = {|
  L: string,
  M: string,
  S: string,

  Month: string,

  P01: number,
  P1: number,
  P3: number,
  P5: number,
  P10: number,
  P15: number,
  P25: number,
  P50: number,
  P75: number,
  P85: number,
  P90: number,
  P95: number,
  P97: number,
  P99: number,
  P999: number,
|}

const dataString = atob(whoData.split(',')[1]);
const formatted: Array<Point> = Papa.parse(
  dataString.slice(0, -1), // remove last new-line character
  {
    header: true, // get keys based on first row
    dynamicTyping: true, // convert number strings to Numbers
  },
);
console.log('formatted', formatted); // eslint-disable-line
const Chart = () => { // eslint-disable-line arrow-body-style
  return (
    <div>
      Chart
    </div>
  );
};

export default Chart;
