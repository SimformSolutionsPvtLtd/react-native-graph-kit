import { SkFont, Skia } from '@shopify/react-native-skia';
import type { ScaledDataType } from '../components/line-chart/LineChartTypes';
import { MAX_CANVAS_WIDTH } from '../constants';

/**
 * Calculate the canvas width for rendering data on a canvas.
 *
 * @param {number} xAxisLength - The length of the x-axis (optional, defaults to 0).
 * @param {number} initialDistance - The initial distance (optional, defaults to 10).
 * @param {number} dataLength - The length of the data to be rendered.
 * @returns {number} The calculated canvas width.
 */
export function calculateCanvasWidth(
  xAxisLength: number = 0,
  initialDistance: number = 10,
  dataLength: number
): number {
  const calculatedWidth = xAxisLength * dataLength + initialDistance;
  return calculatedWidth > MAX_CANVAS_WIDTH ? MAX_CANVAS_WIDTH : calculatedWidth;
}

/**
 * The function calculates the maximum width of a label in a chart using a given font.
 * @param {string[]} labels - An array of strings representing the labels in a chart.
 * @param {SkFont | null} chartFont - The `chartFont` parameter is of type `SkFont | null`. It
 * represents the font used for measuring the width of the labels in the chart. It can either be a
 * valid `SkFont` object or `null` if no font is specified.
 * @returns the maximum width of the labels in the given array, taking into account the font size
 * specified in the chartFont parameter.
 */
export function calculateMaxWidthLabel(labels: string[], chartFont: SkFont | null) {
  return labels.reduce((max, item) => {
    return Math.max(max, chartFont?.measureText(item).width as number) + 1;
  }, 0);
}

/**
 * The function `findMaxNumber` takes an array of numbers and returns the maximum number in the array.
 * @param {number[]} data - An array of numbers
 * @returns the maximum number from the given array of numbers.
 */
export function findMaxNumber(data: number[]) {
  return data.reduce((prev: number, cur: number) => Math.max(prev, Number(cur)), -Infinity);
}

/**
 * The function generates a line path using scaled data points.
 * @param {ScaledDataType} scaledData - The `scaledData` parameter is an array of objects representing
 * scaled data points. Each object in the array has two properties: `x` and `y`, which represent the x
 * and y coordinates of a data point.
 * @returns a Skia Path.
 */
export function generateLinePath(scaledData: ScaledDataType) {
  const newPath = Skia.Path.Make();

  for (let i = 0; i < scaledData.length; i++) {
    const point = scaledData[i];

    if (i === 0) {
      newPath.moveTo(point.x, point.y);
    } else {
      const prev = scaledData[i - 1];
      const cp1x = (2 * prev.x + point.x) / 3;
      const cp1y = (2 * prev.y + point.y) / 3;
      const cp2x = (prev.x + 2 * point.x) / 3;
      const cp2y = (prev.y + 2 * point.y) / 3;

      newPath.cubicTo(cp1x, cp1y, cp2x, cp2y, point.x, point.y);
    }
  }

  return newPath;
}
