import type { DataSource } from '@shopify/react-native-skia';

type ChartData = {
  xAxis: {
    labels: string[];
  };
  yAxis: {
    datasets: number[];
  };
};

type BarChartProps = {
  chartData: ChartData;
  xAxisLength: number;
  chartHeight?: number;
  barWidth?: number;
  barColor?: string;
  barRadius?: number;
  labelSize?: number;
  labelSelectedColor?: string;
  labelColor?: string;
  labelFontFamily?: DataSource;
  showLines?: boolean;
  lineHeight?: number;
  verticalLabel?: boolean;
  horizontalGridLineColor?: string;
  yAxisMax?: number;
  chartBackGroundColor?: string;
  initialDistance?: number;
  yAxisMin?: number;
  yAxisLegend?: string;
  xAxisLegend?: string;
  legendSize?: number;
  xLegendMarginTop?: number;
  xLegendMarginBottom?: number;
  yLegendMarginLeft?: number;
  yLegendMarginRight?: number;
  xLegendColor?: string;
  yLegendColor?: string;
  toolTipLabelFontSize?: number;
  toolTipColor?: string;
  toolTipDataColor?: string;
  circularPointerColor?: string;
  toolTipHorizontalPadding?: number;
  toolTipFadeOutDuration?: number;
  displayToolTip?: boolean;
};

interface BarChartHookPropType {
  chartData: ChartData;
  chartHeight: number;
  yAxisMax?: number;
  yAxisMin?: number;
  labelFontFamily?: DataSource;
  barRadius: number;
  labelSize: number;
  barWidth: number;
  xAxisLength: number;
  initialDistance: number;
  yAxisLegend: string;
  legendSize: number;
  verticalLabel: boolean;
}

interface BarChartStylePropType {
  barChartHeight: number;
  chartBackGroundColor: string;
  barLegendHeight: number;
  yLegendMarginRight: number;
  yLegendMarginLeft: number;
  yLabelWidth: number;
  legendSize: number;
  yLegendColor: string;
  canvasWidth: number;
  barChartWidth: number;
  xLabelPaddingLeft: number;
  xLegendMarginTop: number;
  xLegendMarginBottom: number;
  xLegendColor: string;
}

export { BarChartProps, ChartData, BarChartHookPropType, BarChartStylePropType };
