import {
  SkPath,
  SkiaMutableValue,
  SkiaValue,
  runTiming,
  useComputedValue,
  useTouchHandler,
  useValue
} from '@shopify/react-native-skia';
import { scaleLinear, scalePoint, type ScaleLinear, type ScalePoint } from 'd3';
import React, { useCallback, useEffect, useState } from 'react';
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native';
import {
  CHART_X_LABEL_HEIGHT_RECTIFIER,
  DEFAULT_LABEL_SIZE,
  LINE_ANIMATION_TIME,
  X_AXIS_LABEL_WIDTH_RECTIFIER,
  Y_AXIS_LABEL_HORIZONTAL_GAP,
  Y_AXIS_LEGEND_FALSE_VALUE,
  Y_AXIS_LEGEND_TRUE_VALUE
} from '../../constants';
import {
  calculateCanvasWidth,
  calculateMaxWidthLabel,
  findMaxNumber,
  generateLinePath
} from '../../utils';
import type {
  LineChartHookPropsType,
  LineChartHookReturnType,
  ScaledDataType
} from './LineChartTypes';
import { useToolTipUtils } from '../tooltip';

/**
 * Reference to handle the line animation.
 * @type {React.MutableRefObject<boolean | null>}
 */
const isLineAnimationRunning: React.MutableRefObject<boolean | null> = React.createRef<boolean>();

/**
 * Custom hook for creating a line chart.
 * @param {LineChartHookPropsType} props - The properties for the line chart.
 * @returns {LineChartHookReturnType} An object containing various chart-related properties and functions.
 */
