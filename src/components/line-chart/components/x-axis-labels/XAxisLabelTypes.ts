import type { Color, SkFont } from '@shopify/react-native-skia';
import type { ScalePoint } from 'd3';

export type XAxisLabelsPropsType = {
  canvasHeight: number;
  chartFont: SkFont | null;
  chartHeight: number;
  labelColor: Color;
  labelSize: number;
  verticalLabel: boolean;
  xScale: ScalePoint<string>;
};
