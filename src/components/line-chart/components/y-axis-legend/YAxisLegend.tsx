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
 * @param {number} props.chartHeight - Height of the chart.
 * @param {string} props.yAxisLegend - The Y-axis legend text.
 * @param {TextStyle} props.yLegendStyles - Styles object for YLegend
 * @returns {JSX.Element} The YAxisLegend component.
 */
const YAxisLegend = ({
  labelSize = DEFAULT_LABEL_SIZE,
  chartHeight,
  yAxisLegend,
  yLegendStyles
}: YAxisLegendPropsType): JSX.Element => {
  const yAxisLegendRotatedWidth = yAxisLegend?.length * (yLegendStyles?.fontSize ?? labelSize);

  // Check if there is Y-axis legend text to display
  if (yAxisLegend.length > 0) {
    return (
      <View
        style={
          styles({
            labelSize,
            chartHeight
          }).yAxisLegendContainer
        }
      >
        <View style={styles({ yAxisLegendRotatedWidth }).yAxisLegendRotation}>
          <Text style={styles({ labelSize, yLegendStyles }).yAxisLegendText}>{yAxisLegend}</Text>
        </View>
      </View>
    );
  }

  // If no Y-axis legend text is available, return an empty component
  return <></>;
};

export default YAxisLegend;
