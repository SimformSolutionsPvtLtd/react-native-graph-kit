import {
  listFontFamilies,
  matchFont,
  runTiming,
  SkFont,
  Skia,
  useComputedValue,
  useFont,
  useValue
} from '@shopify/react-native-skia';
import type { NumberValue } from 'd3';
import * as d3 from 'd3';
import { useEffect } from 'react';
import { Easing, Platform } from 'react-native';
import { chartWidth, horizontalScale, screenHeight } from '../../theme';
import type { BarChartHookPropType } from './BarChartTypes';

export default function useBarChart({
  chartData,
  chartHeight,
  yAxisMax,
  yAxisMin,
  labelFontFamily,
  barRadius,
  labelSize,
  barWidth,
  xAxisLength,
  initialDistance,
  verticalLabel,
  yAxisLegend,
  legendSize
}: BarChartHookPropType) {
  const chartBottomMargin = 14;
  const defaultFont = listFontFamilies();
  const fontFamily = Platform.select({
    ios: defaultFont?.[0],
    android: defaultFont?.[0],
    default: defaultFont?.[0]
  });
  const fontStyle = {
    fontFamily,
    fontSize: labelSize
  };
  const userAddedFont = useFont(labelFontFamily, labelSize);
  const font: SkFont | null = labelFontFamily ? userAddedFont : matchFont(fontStyle);
  const animationState = useValue(0);
  const canvasHeight = Math.min(screenHeight, chartHeight);
  const graphHeight = canvasHeight - 2 * chartBottomMargin;
  const axisPositionValue = 25;
  const initialSpace = 10;
  const xAxisData: string[] = chartData?.xAxis?.labels;
  const yAxisData: number[] = chartData?.yAxis?.datasets;

  const yMaxRange = Math.max(...yAxisData.map((number) => number));
  const getMaxWidthLabel: number = xAxisData.reduce((max: number, item) => {
    return Math.max(max, font ? font?.measureText(item).width : 0);
  }, 0);

  const getMaxHeightLabel = xAxisData.reduce((max: number, item) => {
    return Math.max(max, font ? font.measureText(item).height : 0);
  }, 0);

  const canvasHeightWithHorizontalLabel = Math.floor(
    canvasHeight + chartBottomMargin + getMaxHeightLabel
  );
  const canvasHeightWithVerticalLabel = Math.floor(
    canvasHeight + chartBottomMargin + getMaxWidthLabel
  );

  let yScale = d3
    .scaleLinear()
    .domain([
      yAxisMin ?? 0,
      (yAxisMax && yAxisMax + 20) ?? Math.max(...yAxisData.map((yDataPoint: number) => yDataPoint))
    ])
    .range([0, graphHeight]);

  const yTicks = yScale.ticks();
  const yTrimedArray = yTicks.map((element: number) => {
    return element.toString().replace('.', '');
  });

  const yLabelMaxLength = Math.max(...yTrimedArray.map((number) => String(number).length));

  const getMaxWidthForYAxis = yTrimedArray.reduce((max: number, item) => {
    return Math.max(max, (font as SkFont)?.measureText(item.toString()).width);
  }, 0);

  if (yMaxRange > yTicks[yTicks.length - 1]) {
    /* `yScale` is a D3 scale function that maps the input domain (y-axis data range) to the output
    range (graph height). It is used to determine the vertical position of each data point on the
    graph. */
    yScale = d3
      .scaleLinear()
      .domain([
        yAxisMin ?? 0,
        yAxisMax
          ? yAxisMax + 20
          : d3.max(yAxisData, (yDataPoint: number) => yDataPoint + (yTicks[1] - yTicks[0]))
      ] as Iterable<NumberValue>)
      .range([0, graphHeight]);
  }

  const xScaleBounds = [
    yLabelMaxLength,
    xAxisLength ? xAxisLength * xAxisData?.length : chartWidth
  ];

  const xScale = d3
    .scalePoint()
    .domain(xAxisData.map((d) => d?.toString()))
    .range(xScaleBounds)
    .align(0);

  useEffect(() => {
    animate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xAxisData, yAxisData]);

  const animate = () => {
    animationState.current = 0;
    runTiming(animationState, 1, {
      duration: 1500,
      easing: Easing.inOut(Easing.exp)
    });
  };

  const createPath = () => {
    const skiaPath = Skia.Path.Make();
    xAxisData?.forEach((dataPoint: string, index) => {
      const rect = Skia.XYWHRect(
        (xScale(dataPoint) as number) + yLabelMaxLength + initialDistance,
        graphHeight + axisPositionValue,
        barWidth,
        yScale(yAxisData[index] * animationState.current) * -1
      );
      const rRect = Skia.RRectXY(rect, barRadius, barRadius);
      skiaPath.addRRect(rRect);
    });
    return skiaPath;
  };

  const path = useComputedValue(createPath, [animationState, xAxisData]);

  const barChartHeight: number = verticalLabel
    ? canvasHeightWithVerticalLabel
    : canvasHeightWithHorizontalLabel + initialSpace;
  const barLegendHeight: number =
    canvasHeight - 2 * chartBottomMargin - yScale.ticks()[0] + axisPositionValue;
  const yLabelWidth: number = yAxisLegend?.length * legendSize;
  const canvasWidth: number = getMaxWidthForYAxis + horizontalScale(20);
  const barChartWidth: number = xAxisLength ? xAxisLength * (xAxisData?.length + 1) : chartWidth;
  const xLabelPaddingLeft: number =
    yAxisLegend?.length * legendSize - getMaxWidthForYAxis + horizontalScale(20);

  return {
    font,
    xScale,
    path,
    createPath,
    canvasHeightWithHorizontalLabel,
    initialSpace,
    canvasHeightWithVerticalLabel,
    getMaxWidthForYAxis,
    xAxisData,
    canvasHeight,
    chartBottomMargin,
    yScale,
    axisPositionValue,
    yLabelMaxLength,
    chartWidth,
    barChartHeight,
    barLegendHeight,
    yLabelWidth,
    canvasWidth,
    barChartWidth,
    xLabelPaddingLeft
  };
}
