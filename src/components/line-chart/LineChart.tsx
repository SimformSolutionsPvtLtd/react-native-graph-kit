import {
  Canvas,
  Path,
  SkFont,
  listFontFamilies,
  matchFont,
  useFont
} from '@shopify/react-native-skia';
import React from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { DEFAULT_LABEL_SIZE } from '../../constants';
import { Colors } from '../../theme';
import styles from './LineChartStyles';
import type { LineChartPropsType, LineChartYAxisProps } from './LineChartTypes';
import { XAxisLabels, XAxisLegend, YAxisLabels, YAxisLegend, YRefLines } from './components';
import useLineChart from './useLineChart';
import { ToolTip } from '../tooltip';

/**
 * LineChartYAxisProps represents the props for the LineChartYAxis component.
 *
 * @component LineChartYAxis - Renders the Y Axis for the LineChart Component.
 * @property {string} chartBackgroundColor - The background color of the chart.
 * @property {object} canvasStyles - The styles for the chart canvas.
 * @property {object} chartYAxisWidthStyle - The styles for the chart Y-axis width.
 * @property {React.ReactNode} children - The child components to render within the chart.
 */
const LineChartYAxis = ({
  chartBackgroundColor,
  canvasStyles,
  chartYAxisWidthStyle,
  children
}: LineChartYAxisProps): JSX.Element => (
  <View style={[chartYAxisWidthStyle, styles({ chartBackgroundColor }).chartBackgroundColor]}>
    <Canvas style={canvasStyles}>{children}</Canvas>
  </View>
);

/**
 * LineChartPropsType represents the props for the LineChart component.
 *
 * @property {Array} chartData - The data for the chart.
 * @property {number} xAxisLength - The length of the X-axis.
 * @property {number} yAxisMin - The minimum value on the Y-axis.
 * @property {number} yAxisMax - The maximum value on the Y-axis.
 * @property {number} lineWidth - The line width.
 * @property {string} lineColor - The line color.
 * @property {number} labelSize - The font size for labels.
 * @property {string} labelColor - The color of labels.
 * @property {string} labelFontFamily - The font family for labels.
 * @property {number} initialDistance - The initial distance.
 * @property {number} verticalLabelHeight - The height of vertical labels.
 * @property {boolean} showLines - Whether to show grid lines.
 * @property {string} horizontalGridLineColor - The color of horizontal grid lines.
 * @property {string} chartBackgroundColor - The background color of the chart.
 * @property {boolean} verticalLabel - Whether to show vertical labels.
 * @property {number} legendSize - The font size of legends.
 * @property {string} yAxisLegend - The legend for the Y-axis.
 * @property {string} xAxisLegend - The legend for the X-axis.
 * @property {string} xLegendColor - The color of X-axis legend.
 * @property {string} yLegendColor - The color of Y-axis legend.
 * @property {number} xLegendMarginTop - The top margin for X-axis legend.
 * @property {number} xLegendMarginBottom - The bottom margin for X-axis legend.
 * @property {number} yLegendMarginRight - The right margin for Y-axis legend.
 * @property {number} yLegendMarginLeft - The left margin for Y-axis legend.
 * @returns The LineChart Component to display a chart in the available metrics of the view.
 */
