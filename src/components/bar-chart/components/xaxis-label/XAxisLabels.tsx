import { Text } from '@shopify/react-native-skia';
import React from 'react';
import type { XAxisLabelsPropType } from './XAxisLabelsTypes';

const XAxisLabels = ({
  xAxisData,
  verticalLabel,
  font,
  xScale,
  yLabelMaxLength,
  barWidth,
  initialDistance,
  canvasHeight,
  labelColor,
  canvasHeightWithHorizontalLabel
}: XAxisLabelsPropType) => {
  return (
    <>
      {xAxisData.map((dataPoint, index) => {
        const { height, width } = font?.measureText(dataPoint);
        const xScaleWidth = (xScale(dataPoint) as number) + barWidth / 2 + initialDistance;
        const xPoint = verticalLabel
          ? xScaleWidth + yLabelMaxLength - width + height / 3
          : xScaleWidth + yLabelMaxLength - width / 2;
        const yOrigin = verticalLabel ? canvasHeight : canvasHeightWithHorizontalLabel;
        const xOrigin = verticalLabel ? xScaleWidth + yLabelMaxLength + height / 3 : xScaleWidth;
        const rotationDeg = verticalLabel ? -((Math.PI / 180) * 90) : 0;

        return (
          <Text
            key={index}
            font={font}
            x={xPoint}
            transform={[{ rotate: rotationDeg }]}
            origin={{
              y: yOrigin,
              x: xOrigin
            }}
            y={yOrigin}
            color={labelColor}
            text={dataPoint}
          />
        );
      })}
    </>
  );
};
export default XAxisLabels;
