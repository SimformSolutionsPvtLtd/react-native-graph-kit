import { Group, Text } from '@shopify/react-native-skia';
import React from 'react';
import type { YAxisLabelsPropsType } from './YAxisLabelsTypes';

/**
 * Renders Y-axis labels for a chart.
 *
 * @param {YAxisLabelsPropsType} props - The component's props.
 * @param {number} props.yScale - The y-axis scale function.
 * @param {string} props.labelColor - The color of the labels.
 * @param {string} props.chartFont - The font for the labels.
 * @returns {JSX.Element} - A React element representing the Y-axis labels.
 */
const YAxisLabels = ({
  yScale,
  labelColor,
  chartFont,
}: YAxisLabelsPropsType): JSX.Element => (
  <Group>
    {yScale.ticks(6).map((label: number, idx: number) => {
      const yPoint = yScale(label);
      return (
        <Text
          key={label + idx.toString()}
          color={labelColor}
          x={0}
          y={yPoint}
          text={label.toString()}
          font={chartFont}
        />
      );
    })}
  </Group>
);

export default YAxisLabels;
