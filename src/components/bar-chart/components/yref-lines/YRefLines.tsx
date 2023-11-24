import { Rect } from '@shopify/react-native-skia';
import React from 'react';
import type { YRefLinesProps } from './YRefLinesTypes';

const YRefLines = ({
  xScale,
  xAxisData,
  barWidth,
  yScale,
  axisPositionValue,
  lineHeight,
  canvasHeight,
  chartBottomMargin,
  horizontalGridLineColor,
  initialDistance,
  yLabelMaxLength
}: YRefLinesProps) => {
  const startXPosition = xScale(xAxisData?.[0]);
  const endXPosition = xScale(xAxisData?.[xAxisData?.length - 1]);
  const startX: number = (startXPosition as number) + yLabelMaxLength + initialDistance;
  const endX: number = (endXPosition as number) + barWidth + initialDistance;

  return (
    <>
      {yScale.ticks().map((tick: number, index: number) => {
        const yPoint = canvasHeight - 2 * chartBottomMargin - yScale(tick) + axisPositionValue;
        return (
          <Rect
            key={`y-grid-${index}`}
            x={startX}
            y={yPoint}
            width={endX - startX + initialDistance}
            height={lineHeight}
            color={horizontalGridLineColor}
          />
        );
      })}
    </>
  );
};
export default YRefLines;
