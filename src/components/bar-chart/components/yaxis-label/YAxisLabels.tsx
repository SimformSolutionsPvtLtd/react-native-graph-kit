import { Text } from '@shopify/react-native-skia';
import React from 'react';
import type { YAxisLabelsPropsType } from './YAxisLabelsPropsTypes';

const YAxisLabels = ({
  yScale,
  font,
  canvasHeight,
  AXIS_POSITION_VALUE,
  labelColor,
  CHART_BOTTOM_MARGIN
}: YAxisLabelsPropsType) => {
  return (
    <>
      {yScale.ticks().map((tick: number, index: number) => {
        const yPoint = canvasHeight - 2 * CHART_BOTTOM_MARGIN - yScale(tick) + AXIS_POSITION_VALUE;
        return (
          <Text
            key={`y-label-${index}`}
            font={font}
            x={10}
            y={yPoint}
            color={labelColor}
            text={`${tick}`}
          />
        );
      })}
    </>
  );
};
export default YAxisLabels;
