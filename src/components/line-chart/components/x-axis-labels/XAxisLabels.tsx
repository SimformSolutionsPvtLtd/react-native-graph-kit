import { Group, Text } from '@shopify/react-native-skia';
import React from 'react';
import { Y_AXIS_LABEL_HORIZONTAL_GAP } from '../../../../constants';
import type { XAxisLabelsPropsType } from './XAxisLabelTypes';

/**
 * Component to render X-axis labels.
 *
 * @param {XAxisLabelsPropsType} props - The component's props.
 * @param {number} props.canvasHeight - Height of the canvas.
 * @param {number} props.chartFont - The font to display for labels.
 * @param {string} props.chartHeight - The height of the chart to be displayed.
 * @param {number} props.labelColor - Color of the axis labels.
 * @param {number} props.labelSize - Size of the axis labels.
 * @param {string} props.verticalLabel - Prop to handle text rotation.
 * @param {number} props.xScale - The scaled data of the labels.
 * @returns {JSX.Element} - The rendered X-axis labels.
 */
const XAxisLabels = ({
  canvasHeight,
  chartFont,
  chartHeight,
  labelColor,
  labelSize,
  verticalLabel,
  xScale
}: XAxisLabelsPropsType): JSX.Element => (
  <Group>
    {xScale.domain().map((label: string, idx: number) => {
      // Measure the label's length for horizontal positioning
      const labelLength = chartFont?.measureText(label);
      // Calculate x and y positions based on label and orientation
      const xPosition =
        (xScale(label) ?? 0) -
        (verticalLabel
          ? labelLength?.width! + Y_AXIS_LABEL_HORIZONTAL_GAP
          : label.length * (labelSize / 4));
      const yPosition = verticalLabel ? chartHeight : canvasHeight - labelSize / 2;

      return (
        <Text
          key={label + idx}
          font={chartFont}
          color={labelColor}
          x={xPosition}
          y={yPosition}
          text={label}
          transform={[{ rotate: verticalLabel ? -((Math.PI / 180) * 90) : 0 }]}
          origin={{
            y: verticalLabel ? chartHeight - labelSize / 10 : chartHeight,
            x: xScale(label)!
          }}
        />
      );
    })}
  </Group>
);

export default XAxisLabels;
