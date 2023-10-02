import React from 'react';
import { Text, View } from 'react-native';
import styles from './XAxisLegendStyles';
import type { XAxisLegendPropsType } from './XAxisLegendTypes';

/**
 * XAxisLegend component renders the legend for the X-axis.
 *
 * @component
 * @param {XAxisLegendPropsType} props - The properties of the XAxisLegend component.
 * @param {number} props.canvasWidth - Width of the canvas.
 * @param {number} props.yAxisWidth - Width of the Y-axis.
 * @param {number} props.labelSize - Size of the axis labels.
 * @param {number} props.legendSize - Size of the legend text.
 * @param {string} props.xAxisLegend - Text to display as X-axis legend.
 * @param {string} props.xLegendColor - Color of the X-axis legend text.
 * @param {number} props.xLegendMarginTop - Top margin of the X-axis legend text.
 * @param {number} props.xLegendMarginBottom - Bottom margin of the X-axis legend text.
 * @returns {JSX.Element} XAxisLegend component.
 */
const XAxisLegend = ({
  canvasWidth,
  yAxisWidth,
  labelSize,
  legendSize,
  xAxisLegend,
  xLegendColor,
  xLegendMarginTop,
  xLegendMarginBottom,
}: XAxisLegendPropsType): JSX.Element => {
  const xAxisLegendWidth =
    canvasWidth - yAxisWidth * 10 - (legendSize ?? labelSize) * 2;

  // Render X-axis legend if it has content
  if (xAxisLegend.length > 0) {
    return (
      <View style={[styles({ xAxisLegendWidth }).xAxisLegendContainer]}>
        <Text
          numberOfLines={1}
          style={
            styles({
              xLegendColor,
              legendSize,
              labelSize,
              xLegendMarginTop,
              xLegendMarginBottom,
            }).xAxisLegendText
          }>
          {xAxisLegend}
        </Text>
      </View>
    );
  }

  // If X-axis legend is empty, return an empty fragment
  return <></>;
};

export default XAxisLegend;
