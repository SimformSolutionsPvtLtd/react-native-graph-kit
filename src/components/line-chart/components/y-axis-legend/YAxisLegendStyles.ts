import { StyleSheet } from 'react-native';
import type { YAxisLegendStylesType } from './YAxisLegendTypes';
import { DEFAULT_LABEL_SIZE } from '../../../../constants';

const styles = (params: YAxisLegendStylesType = {}) => {
  const {
    labelSize = DEFAULT_LABEL_SIZE,
    legendSize,
    chartHeight,
    yLegendMarginLeft,
    yLegendMarginRight,
    yAxisLegendRotatedWidth,
    yLegendColor,
  } = params;

  return StyleSheet.create({
    yAxisLegendContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: (legendSize ?? labelSize) * 2,
      height: chartHeight,
      marginLeft: yLegendMarginLeft,
      marginRight: yLegendMarginRight,
    },
    yAxisLegendRotation: {
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
      width: yAxisLegendRotatedWidth,
    },
    yAxisLegendText: {
      color: yLegendColor,
      fontSize: legendSize ?? labelSize - 4,
    },
  });
};

export default styles;
