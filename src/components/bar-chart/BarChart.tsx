import { Canvas, Path } from '@shopify/react-native-skia';
import React from 'react';
import { ScrollView, Text as RNText, View } from 'react-native';
import { Colors } from '../../theme';
import { styles } from './BarChartStyles';
import type { BarChartProps } from './BarChartTypes';
import { RenderHorizontalGridLines, XAxisLabels, YAxisLabels } from './components';
import useBarChart from './useBarChart';

const BarChart = ({
  chartData,
  xAxisLength = 50,
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
  xLegendMarginTop = 0,
  xLegendMarginBottom = 0,
  yLegendMarginLeft = 0,
  yLegendMarginRight = 0,
  xLegendColor = Colors.black,
  yLegendColor = Colors.black
}: BarChartProps) => {
  const {
    font,
    xScale,
    path,
    canvasHeightWithHorizontalLabel,
    xAxisData,
    canvasHeight,
    chartBottomMargin,
    yScale,
    axisPositionValue,
    yLabelMaxLength,
    barChartHeight,
    barLegendHeight,
    yLabelWidth,
    canvasWidth,
    barChartWidth,
    xLabelPaddingLeft
  } = useBarChart({
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
    yAxisLegend,
    legendSize,
    verticalLabel
  });

  if (font === null) {
    return <></>;
  }
  const style = styles({
    barChartHeight,
    chartBackGroundColor,
    barLegendHeight,
    yLegendMarginRight,
    yLegendMarginLeft,
    yLabelWidth,
    legendSize,
    yLegendColor,
    canvasWidth,
    barChartWidth,
    xLabelPaddingLeft,
    xLegendMarginTop,
    xLegendMarginBottom,
    xLegendColor
  });

  return (
    <>
      <View
        style={[style.barChartWrapper, style.flexRow, style.fullWidth, style.chartBackGroundColor]}
      >
        {yAxisLegend && (
          <View style={[style.container, style.yAxisLegendWrapper]}>
            <View style={style.yLabelWrapper}>
              <RNText style={style.yLegendTextStyle}>{yAxisLegend}</RNText>
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
                  axisPositionValue,
                  labelColor,
                  chartBottomMargin
                }}
              />
            </Canvas>
          </View>
          <ScrollView bounces={false} horizontal={true} showsHorizontalScrollIndicator={false}>
            <Canvas style={style.chartCanvasContainer}>
              {showLines && (
                <RenderHorizontalGridLines
                  {...{
                    xScale,
                    xAxisData,
                    barWidth,
                    yScale,
                    axisPositionValue,
                    lineHeight,
                    canvasHeight,
                    chartBottomMargin,
                    horizontalGridLineColor,
                    initialDistance,
                    yLabelMaxLength
                  }}
                />
              )}
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
            </Canvas>
          </ScrollView>
        </View>
      </View>
      <View style={[style.fullWidth, style.chartBackGroundColor]}>
        {xAxisLegend && (
          <View style={style.xAxisLabel}>
            <RNText numberOfLines={1} style={[style.alignCenter, style.xLegendText]}>
              {xAxisLegend}
            </RNText>
          </View>
        )}
      </View>
    </>
  );
};

export default BarChart;
