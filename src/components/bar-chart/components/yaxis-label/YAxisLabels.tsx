import { Text } from '@shopify/react-native-skia';
import React from 'react';
import type { YAxisLabelsPropsType } from './YAxisLabelsPropsTypes';

const YAxisLabels = ({
  yScale,
  font,
  canvasHeight,
  axisPositionValue,
  labelColor,
  chartBottomMargin
}: YAxisLabelsPropsType) => {
  return (
    <>
      {yScale.ticks().map((tick: number, index: number) => {
        const yPoint = canvasHeight - 2 * chartBottomMargin - yScale(tick) + axisPositionValue;
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
