import type { ColorValue } from 'react-native';

export type YAxisLegendCommonTypes = Partial<{
  legendSize: number;
  chartHeight: number;
  labelSize: number;
  yLegendMarginRight?: number;
  yLegendMarginLeft?: number;
  yLegendColor?: ColorValue;
}>;

export type YAxisLegendPropsType = YAxisLegendCommonTypes & {
  yAxisLegend: string;
};

export type YAxisLegendStylesType =
  | (YAxisLegendCommonTypes & {
      yAxisLegendRotatedWidth?: number;
    })
  | undefined;
