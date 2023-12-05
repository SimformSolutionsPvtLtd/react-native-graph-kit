import { Circle, Group, Path, RoundedRect, Text } from '@shopify/react-native-skia';
import React from 'react';
import { Colors } from '../../theme';
import type { TooltipPropsType } from './ToolTipTypes';
import useTooltip from './useToolTip';
import {
  TOOLTIP_BORDER_RADIUS_RECTIFIER,
  TOOLTIP_DATA_POINT_CIRCLE_RECTIFIER
} from '../../constants';

const Tooltip = ({
  xCoordinateForDataPoint,
  yCoordinateForDataPoint,
  pointData,
  labelFontFamily,
  xAxisLegend,
  yAxisLegend,
  windowSize,
  xForWindow,
  toolTipLabelFontSize,
  toolTipColor = Colors.red,
  toolTipDataColor = Colors.white,
  circularPointerColor = Colors.black,
  displayCircularPointer = false,
  toolTipHorizontalPadding,
  toolTipFadeOutDuration
}: TooltipPropsType) => {
  const {
    font,
    xCordForRoundedRect,
    yCordForRoundedRect,
    tooltipWidth,
    xCordForTopText,
    path,
    yCordForTopText,
    xCordForBottomText,
    yCordForBottomText,
    tooltipHeight,
    opacity,
    labelForX,
    labelForY
  } = useTooltip({
    labelFontFamily,
    xAxisLegend,
    pointData,
    yAxisLegend,
    xCoordinateForDataPoint,
    yCoordinateForDataPoint,
    toolTipLabelFontSize,
    xForWindow,
    windowSize,
    toolTipHorizontalPadding,
    toolTipFadeOutDuration
  });

  if (font === null) {
    return <></>;
  }

  if (pointData.x === '0' && pointData.y === '0') return <></>;

  return (
    <Group opacity={opacity}>
      <RoundedRect
        x={xCordForRoundedRect}
        y={yCordForRoundedRect}
        width={tooltipWidth}
        height={tooltipHeight}
        r={tooltipHeight / TOOLTIP_BORDER_RADIUS_RECTIFIER}
        color={toolTipColor}
      />
      <Path path={path} color={toolTipColor} />
      <Text
        x={xCordForTopText}
        y={yCordForTopText}
        text={`${labelForX}: ${pointData.x}`}
        font={font}
        color={toolTipDataColor}
      />
      <Text
        x={xCordForBottomText}
        y={yCordForBottomText}
        text={`${labelForY}: ${pointData.y}`}
        font={font}
        color={toolTipDataColor}
      />
      {displayCircularPointer && (
        <Circle
          cx={xCoordinateForDataPoint}
          cy={yCoordinateForDataPoint}
          r={tooltipHeight / TOOLTIP_DATA_POINT_CIRCLE_RECTIFIER}
          color={circularPointerColor}
        />
      )}
    </Group>
  );
};

export default Tooltip;
