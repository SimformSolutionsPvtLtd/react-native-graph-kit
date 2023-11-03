import type {
  BarChartDataType,
  LineChartDataType,
} from 'react-native-graph-kit';

/**
 * Generate dummy data for a chart with the specified number of elements.
 * @param {number} numElements - The number of data points to generate.
 * @returns {BarChartDataType & LineChartDataType} - An object containing dummy data in the specified format.
 */
export function generateDummyData(
  numElements: number
): BarChartDataType & LineChartDataType {
  const xAxisLabels = Array.from(
    { length: numElements },
    (_, i) => `Label ${i + 1}`
  );
  const yAxisData = Array.from({ length: numElements }, () =>
    Math.floor(Math.random() * 1000)
  );

  const dummyData = {
    xAxis: {
      labels: xAxisLabels,
    },
    yAxis: {
      datasets: yAxisData,
    },
  };

  return dummyData;
}
