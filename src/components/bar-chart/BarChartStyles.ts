import { StyleSheet } from 'react-native';
import type { BarChartStylePropType } from './BarChartTypes';

export const styles = ({
  barChartHeight,
  chartBackGroundColor,
  barLegendHeight,
  yLabelWidth,
  legendSize,
  canvasWidth,
  barChartWidth,
  xLabelMarginLeft
}: BarChartStylePropType) =>
  StyleSheet.create({
    flexRow: {
      flexDirection: 'row'
    },
    fullWidth: {
      width: '100%'
    },
    container: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden'
    },
    alignCenter: {
      alignSelf: 'center'
    },
    chartWrapper: {
      flex: 1,
      flexDirection: 'row'
    },
    yLabelWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
      width: yLabelWidth
    },
    xAxisLabel: {
      paddingLeft: xLabelMarginLeft
    },
    barChartWrapper: {
      height: barChartHeight
    },
    yAxisLegendWrapper: {
      height: barLegendHeight
    },
    yLegendTextStyle: {
      fontSize: legendSize
    },
    canvasWidth: {
      width: canvasWidth
    },
    chartCanvasContainer: {
      height: barChartHeight,
      width: barChartWidth
    },
    chartBackGroundColor: {
      backgroundColor: chartBackGroundColor
    },
    xLegendText: {
      fontSize: legendSize
    }
  });
