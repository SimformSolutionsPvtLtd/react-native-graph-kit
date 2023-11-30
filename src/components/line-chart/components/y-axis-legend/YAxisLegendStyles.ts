import { StyleSheet } from 'react-native';
import type { YLegendStylesType } from './YAxisLegendTypes';
import { DEFAULT_LABEL_SIZE } from '../../../../constants';

const styles = (params: YLegendStylesType = {}) => {
  const {
    labelSize = DEFAULT_LABEL_SIZE,
    chartHeight,
    yAxisLegendRotatedWidth,
    yLegendStyles
  } = params;

  return StyleSheet.create({
    yAxisLegendContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: (yLegendStyles?.fontSize ?? labelSize) * 2,
      height: chartHeight,
      marginLeft: yLegendStyles?.marginLeft,
      marginRight: yLegendStyles?.marginRight
    },
    yAxisLegendRotation: {
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ rotate: '-90deg' }],
      width: yAxisLegendRotatedWidth
    },
    yAxisLegendText: {
      fontSize: yLegendStyles?.fontSize ?? labelSize - 2,
      ...yLegendStyles
    }
  });
};

export default styles;
