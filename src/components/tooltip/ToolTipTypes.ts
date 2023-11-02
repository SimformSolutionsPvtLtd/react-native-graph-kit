import type { DataSourceParam, SkiaValue } from '@shopify/react-native-skia';
import type { MutableRefObject } from 'react';
import type { LayoutRectangle } from 'react-native';

type WindowSizeDataType = {
  x: number;
  y: number;
};

type WindowSizeType = MutableRefObject<WindowSizeDataType>;

type PointDataType = {
  x: string;
  y: string;
};

type SetWindowSizeArgsType = {
  nativeEvent: {
    layout: LayoutRectangle;
  };
};

interface ToolTipPropsType {
  yCoordinateForDataPoint: SkiaValue<number>;
  xCoordinateForDataPoint: SkiaValue<number>;
  pointData: PointDataType;
  labelFontFamily?: DataSourceParam;
  xAxisLegend: string;
  yAxisLegend: string;
  windowSize: WindowSizeType;
  xForWindow: number;
  toolTipColor?: string;
  toolTipDataColor?: string;
  circularPointerColor?: string;
  toolTipLabelFontSize?: number;
  displayCircularPointer?: boolean;
  toolTipHorizontalPadding?: number;
  toolTipFadeOutDuration?: number;
}

interface UseToolTipPropsType {
  labelFontFamily?: DataSourceParam;
  xAxisLegend: string;
  yAxisLegend: string;
  pointData: PointDataType;
  xCoordinateForDataPoint: SkiaValue<number>;
  yCoordinateForDataPoint: SkiaValue<number>;
  xForWindow: number;
  windowSize: WindowSizeType;
  toolTipLabelFontSize?: number;
  toolTipHorizontalPadding?: number;
  toolTipFadeOutDuration?: number;
}

export type {
  ToolTipPropsType,
  WindowSizeType,
  UseToolTipPropsType,
  PointDataType,
  WindowSizeDataType,
  SetWindowSizeArgsType
};
