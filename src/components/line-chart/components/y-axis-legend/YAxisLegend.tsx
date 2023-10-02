import React from 'react';
import { Text, View } from 'react-native';
import type { YAxisLegendPropsType } from './YAxisLegendTypes';
import styles from './YAxisLegendStyles';
import { DEFAULT_LABEL_SIZE } from '../../../../constants';

/**
 * YAxisLegend component displays the legend on the Y-axis.
 *
 * @param {YAxisLegendPropsType} props - The component's props.
 * @param {number} props.labelSize - Font size for the label.
 * @param {number} props.legendSize - Font size for the legend.
 * @param {number} props.chartHeight - Height of the chart.
 * @param {string} props.yAxisLegend - The Y-axis legend text.
 * @param {string} props.yLegendColor - Color of the legend text.
 * @param {number} props.yLegendMarginRight - Margin right for the legend container.
 * @param {number} props.yLegendMarginLeft - Margin left for the legend container.
 * @returns {JSX.Element} The YAxisLegend component.
 */
const YAxisLegend = ({
  labelSize = DEFAULT_LABEL_SIZE,
  legendSize,
  chartHeight,
  yAxisLegend,
  yLegendColor,
  yLegendMarginRight,
  yLegendMarginLeft
}: YAxisLegendPropsType): JSX.Element => {
  const yAxisLegendRotatedWidth = yAxisLegend?.length * (legendSize ?? labelSize);

  // Check if there is Y-axis legend text to display
  if (yAxisLegend.length > 0) {
    return (
      <View
        style={
          styles({
            legendSize,
            labelSize,
            chartHeight,
            yLegendMarginLeft,
            yLegendMarginRight
          }).yAxisLegendContainer
        }
      >
        <View style={styles({ yAxisLegendRotatedWidth }).yAxisLegendRotation}>
          <Text style={styles({ labelSize, legendSize, yLegendColor }).yAxisLegendText}>
            {yAxisLegend}
          </Text>
        </View>
      </View>
    );
  }

  // If no Y-axis legend text is available, return an empty component
  return <></>;
};

export default YAxisLegend;
