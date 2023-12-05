import type { ScaleLinear, ScalePoint } from 'd3';

export interface YRefLinesProps {
  xAxisData: string[];
  barWidth: number;
  AXIS_POSITION_VALUE: number;
  lineHeight: number;
  canvasHeight: number;
  CHART_BOTTOM_MARGIN: number;
  horizontalGridLineColor: string;
  initialDistance: number;
  yLabelMaxLength: number;
  yScale: ScaleLinear<number, number>;
  xScale: ScalePoint<string>;
}
