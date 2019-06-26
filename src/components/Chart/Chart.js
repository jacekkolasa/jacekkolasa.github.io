// @flow
import {
  flatMap, last, map, max, min, omit, pipe, rangeStep, values,
} from 'lodash/fp';
import classNames from 'classnames';
import * as React from 'react';
import Papa from 'papaparse';
import { withContentRect } from 'react-measure';
import type { HOC } from 'recompose';
import { curveCardinal, line, scaleLinear } from 'd3';
import atob from 'atob';
import moment from 'moment';

import { useSettings } from 'routes/Settings/SettingsContext';

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
const { data } = formatted;
const [minValue, maxValue] = pipe(
  map(omit(['L', 'M', 'S', 'Month'])), // from each point select only props with values we'll draw
  flatMap(values), // concat them all together
  allValues => [min(allValues), max(allValues)],
)(data);

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


  /**
   * x scale calculations
   *
   */
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


  /**
   * y scale calculations
   */
  const yScale = scaleLinear()
    .domain([minValue, maxValue])
    .range([VIEWBOX_Y - SVG_PADDING, SVG_PADDING])
    .nice();

  const yTicks = yScale
    .ticks(10);


  const getLine = (yProp, lineData) => line()
    .x(d => xScale(d.Month))
    .y(d => yScale(d[yProp]))
    .curve(curveCardinal)(lineData);

  const percentiles = [
    { label: '3rd', propName: 'P3', stroke: '#9E2123' },
    { label: '15th', propName: 'P15', stroke: '#672022' },
    { label: '50th', propName: 'P50', stroke: '#669966' },
    { label: '85th', propName: 'P85', stroke: '#434041' },
    { label: '97th', propName: 'P97', stroke: '#ACAAAC' },
  ];
  const sizeInPx = pixels => VIEWBOX_X / svgWidth * pixels;


  /**
   * main line calculations
   */
  const [{ points, birthDate }] = useSettings();
  const birthDateMoment = moment(birthDate);

  const linePoints = points.map(({ value, measurementDate }) => ({
    x: -birthDateMoment.diff(measurementDate, 'months'),
    y: value / 1000, // grams to kg
  }));
  const mainLine = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(curveCardinal);

  return (
    <div ref={measureRef} className={styles.container}>
      <svg
        className={styles.svg}
        viewBox={`0 0 ${VIEWBOX_X} ${VIEWBOX_Y}`}
      >
        {/* x axis labels and grid */}
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

        {/* y axis labels and grid */}
        <g>
          {yTicks.map(tick => (
            <React.Fragment key={tick}>
              <text
                x={SVG_PADDING - 10}
                y={yScale(tick) + 2}
                textAnchor="end"
                fontSize={sizeInPx(12)}
              >
                {tick}
              </text>
              <line
                x1={SVG_PADDING}
                x2={VIEWBOX_X - SVG_PADDING}
                y1={yScale(tick)}
                y2={yScale(tick)}
                className={styles.yTick}
              />
            </React.Fragment>
          ))}
        </g>

        {/* lines */}
        <g>
          {percentiles.map(percentile => (
            <React.Fragment key={percentile.propName}>
              <path
                d={getLine(percentile.propName, data)}
                className={styles.line}
                stroke={percentile.stroke}
              />
              <text
                x={VIEWBOX_X - SVG_PADDING + 4}
                y={yScale(last(data)[percentile.propName]) + 2}
                fontSize={sizeInPx(12)}
              >
                {percentile.label}
              </text>
            </React.Fragment>
          ))}
          {/* main line */}
          <path
            d={mainLine(linePoints)}
            className={styles.mainLine}
            stroke="#631A86"
          />
        </g>
      </svg>
    </div>
  );
};

export default enhance(Chart);
