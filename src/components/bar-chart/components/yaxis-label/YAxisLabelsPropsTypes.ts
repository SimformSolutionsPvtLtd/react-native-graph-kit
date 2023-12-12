import type { SkFont } from '@shopify/react-native-skia';
import type { ScaleLinear } from 'd3-scale';

export interface YAxisLabelsPropsType {
  font: SkFont;
  canvasHeight: number;
  AXIS_POSITION_VALUE: number;
  labelColor: string;
  CHART_BOTTOM_MARGIN: number;
  yScale: ScaleLinear<number, number>;
}
