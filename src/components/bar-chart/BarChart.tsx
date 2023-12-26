import { Canvas, Path } from '@shopify/react-native-skia';
import React from 'react';
import { ScrollView, Text as RNText, View } from 'react-native';
import { Colors } from '../../theme';
import { Tooltip } from '../tooltip';
import { styles } from './BarChartStyles';
import type { BarChartProps } from './BarChartTypes';
import { RenderHorizontalGridLines, XAxisLabels, YAxisLabels } from './components';
import useBarChart from './useBarChart';

/**
 * BarChart Component for displaying bar charts with customizable styling and features.
 *
 * @param {object} props - The properties of the BarChart Component.
 * @param {Array<object>} props.chartData - Data used to render the bar chart.
 * @param {number} [props.barGap=50] - Gap between bars.
 * @param {number} [props.chartHeight=500] - Height of the chart.
 * @param {number} [props.barWidth=20] - Width of each bar.
 * @param {string} [props.barColor=Colors.cherryRed] - Color of the bars.
 * @param {number} [props.barRadius=0] - Border radius of the bars.
 * @param {number} [props.labelSize=17] - Font size of labels.
 * @param {string} [props.labelColor=Colors.black] - Color of labels.
 * @param {string} [props.labelFontFamily] - Font family for labels.
 * @param {boolean} [props.showLines=true] - Whether to display grid lines.
 * @param {number} [props.lineHeight=2] - Height of grid lines.
 * @param {boolean} [props.verticalLabel=false] - Whether to display vertical labels.
 * @param {string} [props.horizontalGridLineColor=Colors.black] - Color of horizontal grid lines.
 * @param {number} [props.yAxisMax] - Maximum value for the y-axis.
 * @param {number} [props.yAxisMin] - Minimum value for the y-axis.
 * @param {number} [props.initialDistance=0] - Initial distance for the chart.
 * @param {string} [props.chartBackGroundColor=Colors.white] - Background color of the chart.
 * @param {string} [props.yAxisLegend] - Label for the y-axis.
 * @param {string} [props.xAxisLegend] - Label for the x-axis.
 * @param {number} [props.legendSize=15] - Font size of the legend.
 * @param {number} [props.toolTipLabelFontSize] - Font size of the tooltip labels.
 * @param {string} [props.toolTipColor] - Background color of the tooltip.
 * @param {string} [props.toolTipDataColor] - Color of the tooltip data.
 * @param {number} [props.toolTipHorizontalPadding] - Horizontal padding of the tooltip.
 * @param {number} [props.toolTipFadeOutDuration] - Tooltip fade-out duration.
 * @param {boolean} [props.displayTooltip=false] - Whether to display tooltips.
 * @param {boolean} [props.showAnimation=true] - Whether to show animation.
 * @param {object} [props.xLegendStyles] - Styles for x-axis legend.
 * @param {object} [props.yLegendStyles] - Styles for y-axis legend.
 * @returns {React.ReactElement} - The rendered BarChart component.
 */
const BarChart = ({
  chartData,
  barGap = 50,
  chartHeight = 500,
  barWidth = 20,
  barColor = Colors.cherryRed,
  barRadius = 0,
  labelSize = 17,
  labelColor = Colors.black,
  labelFontFamily,
  showLines = true,
  lineHeight = 2,
  verticalLabel = false,
  horizontalGridLineColor = Colors.black,
  yAxisMax,
  yAxisMin,
  initialDistance = 0,
  chartBackGroundColor = Colors.white,
  yAxisLegend = '',
  xAxisLegend = '',
  legendSize = 15,
  toolTipLabelFontSize,
  toolTipColor,
  toolTipDataColor,
  toolTipHorizontalPadding,
  toolTipFadeOutDuration,
  displayTooltip = false,
  showAnimation = true,
  xLegendStyles = {},
  yLegendStyles = {}
}: BarChartProps): React.ReactElement => {
  const {
    font,
    xScale,
    path,
    canvasHeightWithHorizontalLabel,
    xAxisData,
    canvasHeight,
    CHART_BOTTOM_MARGIN,
    yScale,
    AXIS_POSITION_VALUE,
    yLabelMaxLength,
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
  } = useBarChart({
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
    yAxisLegend,
    legendSize,
    verticalLabel,
    showAnimation,
    xLegendStyles,
    yLegendStyles
  });

  if (font === null) {
    return <></>;
  }
  const style = styles({
    barChartHeight,
    chartBackGroundColor,
    barLegendHeight,
    yLabelWidth,
    legendSize,
    canvasWidth,
    barChartWidth,
    xLabelPaddingLeft,
    xLabelMarginLeft
  });

  return (
    <>
      <View
        style={[style.barChartWrapper, style.flexRow, style.fullWidth, style.chartBackGroundColor]}
      >
        {yAxisLegend && (
          <View style={[style.container, style.yAxisLegendWrapper]}>
            <View style={style.yLabelWrapper}>
              <RNText style={[style.yLegendTextStyle, yAxisLegendStyles]}>{yAxisLegend}</RNText>
            </View>
          </View>
        )}
        <View style={style.chartWrapper}>
          <View style={style.canvasWidth}>
            <Canvas style={style.barChartWrapper}>
              <YAxisLabels
                {...{
                  yScale,
                  font,
                  canvasHeight,
                  AXIS_POSITION_VALUE,
                  labelColor,
                  CHART_BOTTOM_MARGIN
                }}
              />
            </Canvas>
          </View>
          <ScrollView
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={setXForWindow}
            onScrollEndDrag={setXForWindow}
            onLayout={setWindowSize}
          >
            <Canvas
              style={style.chartCanvasContainer}
              onTouch={displayTooltip ? touchHandler : undefined}
            >
              {showLines && (
                <RenderHorizontalGridLines
                  {...{
                    xScale,
                    xAxisData,
                    barWidth,
                    yScale,
                    AXIS_POSITION_VALUE,
                    lineHeight,
                    canvasHeight,
                    CHART_BOTTOM_MARGIN,
                    horizontalGridLineColor,
                    initialDistance,
                    yLabelMaxLength
                  }}
                />
              )}
              <Path path={radiusPath} color={barColor} />
              <Path path={path} color={barColor} />
              <XAxisLabels
                {...{
                  xAxisData,
                  verticalLabel,
                  font,
                  xScale,
                  yLabelMaxLength,
                  barWidth,
                  initialDistance,
                  canvasHeight,
                  labelColor,
                  canvasHeightWithHorizontalLabel
                }}
              />
              {displayTooltip && (
                <Tooltip
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
                    toolTipHorizontalPadding,
                    toolTipFadeOutDuration
                  }}
                />
              )}
            </Canvas>
          </ScrollView>
        </View>
      </View>
      <View style={[style.fullWidth, style.chartBackGroundColor]}>
        {xAxisLegend && (
          <View style={style.xAxisLabel}>
            <RNText
              numberOfLines={1}
              style={[style.alignCenter, style.xLegendText, xAxisLegendStyles]}
            >
              {xAxisLegend}
            </RNText>
          </View>
        )}
      </View>
    </>
  );
};

export default BarChart;