const LineChart = ({
  chartData,
  xAxisLength,
  yAxisMin,
  yAxisMax,
  lineWidth = 2,
  lineColor = Colors.cherryRed,
  labelSize = DEFAULT_LABEL_SIZE,
  labelColor = Colors.black,
  labelFontFamily,
  initialDistance,
  verticalLabelHeight,
  showLines = true,
  horizontalGridLineColor = Colors.lightgrey,
  chartBackgroundColor = Colors.white,
  verticalLabel = false,
  legendSize,
  yAxisLegend = '',
  xAxisLegend = '',
  xLegendColor = Colors.grey,
  yLegendColor = Colors.grey,
  xLegendMarginTop,
  xLegendMarginBottom,
  yLegendMarginRight,
  yLegendMarginLeft,
  toolTipLabelFontSize,
  toolTipColor,
  toolTipDataColor,
  circularPointerColor,
  toolTipHorizontalPadding,
  toolTipFadeOutDuration,
  displayToolTip = false
}: LineChartPropsType) => {
  /**
   * Get the default font family from the available font families list.
   * @returns {string[]}
   */
  const defaultFont = listFontFamilies();

  /**
   * Select the appropriate font family based on the platform.
   * On iOS, Android, or any other platform, it defaults to the first font in the list.
   * @type {string}
   */
  const fontFamily: string = Platform.select<string>({
    ios: defaultFont?.[0],
    android: defaultFont?.[0],
    default: defaultFont?.[0]
  });

  /**
   * Create a fontStyle object with the selected fontFamily and fontSize.
   */
  const fontStyle = {
    fontFamily,
    fontSize: labelSize
  };

  /**
   * Get the user-added font family if available, or use the matched font based on the fontStyle.
   * @type {SkFont | null}
   */
  const userAddedFont: SkFont | null = useFont(labelFontFamily, labelSize);

  /**
   * The final chartFont will either be the user-added font or the matched font.
   * @type {SkFont | null}
   */
  const chartFont: SkFont | null = labelFontFamily ? userAddedFont : matchFont(fontStyle);

  const {
    canvasHeight,
    canvasWidth,
    onLayout,
    yAxisWidth,
    lineAnimationState,
    linePath,
    canvasStyles,
    chartHeight,
    yScale,
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
  } = useLineChart({
    chartData,
    verticalLabel,
    labelSize,
    initialDistance,
    chartFont,
    verticalLabelHeight,
    xAxisLength,
    yAxisMin,
    yAxisMax,
    yAxisLegend
  });

  return (
    <View
      style={[styles().fullHeightAndWidth, styles({ chartBackgroundColor }).chartBackgroundColor]}
    >
      <View style={styles().chartContainer} onLayout={onLayout}>
        <YAxisLegend
          {...{
            yAxisLegend,
            labelSize,
            legendSize,
            chartHeight,
            yLegendColor,
            yLegendMarginRight,
            yLegendMarginLeft
          }}
        />
        <LineChartYAxis
          {...{
            chartBackgroundColor,
            canvasStyles,
            chartYAxisWidthStyle
          }}
        >
          <YAxisLabels {...{ yScale, labelColor, chartFont }} />
        </LineChartYAxis>
        <View style={styles({ chartBackgroundColor }).chartScrollFlex}>
          <ScrollView
            bounces={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles().fullHeightAndWidth}
            onMomentumScrollEnd={setXForWindow}
            onScrollEndDrag={setXForWindow}
            onLayout={setWindowSize}
          >
            <Canvas style={canvasStyles} onTouch={displayToolTip ? touchHandler : undefined}>
              <YRefLines
                {...{
                  yScale,
                  showLines,
                  horizontalGridLineColor,
                  xAxisLength,
                  canvasWidth,
                  canvasWidthHandler
                }}
              />
              <XAxisLabels
                {...{
                  xScale,
                  chartFont,
                  labelColor,
                  labelSize,
                  verticalLabel,
                  canvasHeight,
                  chartHeight
                }}
              />
              <Path
                style="stroke"
                path={linePath}
                strokeWidth={lineWidth}
                strokeJoin="round"
                strokeCap="round"
                color={lineColor}
                start={0}
                end={lineAnimationState}
              />
              {displayToolTip && (
                <ToolTip
                  displayCircularPointer
                  xForWindow={xForWindow.current}
                  {...{
                    xCoordinateForDataPoint,
                    yCoordinateForDataPoint,
                    pointData,
                    labelFontFamily,
                    xAxisLegend,
                    yAxisLegend,
                    windowSize,
                    toolTipLabelFontSize,
                    toolTipColor,
                    toolTipDataColor,
                    circularPointerColor,
                    toolTipHorizontalPadding,
                    toolTipFadeOutDuration
                  }}
                />
              )}
            </Canvas>
          </ScrollView>
        </View>
      </View>
      <XAxisLegend
        {...{
          canvasWidth,
          yAxisWidth,
          labelSize,
          legendSize,
          xAxisLegend,
          xLegendColor,
          xLegendMarginTop,
          xLegendMarginBottom
        }}
      />
    </View>
  );
};

export default LineChart;
