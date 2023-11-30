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
 * @param {string} props.xAxisLegend - Text to display as X-axis legend.
 * @param {TextStyle} props.xLegendStyles - Styles object for XLegend
 * @returns {JSX.Element} XAxisLegend component.
 */
const XAxisLegend = ({
  canvasWidth,
  yAxisWidth,
  labelSize,
  xAxisLegend,
  xLegendStyles
}: XAxisLegendPropsType): JSX.Element => {
  const xAxisLegendWidth =
    canvasWidth - yAxisWidth * 10 - (xLegendStyles?.fontSize ?? labelSize) * 2;

  // Render X-axis legend if it has content
  if (xAxisLegend.length > 0) {
    return (
      <View style={[styles({ xAxisLegendWidth }).xAxisLegendContainer]}>
        <Text
          numberOfLines={1}
          style={
            styles({
              labelSize,
              xLegendStyles
            }).xAxisLegendText
          }
        >
          {xAxisLegend}
        </Text>
      </View>
    );
  }

  // If X-axis legend is empty, return an empty fragment
  return <></>;
};

export default XAxisLegend;
