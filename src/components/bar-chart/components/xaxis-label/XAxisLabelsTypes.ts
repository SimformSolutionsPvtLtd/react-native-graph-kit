import type { SkFont } from '@shopify/react-native-skia';
import type { ScalePoint } from 'd3-scale';

export interface XAxisLabelsPropType {
  xAxisData: string[];
  verticalLabel: boolean;
  font: SkFont;
  yLabelMaxLength: number;
  barWidth: number;
  initialDistance: number;
  canvasHeight: number;
  labelColor: string;
  canvasHeightWithHorizontalLabel: number;
  xScale: ScalePoint<string>;
}
