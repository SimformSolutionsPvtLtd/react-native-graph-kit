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
 * The custom text input component
 * @param {BarChartProps} props - the props for the BarChart component
 * @returns {React.ReactElement} A React Element.
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
}: BarChartProps) => {
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