const useLineChart = ({
  chartData,
  verticalLabel,
  labelSize = DEFAULT_LABEL_SIZE,
  initialDistance,
  chartFont,
  verticalLabelHeight,
  xAxisLength,
  yAxisMin,
  yAxisMax,
  yAxisLegend
}: LineChartHookPropsType): LineChartHookReturnType => {
  const data = chartData.yAxis.datasets;
  const maxYAxisNumberValue = findMaxNumber(data);
  const yAxisWidth = maxYAxisNumberValue.toString().length ?? 0;

  const [canvasWidth, setCanvasWidth] = useState<number>(0);
  const [canvasHeight, setCanvasHeight] = useState<number>(0);

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

  /**
   * Value to manipulate the line drawing path.
   * @type {SkiaMutableValue<number>}
   */
  const lineAnimationState: SkiaMutableValue<number> = useValue(0);

  /**
   * Calculates the maximum width of X-axis labels.
   * @type {number}
   */
  const maxWidthXLabel: number = calculateMaxWidthLabel(chartData.xAxis.labels, chartFont);

  /**
   * Function to handle the layout event.
   * @param {LayoutChangeEvent} event - The layout change event.
   */
  const onLayout = useCallback(
    ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
      setCanvasWidth(Math.round(layout.width));
      setCanvasHeight(Math.round(layout.height));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /**
   * Function to animate the line.
   */
  const animateLine = () => {
    lineAnimationState.current = 0;
    runTiming(lineAnimationState, 1, { duration: LINE_ANIMATION_TIME }, () => {
      isLineAnimationRunning.current = false;
    });
  };

  // Trigger the animation when the component mounts.
  useEffect(() => {
    isLineAnimationRunning.current = false;
    let lineAnimationTimeout: NodeJS.Timeout;

    if (!isLineAnimationRunning.current) {
      lineAnimationState.current = 0;
      isLineAnimationRunning.current = true;
      lineAnimationTimeout = setTimeout(animateLine, 0);
    }

    // Clearing out the timeout.
    return () => {
      lineAnimationTimeout && clearTimeout(lineAnimationTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /**
   * Calculates the canvas width.
   * @type {number}
   */
  const canvasWidthHandler: number = calculateCanvasWidth(
    xAxisLength,
    initialDistance,
    data.length
  );

  /**
   * Calculates the height of the chart.
   * @type {number}
   */
  const chartHeight: number = verticalLabel
    ? canvasHeight - (verticalLabelHeight ? verticalLabelHeight : maxWidthXLabel)
    : canvasHeight - labelSize * CHART_X_LABEL_HEIGHT_RECTIFIER;

  /**
   * Value to handle the width fo the Graph when Y-Axis-Legend is Passed
   */
  const labelLengthValueMultiplier = yAxisLegend
    ? Y_AXIS_LEGEND_TRUE_VALUE
    : Y_AXIS_LEGEND_FALSE_VALUE;

  /**
   * Defines the bounds for the x-scale.
   * @type {[number, number]}
   */
  const xScaleBounds: [number, number] = [
    initialDistance ?? findMaxNumber(data).toString().length + Y_AXIS_LABEL_HORIZONTAL_GAP,
    xAxisLength
      ? canvasWidthHandler - (initialDistance ?? 0)
      : canvasWidth -
        yAxisWidth * X_AXIS_LABEL_WIDTH_RECTIFIER -
        labelSize * 1.1 * labelLengthValueMultiplier
  ];

  /**
   * Defines the bounds for the y-scale.
   * @type {[number, number]}
   */
  const yScaleBounds: [number, number] = [chartHeight, labelSize * 1.5];

  /**
   * Defines the domain for the y-scale.
   * @type {[number, number]}
   */
  const yScaleDomain: [number, number] = [yAxisMin ?? 0, yAxisMax ?? Math.max(...data)];

  /**
   * Creates the y-scale.
   * @type {ScaleLinear<number, number, never>}
   */
  const yScale: ScaleLinear<number, number, never> = scaleLinear()
    .domain(yScaleDomain)
    .range(yScaleBounds);

  /**
   * Creates the x-scale.
   * @type {ScalePoint<string>}
   */
  const xScale: ScalePoint<string> = scalePoint()
    .domain(chartData.xAxis.labels?.map((d) => d))
    .range(xScaleBounds)
    .align(0);

  /**
   * Scales the chart data for plotting graph.
   * @type {ScaledDataType}
   */
  const scaledData: ScaledDataType = chartData.xAxis.labels.map((x, index) => ({
    x: xScale(x) ?? 0,
    y: yScale(data[index])
  }));

  /**
   * Defines styles for the canvas.
   * @type {StyleProp<ViewStyle>}
   */
  const canvasStyles: StyleProp<ViewStyle> = {
    width: xAxisLength
      ? canvasWidthHandler
      : canvasWidth - yAxisWidth * 10 - labelSize * (yAxisLegend ? 3 : 0.5),
    height: canvasHeight
  };

  /**
   * Defines styles for the y-axis width.
   * @type {StyleProp<ViewStyle> }
   */
  const chartYAxisWidthStyle: StyleProp<ViewStyle> = {
    width: (yAxisWidth * labelSize) / 1.7
  };

  /**
   * Generates the line path using computed values.
   * @type {SkiaValue<SkPath>}
   */
  const linePath: SkiaValue<SkPath> = useComputedValue(
    () => generateLinePath(scaledData),
    [scaledData]
  );

  const touchHandler = useTouchHandler(
    {
      onStart: ({ x }) => {
        const closestX = xScale.domain().reduce((prev, curr) => {
          return Math.abs((xScale(curr) as number) - x) < Math.abs((xScale(prev) as number) - x)
            ? curr
            : prev;
        });
        const findYValueForX = (targetX: string) => {
          const xValueIndex = chartData?.xAxis?.labels?.findIndex((e) => e == targetX?.toString());
          return chartData?.yAxis?.datasets?.[xValueIndex]; // Return 0 if the value of x is not found in the array.
        };

        const closestY = findYValueForX(closestX);
        // Set X and Y coordinates of the closest data point on chart
        xScale.domain().forEach((item) => {
          if (item === closestX) {
            xCoordinateForDataPoint.current = xScale(item) as number;
          }
        });
        yCoordinateForDataPoint.current = yScale(closestY);

        setPointData({
          x: closestX,
          y: closestY?.toString()
        });
      }
    },
    [xScaleBounds]
  );

  return {
    canvasHeight,
    canvasWidth,
    onLayout,
    lineAnimationState,
    yAxisWidth,
    maxWidthXLabel,
    linePath,
    canvasStyles,
    chartHeight,
    yScale,
    xScaleBounds,
    xScale,
    canvasWidthHandler,
    chartYAxisWidthStyle,
    touchHandler,
    xForWindow,
    xCoordinateForDataPoint,
    yCoordinateForDataPoint,
    pointData,
    windowSize,
    setXForWindow,
    setWindowSize
  };
};

export default useLineChart;
