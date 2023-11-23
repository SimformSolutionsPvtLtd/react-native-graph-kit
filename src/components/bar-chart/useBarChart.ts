import {
  SkFont,
  Skia,
  matchFont,
  runTiming,
  useComputedValue,
  useFont,
  useTouchHandler,
  useValue
} from '@shopify/react-native-skia';
import type { NumberValue } from 'd3';
import * as d3 from 'd3';
import { useEffect } from 'react';
import { Easing } from 'react-native';
import { useDefaultFont } from '../../hooks';
import { chartWidth, Colors, horizontalScale, screenHeight } from '../../theme';
import type { BarChartHookPropType } from './BarChartTypes';
import { useToolTipUtils } from '../tooltip';
import { BARGRAPH_TOOLTIP_HITSLOP } from '../../constants';

export default function useBarChart({
  chartData,
  chartHeight,
  yAxisMax,
  yAxisMin,
  labelFontFamily,
  barRadius,
  labelSize,
  barWidth,
  barGap,
  initialDistance,
  verticalLabel,
  yAxisLegend,
  legendSize,
  showAnimation,
  xLegendStyles,
  yLegendStyles
}: BarChartHookPropType) {
  const chartBottomMargin = 14;
  const { fontStyle } = useDefaultFont({ labelSize });
  const userAddedFont = useFont(labelFontFamily, labelSize);
  const font: SkFont | null = labelFontFamily ? userAddedFont : matchFont(fontStyle);
  const animationState = useValue(0);
  const canvasHeight = Math.min(screenHeight, chartHeight);
  const graphHeight = canvasHeight - 2 * chartBottomMargin;
  const axisPositionValue = 25;
  const initialSpace = 10;
  const xAxisData: string[] = chartData?.xAxis?.labels;
  const yAxisData: number[] = chartData?.yAxis?.datasets;
  const {
    windowSize,
    xForWindow,
    pointData,
    setPointData,
    xCoordinateForDataPoint,
    yCoordinateForDataPoint,
    setXForWindow,
    setWindowSize
  } = useToolTipUtils();

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
      (yAxisMax && yAxisMax) ?? Math.max(...yAxisData.map((yDataPoint: number) => yDataPoint))
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

  const checkXWidth = () => {
    const calculateXAxisWidth = barGap * xAxisData?.length + initialDistance;
    //TODO: find out an optimal solution to rectify the static value 2730 which is the max supported canvas width
    return calculateXAxisWidth > 2730 ? 2730 : barGap * xAxisData?.length;
  };

  const xScaleBounds = [yLabelMaxLength, barGap ? checkXWidth() - barWidth * 2 : chartWidth];

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
      duration: showAnimation ? 1500 : 0,
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

  const createRadius = () => {
    const radiusPath = Skia.Path.Make();

    xAxisData?.forEach((dataPoint: string, index) => {
      const rect = Skia.XYWHRect(
        (xScale(dataPoint) as number) + yLabelMaxLength + initialDistance,
        graphHeight + axisPositionValue,
        barWidth,
        (yScale(yAxisData[index] * animationState.current) * -1) / 2
      );
      const rRect = Skia.RRectXY(rect, 0, 0);
      radiusPath.addRRect(rRect);
    });
    return radiusPath;
  };

  const barChartHeight: number = verticalLabel
    ? canvasHeightWithVerticalLabel
    : canvasHeightWithHorizontalLabel + initialSpace;
  const barLegendHeight: number =
    canvasHeight - 2 * chartBottomMargin - yScale.ticks()[0] + axisPositionValue;
  const yLabelWidth: number = yAxisLegend?.length * legendSize;
  const canvasWidth: number = getMaxWidthForYAxis + horizontalScale(20);
  const barChartWidth: number = barGap ? checkXWidth() : chartWidth;
  const xLabelPaddingLeft: number =
    yAxisLegend?.length * legendSize - getMaxWidthForYAxis + horizontalScale(20);
  const xLabelMarginLeft: number = getMaxWidthForYAxis + canvasWidth;

  const touchHandler = useTouchHandler(
    {
      onStart: ({ x }) => {
        xAxisData.forEach((dataPoint, index) => {
          const xForPlottedXLabel =
            (xScale(dataPoint) as number) + yLabelMaxLength + initialDistance;

          if (
            x < xForPlottedXLabel + barWidth + BARGRAPH_TOOLTIP_HITSLOP &&
            x > xForPlottedXLabel - BARGRAPH_TOOLTIP_HITSLOP
          ) {
            setPointData({
              x: dataPoint,
              y: yAxisData[index].toString()
            });

            xCoordinateForDataPoint.current =
              (xScale(dataPoint) as number) + (yLabelMaxLength + initialDistance) + barWidth / 2;
            yCoordinateForDataPoint.current =
              windowSize.current.y -
              (windowSize.current.y - (graphHeight + axisPositionValue)) -
              yScale(yAxisData[index] * animationState.current);
          }
        });
      }
    },
    [
      animationState,
      xAxisData,
      chartHeight,
      barWidth,
      yAxisMin,
      yAxisMax,
      barGap,
      barRadius,
      initialDistance
    ]
  );

  const path = useComputedValue(createPath, [
    animationState,
    xAxisData,
    chartHeight,
    barWidth,
    yAxisMin,
    yAxisMax,
    barGap,
    barRadius,
    initialDistance
  ]);

  const radiusPath = useComputedValue(createRadius, [
    animationState,
    xAxisData,
    chartHeight,
    barWidth,
    yAxisMin,
    yAxisMax,
    barGap,
    barRadius,
    initialDistance
  ]);

  const xAxisLegendStyles = {
    marginTop: xLegendStyles['marginTop'] ?? 0,
    marginBottom: xLegendStyles['marginBottom'] ?? 0,
    borderWidth: xLegendStyles['borderWidth'] ?? 0,
    borderColor: xLegendStyles['borderColor'] ?? Colors.black,
    marginRight: xLegendStyles['marginRight'] ?? 0,
    marginLeft: xLegendStyles['marginLeft'] ?? 0,
    color: xLegendStyles['color'] ?? Colors.black,
    fontWeight: xLegendStyles['fontWeight'] ?? '300',
    fontFamily: xLegendStyles['fontFamily'] ?? undefined
  };

  const yAxisLegendStyles = {
    marginTop: yLegendStyles['marginTop'] ?? 0,
    marginBottom: yLegendStyles['marginBottom'] ?? 0,
    borderWidth: yLegendStyles['borderWidth'] ?? 0,
    borderColor: yLegendStyles['borderColor'] ?? Colors.black,
    marginRight: yLegendStyles['marginRight'] ?? 0,
    marginLeft: yLegendStyles['marginLeft'] ?? 0,
    color: yLegendStyles['color'] ?? Colors.black,
    fontWeight: yLegendStyles['fontWeight'] ?? '300',
    fontFamily: yLegendStyles['fontFamily'] ?? undefined
  };

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
    xLabelPaddingLeft,
    touchHandler,
    xForWindow,
    xCoordinateForDataPoint,
    yCoordinateForDataPoint,
    pointData,
    windowSize,
    setXForWindow,
    setWindowSize,
    xLabelMarginLeft,
    yAxisLegendStyles,
    xAxisLegendStyles,
    radiusPath
  };
}
