import type { TextStyle } from 'react-native';

export type YAxisLegendCommonTypes = Partial<{
  chartHeight: number;
  labelSize: number;
  yLegendStyles: TextStyle;
}>;

export type YAxisLegendPropsType = YAxisLegendCommonTypes & {
  yAxisLegend: string;
};

export type YLegendStylesType =
  | (YAxisLegendCommonTypes & {
      yAxisLegendRotatedWidth?: number;
    })
  | undefined;
