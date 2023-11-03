import { DashPathEffect, Group, Path } from '@shopify/react-native-skia';
import React from 'react';
import type { YRefLinePropsType } from './YRefLinesTypes';

/**
 * Renders horizontal reference lines on the Y-axis based on the provided scale and configuration.
 *
 * @component
 * @param {YRefLinePropsType} props - The properties for YRefLines component.
 * @param {function} props.yScale - Function to calculate Y-axis values based on data.
 * @param {boolean} props.showLines - Flag to determine whether to show reference lines.
 * @param {string} props.horizontalGridLineColor - Color of the horizontal grid lines.
 * @param {Array<number>} props.xScaleBounds - X-axis scale bounds.
 * @param {number} props.canvasWidth - Width of the canvas.
 * @param {number} props.xAxisLength - Length of the X-axis.
 * @param {function} props.canvasWidthHandler - Function to handle canvas width changes.
 * @returns {JSX.Element} - Rendered YRefLines component.
 */
const YRefLines = ({
  yScale,
  showLines,
  horizontalGridLineColor,
  canvasWidth,
  xAxisLength,
  canvasWidthHandler
}: YRefLinePropsType): JSX.Element => {
  // If showLines is false, render nothing
  if (!showLines) {
    return <></>;
  }

  // Render horizontal reference lines based on Y-scale ticks
  return (
    <Group>
      {yScale.ticks(6).map((label: number, idx: number) => {
        // Calculate Y-coordinate for the current tick label
        const yPoint = yScale(label);
        // Render dashed horizontal line
        return (
          <Path
            key={label + idx.toString()}
            color={horizontalGridLineColor}
            style="stroke"
            strokeWidth={1}
            path={`M10,${yPoint} L${xAxisLength ? canvasWidthHandler : canvasWidth},${yPoint}`}
          >
            <DashPathEffect intervals={[5, 10]} />
          </Path>
        );
      })}
    </Group>
  );
};

export default YRefLines;
