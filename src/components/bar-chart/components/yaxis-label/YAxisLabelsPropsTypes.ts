import type { SkFont } from '@shopify/react-native-skia';
import type { ScaleLinear } from 'd3';

export interface YAxisLabelsPropsType {
  font: SkFont;
  canvasHeight: number;
  axisPositionValue: number;
  labelColor: string;
  chartBottomMargin: number;
  yScale: ScaleLinear<number, number>;
}
