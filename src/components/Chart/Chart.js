// @flow
import * as React from 'react';
import Papa from 'papaparse';
import { withContentRect } from 'react-measure';
import type { HOC } from 'recompose';

// https://www.who.int/childgrowth/standards/tab_wfa_boys_p_0_5.txt
// $ExpectError
import whoData from '../../data/tab_wfa_boys_p_0_5.txt';

import styles from './styles.css';

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

type Props = {|
|}
type EnhancedProps = {|
  ...Props,
  contentRect: {
    bounds: {||} | {|
      bottom: number,
      height: number,
      left: number,
      right: number,
      top: number,
      width: number,
    |}
  },
  measureRef: () => void // { current: null | React.ElementRef<'div'> }
|}

const enhance: HOC<EnhancedProps, Props> = withContentRect('bounds');

const Chart = ({
  contentRect: {
    bounds,
  },
  measureRef,
}: EnhancedProps) => { // eslint-disable-line arrow-body-style
  console.debug({ formatted }); // eslint-disable-line
  if (!bounds.width) {
    return (<div ref={measureRef} className={styles.container} />);
  }
  const chartWidth = bounds.width - 100;
  const chartHeight = chartWidth * 3 / 4;
  return (
    <div ref={measureRef} className={styles.container}>
      <svg
        className={styles.svg}
        width={chartWidth}
        height={chartHeight}
      />
    </div>
  );
};

export default enhance(Chart);
