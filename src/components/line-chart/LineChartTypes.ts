import type {
  AnimatedProp,
  Color,
  DataSourceParam,
  SkFont,
  SkPath,
  SkiaMutableValue,
  SkiaValue
} from '@shopify/react-native-skia';
import type { ScaleLinear, ScalePoint } from 'd3';
import type { MutableRefObject } from 'react';
import type {
  ColorValue,
  LayoutChangeEvent,
  NativeScrollEvent,
  StyleProp,
  ViewStyle
} from 'react-native';
import type { PointDataType, SetWindowSizeArgsType, WindowSizeDataType } from '../tooltip';

export type LineChartDataType = {
  xAxis: {
    labels: string[];
  };
  yAxis: {
    datasets: number[];
  };
};

export type ScaledDataType = Array<{ x: number; y: number }>;

export interface CommonLineChartTypes {
  chartData: LineChartDataType;
  verticalLabel?: boolean;
  labelSize?: number;
  initialDistance?: number;
  verticalLabelHeight?: number;
  xAxisLength?: number;
  yAxisMin?: number;
  yAxisMax?: number;
}

export interface LineChartHookPropsType extends CommonLineChartTypes {
  chartFont: SkFont | null;
  yAxisLegend?: string;
}

export interface LineChartHookReturnType {
  canvasHeight: number;
  canvasWidth: number;
  onLayout: (event: LayoutChangeEvent) => void;
  lineAnimationState: SkiaMutableValue<number>;
  yAxisWidth: number;
  maxWidthXLabel: number;
  linePath: SkiaValue<SkPath>;
  canvasStyles: StyleProp<ViewStyle>;
  chartHeight: number;
  yScale: ScaleLinear<number, number, never>;
  xScale: ScalePoint<string>;
  canvasWidthHandler: number;
  chartYAxisWidthStyle: StyleProp<ViewStyle>;
  touchHandler: any;
  xForWindow: MutableRefObject<number>;
  xCoordinateForDataPoint: SkiaMutableValue<number>;
  yCoordinateForDataPoint: SkiaMutableValue<number>;
  pointData: PointDataType;
  windowSize: MutableRefObject<WindowSizeDataType>;
  setXForWindow: ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => void;
  setWindowSize: ({ nativeEvent }: SetWindowSizeArgsType) => void;
}

export interface LineChartPropsType extends CommonLineChartTypes {
  lineWidth?: AnimatedProp<number>;
  labelColor?: Color;
  showLines?: boolean;
  lineColor?: Color;
  labelFontFamily?: DataSourceParam;
  horizontalGridLineColor?: Color;
  chartBackgroundColor?: ColorValue;
  yAxisLegend?: string;
  xAxisLegend?: string;
  legendSize?: number;
  xLegendMarginTop?: number;
  xLegendMarginBottom?: number;
  yLegendMarginRight?: number;
  yLegendMarginLeft?: number;
  xLegendColor?: ColorValue;
  yLegendColor?: ColorValue;
  toolTipLabelFontSize?: number;
  toolTipColor?: string;
  toolTipDataColor?: string;
  circularPointerColor?: string;
  toolTipHorizontalPadding?: number;
  toolTipFadeOutDuration?: number;
  displayToolTip?: boolean;
}

export type LineChartYAxisProps = {
  chartBackgroundColor: ColorValue;
  canvasStyles: StyleProp<ViewStyle>;
  chartYAxisWidthStyle: StyleProp<ViewStyle>;
  children: React.ReactElement;
};

export type LineChartStylesType =
  | Partial<{
      chartBackgroundColor: ColorValue;
      xAxisLegendWidth: number;
    }>
  | undefined;
