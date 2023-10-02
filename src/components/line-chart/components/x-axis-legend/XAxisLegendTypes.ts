import type { ColorValue } from 'react-native';

export type XAxisLegendPropsType = {
  canvasWidth: number;
  yAxisWidth: number;
  labelSize: number;
  legendSize?: number;
  xAxisLegend: string;
  xLegendColor?: ColorValue;
  xLegendMarginTop?: number;
  xLegendMarginBottom?: number;
};

export type XAxisLegendStylesType =
  | Partial<{
      xAxisLegendWidth: number;
      xLegendColor: ColorValue;
      legendSize: number;
      labelSize: number;
      xLegendMarginTop: number;
      xLegendMarginBottom: number;
    }>
  | undefined;
