import type { TextStyle } from 'react-native';

export type XAxisLegendPropsType = {
  canvasWidth: number;
  yAxisWidth: number;
  labelSize: number;
  xAxisLegend: string;
  xLegendStyles?: TextStyle;
};

export type xLegendStylesType =
  | Partial<{
      xAxisLegendWidth: number;
      labelSize: number;
      xLegendStyles?: TextStyle;
    }>
  | undefined;
