import type { ScaleLinear, ScalePoint } from 'd3';

export interface YRefLinesProps {
  xAxisData: string[];
  barWidth: number;
  axisPositionValue: number;
  lineHeight: number;
  canvasHeight: number;
  chartBottomMargin: number;
  horizontalGridLineColor: string;
  initialDistance: number;
  yLabelMaxLength: number;
  yScale: ScaleLinear<number, number>;
  xScale: ScalePoint<string>;
}
