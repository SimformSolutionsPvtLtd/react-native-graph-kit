import { Canvas, Path, SkFont, matchFont, useFont } from '@shopify/react-native-skia';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { DEFAULT_LABEL_SIZE } from '../../constants';
import { useDefaultFont } from '../../hooks';
import { Colors } from '../../theme';
import { Tooltip } from '../tooltip';
import styles from './LineChartStyles';
import type { LineChartPropsType, LineChartYAxisProps } from './LineChartTypes';
import { XAxisLabels, XAxisLegend, YAxisLabels, YAxisLegend, YRefLines } from './components';
import useLineChart from './useLineChart';

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
 * @property {ChartDataType} chartData - The data for the chart.
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
 * @property {string} yAxisLegend - The legend for the Y-axis.
 * @property {string} xAxisLegend - The legend for the X-axis.
 * @property {TextStyle} xLegendStyles - X Axis legend styles
 * @property {TextStyle} yLegendStyles - Y Axis legend styles
 * @property {boolean} showAnimation - Prop to handle the visibility of animation
 * @returns The LineChart Component to display a chart in the available metrics of the view.
 */
const LineChart = ({
  chartData = { xAxis: { labels: [] }, yAxis: { datasets: [] } },
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
  yAxisLegend = '',
  xAxisLegend = '',
  xLegendStyles = {},
  yLegendStyles = {},
  toolTipLabelFontSize,
  toolTipColor,
  toolTipDataColor,
  circularPointerColor,
  toolTipHorizontalPadding,
  toolTipFadeOutDuration,
  displayTooltip = false,
  showAnimation = true
}: LineChartPropsType) => {
  const { fontStyle } = useDefaultFont({ labelSize: labelSize });

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
    yAxisLegend,
    showAnimation
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
            chartHeight,
            yLegendStyles
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
            <Canvas style={canvasStyles} onTouch={displayTooltip ? touchHandler : undefined}>
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
              {displayTooltip && (
                <Tooltip
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
          xAxisLegend,
          xLegendStyles
        }}
      />
    </View>
  );
};

export default LineChart;
