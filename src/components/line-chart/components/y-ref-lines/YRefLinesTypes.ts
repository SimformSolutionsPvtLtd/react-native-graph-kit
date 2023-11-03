import type { Color } from '@shopify/react-native-skia';
import type { ScaleLinear } from 'd3';

export type YRefLinePropsType = {
  canvasWidth: number;
  horizontalGridLineColor: Color;
  showLines: boolean;
  xAxisLength?: number;
  yScale: ScaleLinear<number, number>;
  canvasWidthHandler: number;
};
