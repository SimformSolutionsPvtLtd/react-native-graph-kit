import type { DataSource, SkiaValue } from '@shopify/react-native-skia';
import type { MutableRefObject } from 'react';

type WindowSizeDataType = {
  x: number;
  y: number;
};

type WindowSizeType = MutableRefObject<WindowSizeDataType>;

type PointDataType = {
  x: string;
  y: string;
};

interface ToolTipPropsType {
  yCoordinateForDataPoint: SkiaValue<number>;
  xCoordinateForDataPoint: SkiaValue<number>;
  pointData: PointDataType;
  labelFontFamily?: DataSource;
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
  labelFontFamily?: DataSource;
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
  WindowSizeDataType
};
