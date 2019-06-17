// @flow
import { last, rangeStep } from 'lodash/fp';
import classNames from 'classnames';
import * as React from 'react';
import Papa from 'papaparse';
import { withContentRect } from 'react-measure';
import type { HOC } from 'recompose';
import { scaleLinear } from 'd3';

// https://www.who.int/childgrowth/standards/tab_wfa_boys_p_0_5.txt
// $ExpectError
import whoData from '../../data/tab_wfa_boys_p_0_5.txt';

import styles from './styles.css';

type Point = {|
  L: number,
  M: number,
  S: number,

  Month: number,

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
type FormattedData = {
  data: Array<Point>,
};
const formatted: FormattedData = Papa.parse(
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

const SVG_HORIZONTAL_PADDING = 20;

const Chart = ({
  contentRect: {
    bounds,
  },
  measureRef,
}: EnhancedProps) => {
  const { data } = formatted;
  if (!bounds.width) {
    return (<div ref={measureRef} className={styles.container} />);
  }
  const svgWidth = bounds.width - 100;

  const MAX_SVG_HEIGHT = 620; // prevent a situation when chart needs to be scrolled down
  const svgHeight = Math.min(svgWidth * 3 / 4, MAX_SVG_HEIGHT);

  const chartWidth = svgWidth - 2 * SVG_HORIZONTAL_PADDING;

  const VIEWBOX_X = 500;
  const VIEWBOX_Y = VIEWBOX_X * svgHeight / svgWidth;
  const SVG_PADDING = 40;

  const maxMonth = last(data).Month;
  const xScale = scaleLinear()
    .domain([0, maxMonth])
    .range([SVG_PADDING, VIEWBOX_X - SVG_PADDING])
    // .clamp(true)
    .nice();

  const monthRangeWidth = chartWidth / data.length;

  let monthsBetweenTicks;
  // when there's not enough space for x-axis ticks, don't show some of them
  // only possible options are 2, 3, 4 and 6 so we always see round year
  if (monthRangeWidth > 16) {
    monthsBetweenTicks = 2;
  } else if (monthRangeWidth > 10) {
    monthsBetweenTicks = 3;
  } else if (monthRangeWidth > 6.5) {
    monthsBetweenTicks = 4;
  } else {
    monthsBetweenTicks = 6;
  }

  const xScaleTicks = rangeStep(
    monthsBetweenTicks,
    0,
    data.length,
  );

  const isYearTick = tick => tick % 12 === 0;
  const transformTick = tick => (
    isYearTick(tick)
      ? (`${tick / 12} years`)
      : tick % 12
  );

  const sizeInPx = pixels => VIEWBOX_X / svgWidth * pixels;
  return (
    <div ref={measureRef} className={styles.container}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`}
      >
        {/* x axis descriptions */}
        <g>
          {xScaleTicks.map(tick => (
            <React.Fragment key={tick}>
              <text
                x={xScale(tick)}
                y={VIEWBOX_Y - (isYearTick(tick) ? 5 : 25)}
                textAnchor="middle"
                fontSize={sizeInPx(isYearTick(tick) ? 16 : 12)}
              >
                {transformTick(tick)}
              </text>
              {/* x axis grid  */}
              <line
                x1={xScale(tick)}
                x2={xScale(tick)}
                y1={VIEWBOX_Y - 40}
                y2={10}
                className={classNames(styles.minorXTick, { [styles.year]: isYearTick(tick) })}
              />
            </React.Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default enhance(Chart);
