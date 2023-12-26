import {
  interpolate,
  matchFont,
  runTiming,
  SkFont,
  Skia,
  SkiaValue,
  useComputedValue,
  useFont,
  useValue
} from '@shopify/react-native-skia';
import { useEffect } from 'react';
import { useDefaultFont } from '../../hooks';
import { horizontalScale, moderateScale, verticalScale } from '../../theme';
import type { UseTooltipPropsType } from './TooltipTypes';

const useTooltip = ({
  labelFontFamily,
  xAxisLegend,
  pointData,
  yAxisLegend,
  xCoordinateForDataPoint,
  yCoordinateForDataPoint,
  xForWindow,
  windowSize,
  toolTipLabelFontSize = moderateScale(12),
  toolTipHorizontalPadding = horizontalScale(20),
  toolTipFadeOutDuration = 4000
}: UseTooltipPropsType) => {
  const { fontStyle } = useDefaultFont({ labelSize: toolTipLabelFontSize });
  const userAddedFont = useFont(labelFontFamily, toolTipLabelFontSize);
  const font: SkFont | null = labelFontFamily ? userAddedFont : matchFont(fontStyle);
  const labelForX = xAxisLegend || 'X';
  const labelForY = yAxisLegend || 'Y';
  const longestFont =
    font &&
    font.measureText(`${labelForX}: ${pointData.x}`).width >
      font.measureText(`${labelForY}: ${pointData.y}`).width
      ? `${labelForX}: ${pointData.x}`
      : `${labelForY}: ${pointData.y}`;
  const tooltipWidth = font ? font.measureText(longestFont).width + toolTipHorizontalPadding : 0;
  const halfTooltipWidth = tooltipWidth / 2;
  const tooltipHeight = 3 * toolTipLabelFontSize;
  const tipHeight = verticalScale(10); // The pointed tip of the tooltip
  const textPaddingLeft = toolTipHorizontalPadding / 2;
  const fontPaddingOffset = toolTipLabelFontSize * 0.2; // 0.2 is magic number is to adjust font padding
  const yCordOffsetForText = toolTipLabelFontSize + fontPaddingOffset; // To make sure font does not crop/overlap at top

  // Calculate the coordinates of the vertices of an equilateral triangle
  let x1 = xCoordinateForDataPoint.current - tipHeight;
  let y1 = yCoordinateForDataPoint.current - tipHeight;
  let x2 = xCoordinateForDataPoint.current + tipHeight;
  let y2 = yCoordinateForDataPoint.current - tipHeight;
  let x3 = xCoordinateForDataPoint.current;
  let y3 = yCoordinateForDataPoint.current;

  /* Initial position of tooltip: display on top of the data point without being cropped from
   either left or right side */
  let xCordForRoundedRect = xCoordinateForDataPoint.current - halfTooltipWidth;
  let yCordForRoundedRect = yCoordinateForDataPoint.current - (tooltipHeight + tipHeight);
  let xCordForTopText = xCordForRoundedRect + textPaddingLeft;
  let yCordForTopText = yCordForRoundedRect + yCordOffsetForText;
  let xCordForBottomText = xCordForTopText;
  let yCordForBottomText = yCordForTopText + yCordOffsetForText;

  /* Handle the case where the tooltip might get cropped from top. Redraw and position it below 
    the data point  */
  if (yCoordinateForDataPoint.current - (tooltipHeight + tipHeight) < 0) {
    xCordForRoundedRect = xCoordinateForDataPoint.current - halfTooltipWidth;
    yCordForRoundedRect = yCoordinateForDataPoint.current + tipHeight;
    xCordForTopText = xCordForRoundedRect + textPaddingLeft;
    yCordForTopText = yCordForRoundedRect + yCordOffsetForText;
    xCordForBottomText = xCordForTopText;
    yCordForBottomText = yCordForTopText + yCordOffsetForText;

    x1 = xCoordinateForDataPoint.current;
    y1 = yCoordinateForDataPoint.current;
    x2 = xCoordinateForDataPoint.current - tipHeight;
    y2 = yCoordinateForDataPoint.current + tipHeight;
    x3 = xCoordinateForDataPoint.current + tipHeight;
    y3 = yCoordinateForDataPoint.current + tipHeight;
  }

  if (xCoordinateForDataPoint.current - xForWindow > halfTooltipWidth) {
    if (xCoordinateForDataPoint.current - xForWindow + halfTooltipWidth > windowSize.current.x) {
      /* Handle the case where the tooltip might get cropped from right side. Redraw and position it on 
        left side of the data point */
      xCordForRoundedRect = xCoordinateForDataPoint.current - tooltipWidth - tipHeight;
      yCordForRoundedRect = yCoordinateForDataPoint.current - tooltipHeight / 2;
      xCordForTopText = xCordForRoundedRect + textPaddingLeft;
      yCordForTopText = yCordForRoundedRect + yCordOffsetForText;
      xCordForBottomText = xCordForTopText;
      yCordForBottomText = yCordForTopText + yCordOffsetForText;

      x1 = xCoordinateForDataPoint.current;
      y1 = yCoordinateForDataPoint.current;
      x2 = xCoordinateForDataPoint.current - tipHeight;
      y2 = yCoordinateForDataPoint.current - tipHeight;
      x3 = xCoordinateForDataPoint.current - tipHeight;
      y3 = yCoordinateForDataPoint.current + tipHeight;
    }
  } else {
    /* Handle the case where the tooltip might get cropped from left side. Redraw and position it on 
        right side of the data point */
    xCordForRoundedRect = xCoordinateForDataPoint.current + tipHeight;
    yCordForRoundedRect = yCoordinateForDataPoint.current - tooltipHeight / 2;
    xCordForTopText = xCordForRoundedRect + textPaddingLeft;
    yCordForTopText = yCordForRoundedRect + yCordOffsetForText;
    xCordForBottomText = xCordForTopText;
    yCordForBottomText = yCordForTopText + yCordOffsetForText;

    x1 = xCoordinateForDataPoint.current;
    y1 = yCoordinateForDataPoint.current;
    x2 = xCoordinateForDataPoint.current + tipHeight;
    y2 = yCoordinateForDataPoint.current - tipHeight;
    x3 = xCoordinateForDataPoint.current + tipHeight;
    y3 = yCoordinateForDataPoint.current + tipHeight;
  }

  const path = Skia.Path.Make();
  // Move to the first vertex
  path.moveTo(x1, y1);
  // Line to the second vertex
  path.lineTo(x2, y2);
  // Line to the third vertex
  path.lineTo(x3, y3);
  // Close the path to connect the last and first vertices
  path.close();

  const transformOpacity = useValue(0);

  useEffect(() => {
    if (pointData.x !== '0' && pointData.y !== '0') {
      runTiming(transformOpacity, { from: 0, to: 1 }, { duration: toolTipFadeOutDuration });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pointData]);

  const opacity: SkiaValue<number> = useComputedValue(() => {
    return interpolate(transformOpacity.current, [0, 0.6, 1], [1, 1, 0]);
  }, [transformOpacity]);

  return {
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
  };
};

export default useTooltip;
