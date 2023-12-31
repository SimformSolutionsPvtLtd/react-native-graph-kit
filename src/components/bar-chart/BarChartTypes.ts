import type { DataSource } from '@shopify/react-native-skia';
import type { TextStyle } from 'react-native';

type ChartDataType = {
  xAxis: {
    labels: string[];
  };
  yAxis: {
    datasets: number[];
  };
};

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

type BarChartProps = {
  chartData: ChartDataType;
  barGap?: Range<0, 999>;
  chartHeight?: Range<0, 999>;
  barWidth?: Range<0, 200>;
  barColor?: string;
  barRadius?: Range<0, 200>;
  labelSize?: Range<0, 50>;
  labelSelectedColor?: string;
  labelColor?: string;
  labelFontFamily?: DataSource;
  showLines?: boolean;
  lineHeight?: Range<0, 4>;
  verticalLabel?: boolean;
  horizontalGridLineColor?: string;
  yAxisMax?: number;
  chartBackGroundColor?: string;
  initialDistance?: Range<0, 150>;
  yAxisMin?: number;
  yAxisLegend?: string;
  xAxisLegend?: string;
  legendSize?: number;
  toolTipLabelFontSize?: number;
  toolTipColor?: string;
  toolTipDataColor?: string;
  toolTipHorizontalPadding?: number;
  toolTipFadeOutDuration?: number;
  displayTooltip?: boolean;
  showAnimation?: boolean;
  xLegendStyles?: TextStyle;
  yLegendStyles?: TextStyle;
};

interface BarChartHookPropType {
  chartData: ChartDataType;
  chartHeight: Range<0, 999>;
  yAxisMax?: number;
  yAxisMin?: number;
  labelFontFamily?: DataSource;
  barRadius: number;
  labelSize: Range<0, 50>;
  barWidth: number;
  barGap: Range<0, 999>;
  initialDistance: Range<0, 150>;
  yAxisLegend: string;
  legendSize: number;
  verticalLabel: boolean;
  showAnimation?: boolean;
  yLegendStyles: TextStyle;
  xLegendStyles: TextStyle;
}

interface BarChartStylePropType {
  barChartHeight: number;
  chartBackGroundColor: string;
  barLegendHeight: number;
  yLabelWidth: number;
  legendSize: number;
  canvasWidth: number;
  barChartWidth: number;
  xLabelPaddingLeft: number;
  xLabelMarginLeft: number;
}

export { BarChartProps, ChartDataType, BarChartHookPropType, BarChartStylePropType };
