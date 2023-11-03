import { StyleSheet } from 'react-native';
import type { LineChartStylesType } from './LineChartTypes';

const styles = (params: LineChartStylesType = {}) => {
  const { chartBackgroundColor } = params;

  return StyleSheet.create({
    chartBackgroundColor: {
      backgroundColor: chartBackgroundColor
    },
    fullHeightAndWidth: {
      flex: 1
    },
    chartContainer: {
      flex: 1,
      flexDirection: 'row'
    },
    chartScrollFlex: {
      flex: 1,
      backgroundColor: chartBackgroundColor
    }
  });
};

export default styles;
