import type { Color, SkFont } from '@shopify/react-native-skia';
import type { ScaleLinear } from 'd3-scale';

export type YAxisLabelsPropsType = {
  yScale: ScaleLinear<number, number>;
  labelColor: Color;
  chartFont: SkFont | null;
};
