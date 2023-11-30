import { StyleSheet } from 'react-native';
import type { xLegendStylesType } from './XAxisLegendTypes';
import { DEFAULT_LABEL_SIZE } from '../../../../constants';

const styles = (params: xLegendStylesType = {}) => {
  const { labelSize = DEFAULT_LABEL_SIZE, xAxisLegendWidth, xLegendStyles } = params;

  return StyleSheet.create({
    xAxisLegendContainer: {
      alignSelf: 'flex-end',
      width: xAxisLegendWidth
    },
    xAxisLegendText: {
      alignSelf: 'center',
      textAlign: 'center',
      fontSize: xLegendStyles?.fontSize ?? labelSize - 2,
      ...xLegendStyles
    }
  });
};

export default styles;
