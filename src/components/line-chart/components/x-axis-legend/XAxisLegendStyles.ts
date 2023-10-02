import { StyleSheet } from 'react-native';
import type { XAxisLegendStylesType } from './XAxisLegendTypes';
import { DEFAULT_LABEL_SIZE } from '../../../../constants';

const styles = (params: XAxisLegendStylesType = {}) => {
  const {
    labelSize = DEFAULT_LABEL_SIZE,
    xAxisLegendWidth,
    xLegendColor,
    legendSize,
    xLegendMarginTop,
    xLegendMarginBottom
  } = params;

  return StyleSheet.create({
    xAxisLegendContainer: {
      alignSelf: 'flex-end',
      width: xAxisLegendWidth
    },
    xAxisLegendText: {
      alignSelf: 'center',
      textAlign: 'center',
      color: xLegendColor,
      fontSize: legendSize ?? labelSize - 4,
      paddingTop: xLegendMarginTop,
      paddingBottom: xLegendMarginBottom ?? 5
    }
  });
};

export default styles;
